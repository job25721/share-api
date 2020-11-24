import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemLog } from './dto/ItemLog.model';
import { ItemLogDocument } from './ItemLog.schema';
import { createItemLog } from './logFunction';
@Injectable()
export class ItemLogService {
  constructor(
    @InjectModel('ItemLog') private itemLogModel: Model<ItemLogDocument>,
  ) {}

  async InitLog(
    itemId: Types.ObjectId | string,
    actorId: Types.ObjectId | string,
  ): Promise<ItemLog> {
    const newItemLogDto: ItemLog = {
      itemId,
      logs: [
        createItemLog(new Types.ObjectId(actorId), 'ได้เพิ่มของไปที่ SHARE'),
      ],
    };
    const itemLog = new this.itemLogModel(newItemLogDto);
    return await itemLog.save();
  }

  async findById(logId: Types.ObjectId | string): Promise<ItemLog> {
    return await this.itemLogModel.findById(logId);
  }
}
