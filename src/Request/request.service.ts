import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item } from 'src/Item/dto/item.model';
import { ItemService } from 'src/Item/item.service';
import { itemStatus } from 'src/Item/item.status';
import { ItemLogService } from 'src/ItemLog/itemLog.service';
import { AcceptRequestDto } from './dto/request.input';
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
        const item = await this.itemService.findById(itemId);
        if (item.status !== itemStatus.active) {
          throw new Error("item is not available can't request !!");
        }
        if (item.ownerId == requestPersonId) {
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

  async acceptRequest(data: AcceptRequestDto): Promise<Item> {
    const { reqId, acceptPersonId } = data;
    try {
      const req = await this.findById(reqId);

      const { ownerId, status } = await this.itemService.findById(req.itemId);
      if (ownerId != acceptPersonId) {
        throw new Error('accept person is not item owner');
      }
      if (status !== itemStatus.active) {
        throw new Error(
          "can't accept this request because request is already accepted or item not available",
        );
      }
      const { itemId, requestPersonId } = req;

      await this.itemLogService.addLog({
        itemId: itemId.toString(),
        actorId: acceptPersonId,
        action: `ได้ยินยอมส่งต่อของให้ ${requestPersonId}`,
      });
      return await this.itemService.changeItemStatus({
        itemId,
        status: itemStatus.pending,
      });
    } catch (error) {
      return error;
    }
  }
}
