import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Item {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  category: string;
  @Prop()
  tag: string[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
  @Prop()
  status: string;
  @Prop()
  createdDate: Date;
}

export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);
