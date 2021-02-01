import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemService } from '../Item/item.service';
import { itemStatus, requestStatus } from '../status';
import { ItemLogService } from '../ItemLog/itemLog.service';
import { UserService } from '../User/user.service';
import { RequestActivityDto } from './dto/request.input';
import { Request } from './dto/request.model';
import { RequestDocument } from './request.schema';
import { ChatService } from 'src/Chat/chat.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private requestModel: Model<RequestDocument>,
    private readonly itemLogService: ItemLogService,
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
  ) {}

  async addRequest(data: {
    itemId: string;
    requestPersonId: string;
    reason: string;
    wantedRate: number;
  }): Promise<Request> {
    const { reason, wantedRate } = data;
    const itemId = Types.ObjectId(data.itemId);
    const requestPersonId = Types.ObjectId(data.requestPersonId);

    try {
      //find exist request
      const existRequest = await this.requestModel.findOne({
        itemId: itemId,
        requestPersonId: requestPersonId,
      });

      console.log(existRequest);

      if (
        existRequest === null ||
        existRequest.status === requestStatus.rejected
      ) {
        const item = await this.itemService.findById(itemId);

        if (
          item.ownerId.toHexString().toString() ===
          requestPersonId.toHexString().toString()
        ) {
          throw new Error("can't request your own item");
        }
        if (item.status !== itemStatus.available) {
          throw new Error("item is not available can't request !!");
        }

        const receiver = await this.userService.findById(requestPersonId);
        const newChat = await this.chatService.create(itemId);
        await this.chatService.addMessage({
          chatUid: newChat.id,
          payload: {
            from: requestPersonId.toHexString().toString(),
            to: item.ownerId.toHexString().toString(),
            message: `${receiver.info.firstName} ได้ส่งคำขอ ${item.name} ของคุณ\nเหตุผล : ${reason}\nระดับความต้องการ ${wantedRate}`,
            timestamp: new Date(Date.now()),
          },
        });
        const reqDto: Request = {
          itemId,
          requestPersonId,
          requestToPersonId: item.ownerId,
          timestamp: new Date(Date.now()),
          reason,
          wantedRate,
          status: requestStatus.requested,
          chat_uid: new Types.ObjectId(newChat.id),
        };

        const newRequest = new this.requestModel(reqDto);

        await this.itemLogService.addLog({
          itemId,
          actorId: requestPersonId,
          action: `${receiver.info.firstName} ทำการรีเควสของชิ้นนี้ reqid:${newRequest.id}`,
        });

        return await newRequest.save();
      } else {
        throw new Error(`you has exist request an item ${itemId}`);
      }
    } catch (err) {
      console.log(err);

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
    return this.requestModel.find({
      requestToPersonId: Types.ObjectId(myId),
    });
  }

  async findMySendRequests(requestPersonId: string): Promise<Request[]> {
    return this.requestModel.find({
      requestPersonId: Types.ObjectId(requestPersonId),
    });
  }

  async findMySuccessRequests(userId): Promise<Request[]> {
    return (await this.findMySendRequests(userId)).filter(
      (request) => request.status === requestStatus.delivered,
    );
  }

  async acceptRequest(data: RequestActivityDto, actorId): Promise<Request> {
    const reqId = data.reqId;
    const actionPersonId = actorId;

    try {
      const req = await this.requestModel.findById(reqId);
      const { itemId, requestPersonId } = req;
      const { ownerId, status } = await this.itemService.findById(itemId);
      if (ownerId === undefined) throw new Error('no this request id');

      if (ownerId.toHexString().toString() !== actionPersonId.toString()) {
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

      const giver = await this.userService.findById(actionPersonId);
      const receiver = await this.userService.findById(requestPersonId);
      req.status = requestStatus.accepted;
      await req.save();
      await this.requestModel.updateMany(
        { itemId, status: requestStatus.requested },
        { status: requestStatus.rejected },
      );
      await this.chatService.disableManyChatByReqId(itemId, req.chat_uid);
      await this.itemLogService.addLog({
        itemId: itemId,
        actorId: actionPersonId,
        action: `${giver.info.firstName} ได้ยินยอมส่งต่อของให้ ${receiver.info.firstName}`,
      });
      await this.itemService.changeItemStatus({
        itemId,
        status: itemStatus.accepted,
      });
      await this.itemService.updateAcceptedToPerson(itemId, requestPersonId);
      return req;
    } catch (err) {
      return err;
    }
  }

  async acceptDelivered(data: RequestActivityDto, actorId): Promise<Request> {
    const reqId = data.reqId;
    const actionPersonId = actorId;

    try {
      const req = await this.requestModel.findById(reqId);

      const { itemId, requestPersonId, requestToPersonId, chat_uid } = req;

      if (
        actionPersonId.toString() !==
        req.requestPersonId.toHexString().toString()
      ) {
        throw new Error("You're not a request person");
      }
      if (req.status !== requestStatus.accepted) {
        throw new Error('this request is not accept by owner');
      }

      const giver = await this.userService.findById(requestToPersonId);
      const receiver = await this.userService.findById(requestPersonId);

      await this.itemLogService.addLog({
        itemId: itemId,
        actorId: actionPersonId,
        action: `${receiver.info.firstName} ได้รับของจาก ${giver.info.firstName} แล้ว สิ้นสุดกระบวนการ SHARE`,
      });
      await this.chatService.disableChat({ chatUid: chat_uid });

      req.status = requestStatus.delivered;

      await this.itemService.changeItemStatus({
        itemId,
        status: itemStatus.delivered,
      });
      return req.save();
    } catch (err) {
      return err;
    }
  }

  async rejectRequest(data: RequestActivityDto, actorId): Promise<Request> {
    const reqId = data.reqId;
    const actionPersonId = actorId;
    try {
      const request = await this.requestModel.findById(reqId);
      const { itemId, requestPersonId } = request;

      const item = await this.itemService.findById(itemId);
      const { ownerId } = item;

      if (request.status === requestStatus.rejected)
        throw new Error('this item already rejected');

      if (ownerId === undefined) throw new Error('no this request id');
      if (ownerId.toHexString().toString() !== actionPersonId.toString()) {
        throw new Error('actor person is not item owner');
      }

      const giver = await this.userService.findById(actionPersonId);
      const receiver = await this.userService.findById(requestPersonId);
      await this.itemLogService.addLog({
        itemId: itemId,
        actorId: actionPersonId,
        action: `${giver.info.firstName} ได้ปฏิเสธที่จะส่งต่อของให้ ${receiver.info.firstName}`,
      });
      request.status = requestStatus.rejected;
      await this.chatService.disableChat({ chatUid: request.chat_uid });

      return request.save();
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
