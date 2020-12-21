import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatDocument } from './chat.schema';
import { Chat } from './dto/chat.model';

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
  test() {
    console.log('worked');
  }
}
