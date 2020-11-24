import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemInput } from './dto/item.input';
import { Item } from './dto/item.model';
import { ItemDocument } from './item.schema';
@Injectable()
export class ItemService {
  constructor(@InjectModel('Item') private itemModel: Model<ItemDocument>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async create(createItemDto: ItemInput): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    newItem.createdDate = new Date(Date.now());
    newItem.status = 'initial status';
    newItem.userId = new Types.ObjectId('5fbd2e2d33b9f31610ef1f54');
    return await newItem.save();
  }
}
