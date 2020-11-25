import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChatMessage } from './dto/chat.model';

@Schema()
class Chat {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  from: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  to: Types.ObjectId;
  @Prop()
  data: ChatMessage[];
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
