import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemLog } from './dto/itemLog.model';
import { ItemLogDocument } from './ItemLog.schema';
import { createItemLog } from './logFunction';

@Injectable()
export class ItemLogService {
  constructor(
    @InjectModel('ItemLog') private itemLogModel: Model<ItemLogDocument>,
  ) {}

  async InitLog(itemId: string, actorId: string): Promise<ItemLog> {
    const newItemLogDto: ItemLog = {
      itemId: new Types.ObjectId(itemId),
      logs: [
        createItemLog(new Types.ObjectId(actorId), 'ได้เพิ่มของไปที่ SHARE'),
      ],
    };
    const itemLog = new this.itemLogModel(newItemLogDto);
    return await itemLog.save();
  }

  async addLog({ itemId, actorId, action }): Promise<ItemLog> {
    try {
      const existLog = await this.itemLogModel.findOne({
        itemId: Types.ObjectId(itemId),
      });
      console.log('existlog');
      console.log(existLog);

      if (existLog === null) {
        throw new Error('no such item');
      }

      const newLog = createItemLog(Types.ObjectId(actorId), action);
      newLog.prevHash = existLog.logs[existLog.logs.length - 1].hash;
      existLog.logs.push(newLog);
      return existLog.save();
    } catch (err) {
      throw err;
    }
  }

  async findById(logId: Types.ObjectId | string): Promise<ItemLog> {
    return await this.itemLogModel.findById(logId);
  }

  async findByItemId(itemId: string): Promise<ItemLog> {
    return await this.itemLogModel.findOne({ itemId });
  }
}
