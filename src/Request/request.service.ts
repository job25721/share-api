import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemService } from 'src/Item/item.service';
import { ItemLogService } from 'src/ItemLog/itemLog.service';
import { Request } from './dto/request.model';
import { RequestDocument } from './request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private requestModel: Model<RequestDocument>,
    private readonly itemLogService: ItemLogService,
    private readonly itemService: ItemService,
  ) {}

  async addRequest(data: {
    itemId: string;
    requestPersonId: string;
    reason: string;
    wantedRate: number;
  }): Promise<Request> {
    const { requestPersonId, itemId, reason, wantedRate } = data;
    try {
      //find exist request
      const existRequest = await this.requestModel.findOne({
        itemId: Types.ObjectId(itemId),
        requestPersonId: Types.ObjectId(requestPersonId),
      });

      if (existRequest === null) {
        const isMyItem = await this.itemService.findMyItem({
          ownerId: requestPersonId,
          itemId,
        });
        if (isMyItem !== null) {
          throw new Error("can't request your own item");
        }
        await this.itemLogService.addLog({
          itemId,
          actorId: requestPersonId,
          action: `ทำการรีเควสของชิ้นนี้`,
        });
        const reqDto: Request = {
          itemId: Types.ObjectId(itemId),
          requestPersonId: Types.ObjectId(requestPersonId),
          timestamp: new Date(Date.now()),
          reason,
          wantedRate,
        };
        const newRequest = new this.requestModel(reqDto);
        return await newRequest.save();
      } else {
        throw new Error(`you has exist request an item ${itemId}`);
      }
    } catch (err) {
      return err;
    }
  }

  async findById(reqId: string): Promise<Request> {
    try {
      const res = await this.requestModel.findById(reqId);
      if (res === null) throw new Error('No request');
      return res;
    } catch (err) {
      return err;
    }
  }

  acceptRequest(): void {
    return;
  }
}
