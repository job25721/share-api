import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatDocument } from './chat.schema';
import { Chat, ChatMessage } from './dto/chat.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<ChatDocument>) {}

  async create(itemId: Types.ObjectId): Promise<Chat> {
    const chatRoomData: Chat = {
      for: itemId,
      data: [],
      active: true,
    };
    const newChatRoom = new this.chatModel(chatRoomData);
    return await newChatRoom.save();
  }

  async disableChat(queryData: { chatUid: Types.ObjectId }): Promise<void> {
    try {
      const { chatUid } = queryData;

      const chat = await this.chatModel.findById(chatUid);
      if (chat === null) throw new Error('no this chat id');
      chat.active = false;
      await chat.save();
    } catch (err) {
      return err.message;
    }
  }

  async findChat(chatUid: Types.ObjectId[]): Promise<Chat[]> {
    return this.chatModel.find({
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
