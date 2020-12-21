import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChatMessage } from './dto/chat.model';

@Schema()
class Chat {
  @Prop()
  data: ChatMessage[];
  @Prop({ type: Types.ObjectId, ref: 'Ietm' })
  for: Types.ObjectId;
  @Prop()
  active: boolean;
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
