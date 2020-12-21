import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserInfo } from './dto/user.model';

@Schema()
class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  avatar: string;
  @Prop()
  info: UserInfo;
  @Prop({ type: [Types.ObjectId], ref: 'Chat' })
  _chat_uid: Types.ObjectId[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
