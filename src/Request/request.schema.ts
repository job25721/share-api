import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Request {
  @Prop({ type: Types.ObjectId, ref: 'Item' })
  itemId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  requestPersonId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  requestToPersonId: Types.ObjectId;
  @Prop()
  timestamp: Date;
  @Prop()
  reason: string;
  @Prop()
  wantedRate: number;
}

export type RequestDocument = Request & Document;
export const RequestSchema = SchemaFactory.createForClass(Request);
