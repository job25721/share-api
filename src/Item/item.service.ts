import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemLogService } from 'src/ItemLog/itemLog.service';
import { ItemInput } from './dto/item.input';
import { Item } from './dto/item.model';
import { ItemDocument } from './item.schema';

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
    const userId = '5fbd2e2d33b9f31610ef1f54';
    const newItem = new this.itemModel(createItemDto);
    newItem.createdDate = now;
    newItem.status = 'active';
    newItem.ownerId = new Types.ObjectId(userId);
    //addLog
    const itemLog = await this.itemLogService.InitLog({
      itemId: newItem.id,
      actorId: userId,
    });
    newItem.logId = new Types.ObjectId(itemLog.id);
    return await newItem.save();
  }

  //how to request ??
  async requestItem(itemId: string): Promise<string> {
    return 'requested' + itemId;
  }
}
