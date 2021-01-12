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
  tags: string[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  ownerId: Types.ObjectId;
  @Prop()
  status: string;
  @Prop()
  createdDate: Date;
  @Prop({ type: Types.ObjectId, ref: 'ItemLog' })
  logId: Types.ObjectId;
}

export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);
