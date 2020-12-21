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
    const chatData = await this.chatModel.findById(queryData.chatUid);
    chatData.data = [...chatData.data, queryData.payload];
    return await chatData.save();
  }
}
