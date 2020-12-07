import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemLogService } from 'src/ItemLog/itemLog.service';
import { Request } from './dto/request.model';
import { RequestDocument } from './request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private requestModel: Model<RequestDocument>,
    private readonly itemLogService: ItemLogService,
  ) {}

  async addRequest(reqData: {
    itemId: string;
    requestPersonId: string;
    reason: string;
    wantedRate: number;
  }): Promise<Request> {
    const reqDto: Request = {
      itemId: new Types.ObjectId(reqData.itemId),
      requestPersonId: new Types.ObjectId(reqData.requestPersonId),
      timestamp: new Date(Date.now()),
      reason: reqData.reason,
      wantedRate: reqData.wantedRate,
    };
    try {
      //find exist request
      const existRequest = await this.requestModel.findOne({
        itemId: reqDto.itemId,
        requestPersonId: reqDto.requestPersonId,
      });
      console.log(existRequest);

      if (existRequest === null) {
        await this.itemLogService.addLog({
          itemId: reqData.itemId,
          actorId: reqData.requestPersonId,
          action: `ทำการรีเควสของชิ้นนี้`,
        });
        const newRequest = new this.requestModel(reqDto);
        return newRequest.save();
      } else {
        throw new Error(`you has exist request an item ${reqDto.itemId}`);
      }
    } catch (err) {
      return err;
    }
  }
}
