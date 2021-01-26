import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ChatMessage } from './dto/chat.model';

@Schema()
class Chat {
  @Prop()
  data: ChatMessage[];
  @Prop()
  active: boolean;
  @Prop()
  lastestUpdate: number;
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
