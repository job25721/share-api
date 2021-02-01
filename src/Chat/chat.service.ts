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
      data: [],
      active: true,
      lastestUpdate: Date.now(),
      for: itemId,
    };
    const newChatRoom = new this.chatModel(chatRoomData);
    return newChatRoom.save();
  }

  async updateReqId(chat_uid: Types.ObjectId, itemId: string): Promise<Chat> {
    const chat = await this.chatModel.findById(chat_uid);
    chat.for = Types.ObjectId(itemId);
    return chat.save();
  }

  async disableManyChatByReqId(
    itemId: Types.ObjectId,
    activeChat_uid: Types.ObjectId,
  ): Promise<void> {
    await this.chatModel.updateMany(
      { for: itemId, $nor: [{ _id: activeChat_uid }] },
      { active: false },
    );
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

  async findById(chat_uid: Types.ObjectId): Promise<Chat> {
    return this.chatModel.findById(chat_uid);
  }

  async findChat(chatUid: Types.ObjectId[]): Promise<Chat[]> {
    return this.chatModel.find({
      _id: { $in: chatUid },
    });
  }

  async addMessage(queryData: {
    chatUid: Types.ObjectId;
    payload: ChatMessage;
  }): Promise<Chat> {
    try {
      const chat = await this.chatModel.findById(queryData.chatUid);
      if (chat === null) throw new Error('no this chat id');
      chat.lastestUpdate = Date.now();
      chat.data = [...chat.data, queryData.payload];
      return await chat.save();
    } catch (err) {
      return err;
    }
  }
}
