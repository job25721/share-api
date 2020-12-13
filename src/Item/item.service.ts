import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemLogService } from '../ItemLog/itemLog.service';
import { changeStatus, ItemInput } from './dto/item.input';
import { Item } from './dto/item.model';
import { ItemDocument } from './item.schema';
import { itemStatus } from './item.status';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item') private itemModel: Model<ItemDocument>,
    private readonly itemLogService: ItemLogService,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findById(id: Types.ObjectId | string): Promise<Item> {
    try {
      const res = await this.itemModel.findById(id);
      if (res === null) throw new Error("item you're looking not found");
      return res;
    } catch (err) {
      return err;
    }
  }

  async findMyAllItem(ownerId: string): Promise<Item[]> {
    return await this.itemModel.find({ ownerId: Types.ObjectId(ownerId) });
  }

  async findMyItem(data: { ownerId: string; itemId: string }): Promise<Item> {
    const { ownerId, itemId } = data;
    return await this.itemModel.findOne({
      ownerId: Types.ObjectId(ownerId),
      _id: Types.ObjectId(itemId),
    });
  }

  async create(createItemDto: ItemInput): Promise<Item> {
    const now = new Date(Date.now());
    const userId = '5fce7401f9a69cb3f7db04ad';
    const newItem = new this.itemModel(createItemDto);
    newItem.createdDate = now;
    newItem.status = itemStatus.available;
    newItem.ownerId = Types.ObjectId(userId);
    //addLog
    const itemLog = await this.itemLogService.InitLog({
      itemId: newItem.id,
      actorId: userId,
    });
    newItem.logId = new Types.ObjectId(itemLog.id);
    return await newItem.save();
  }

  async changeItemStatus(data: changeStatus): Promise<Item> {
    const { itemId, status } = data;
    try {
      const res = await this.itemModel.findById(itemId);
      res.status = status;
      return res.save();
    } catch (error) {
      return error;
    }
  }
}
