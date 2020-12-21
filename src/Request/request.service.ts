import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item } from '../Item/dto/item.model';
import { ItemService } from '../Item/item.service';
import { itemStatus, requestStatus } from '../status';
import { ItemLogService } from '../ItemLog/itemLog.service';
import { UserService } from '../User/user.service';
import { RequestActivityDto } from './dto/request.input';
import { Request } from './dto/request.model';
import { RequestDocument } from './request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private requestModel: Model<RequestDocument>,
    private readonly itemLogService: ItemLogService,
    private readonly itemService: ItemService,
    private readonly userService: UserService,
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

      console.log(existRequest);

      if (existRequest === null) {
        const item = await this.itemService.findById(itemId);
        if (item.ownerId == requestPersonId) {
          throw new Error("can't request your own item");
        }
        if (item.status !== itemStatus.available) {
          throw new Error("item is not available can't request !!");
        }

        const receiver = await this.userService.findById(requestPersonId);

        await this.itemLogService.addLog({
          itemId,
          actorId: requestPersonId,
          action: `${receiver.info.firstName} ทำการรีเควสของชิ้นนี้`,
        });
        const reqDto: Request = {
          itemId: Types.ObjectId(itemId),
          requestPersonId: Types.ObjectId(requestPersonId),
          requestToPersonId: item.ownerId,
          timestamp: new Date(Date.now()),
          reason,
          wantedRate,
          status: requestStatus.requested,
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

  async findMyRequests(myId: string): Promise<Request[]> {
    return this.requestModel.find({ requestToPersonId: Types.ObjectId(myId) });
  }

  async findMySendRequests(requestPersonId: string): Promise<Request[]> {
    return this.requestModel.find({
      requestPersonId: Types.ObjectId(requestPersonId),
    });
  }

  async acceptRequest(data: RequestActivityDto): Promise<Item> {
    const { reqId, actionPersonId } = data;
    try {
      const req = await this.requestModel.findById(reqId);

      const { ownerId, status } = await this.itemService.findById(req.itemId);
      if (ownerId === undefined) throw new Error('no this request id');
      if (ownerId != actionPersonId) {
        throw new Error('accept person is not item owner');
      }
      if (status !== itemStatus.available) {
        throw new Error(
          "can't accept this request because request is already accepted or item is not available",
        );
      }

      if (req.status !== requestStatus.requested) {
        throw new Error('this request already rejected or accepted');
      }
      const { itemId, requestPersonId } = req;

      const giver = await this.userService.findById(actionPersonId);
      const receiver = await this.userService.findById(requestPersonId);
      req.status = requestStatus.accepted;
      await req.save();
      await this.itemLogService.addLog({
        itemId: itemId.toString(),
        actorId: actionPersonId,
        action: `${giver.info.firstName} ได้ยินยอมส่งต่อของให้ ${receiver.info.firstName}`,
      });
      return await this.itemService.changeItemStatus({
        itemId,
        status: itemStatus.accepted,
      });
    } catch (err) {
      return err;
    }
  }

  async acceptDelivered(data: RequestActivityDto): Promise<Item> {
    const { reqId, actionPersonId } = data;
    try {
      const req = await this.findById(reqId);

      if (actionPersonId != req.requestPersonId) {
        throw new Error("You're not a request person");
      }
      if (req.status !== requestStatus.accepted) {
        throw new Error('this request is not accept by owner');
      }

      const { itemId, requestPersonId, requestToPersonId } = req;

      const giver = await this.userService.findById(requestToPersonId);
      const receiver = await this.userService.findById(requestPersonId);

      await this.itemLogService.addLog({
        itemId: itemId.toString(),
        actorId: actionPersonId,
        action: `${receiver.info.firstName} ได้รับของจาก ${giver.info.firstName} แล้ว สิ้นสุดกระบวนการ SHARE`,
      });
      return await this.itemService.changeItemStatus({
        itemId,
        status: itemStatus.delivered,
      });
    } catch (err) {
      return err;
    }
  }

  async rejectRequest(data: RequestActivityDto): Promise<Item> {
    const { reqId, actionPersonId } = data;
    try {
      const request = await this.requestModel.findById(reqId);
      const { itemId, requestPersonId } = request;

      const item = await this.itemService.findById(itemId);
      const { ownerId } = item;

      if (request.status === requestStatus.rejected)
        throw new Error('this item already rejected');

      if (ownerId === undefined) throw new Error('no this request id');
      if (ownerId != actionPersonId) {
        throw new Error('actor person is not item owner');
      }

      const giver = await this.userService.findById(actionPersonId);
      const receiver = await this.userService.findById(requestPersonId);
      await this.itemLogService.addLog({
        itemId: itemId.toString(),
        actorId: actionPersonId,
        action: `${giver.info.firstName} ได้ปฏิเสธที่จะส่งต่อของให้ ${receiver.info.firstName}`,
      });
      request.status = requestStatus.rejected;
      await request.save();
      return item;

      //maybe send noti to reciever
      //not imprement yet
      /*
        .................
      */
    } catch (error) {
      return error;
    }
  }
}
