import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatDocument } from './chat.schema';
import { Chat, ChatMessage } from './dto/chat.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<ChatDocument>) {}

  async create(itemId: string): Promise<Chat> {
    const chatRoomData: Chat = {
      for: Types.ObjectId(itemId),
      data: [],
      active: true,
    };
    const newChatRoom = new this.chatModel(chatRoomData);
    return await newChatRoom.save();
  }

  async disableChat(queryData: {
    chatUid: Types.ObjectId[] | string[];
    itemId: Types.ObjectId | string;
  }): Promise<void> {
    try {
      const { chatUid, itemId } = queryData;

      const chat = await this.chatModel.findOne({
        _id: { $in: chatUid },
        for: itemId,
      });
      if (chat === null) throw new Error('no this chat id');
      chat.active = false;
      await chat.save();
    } catch (err) {
      return err.message;
    }
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatModel.find();
  }

  async findChat(chatUid: Types.ObjectId[]): Promise<Chat[]> {
    return await this.chatModel.find({
      _id: { $in: chatUid },
    });
  }

  async saveChat(queryData: {
    chatUid: Types.ObjectId;
    payload: ChatMessage;
  }): Promise<Chat> {
    try {
      const chat = await this.chatModel.findById(queryData.chatUid);
      if (chat === null) throw new Error('no this chat id');
      chat.data = [...chat.data, queryData.payload];
      return await chat.save();
    } catch (err) {
      return err;
    }
  }
}
