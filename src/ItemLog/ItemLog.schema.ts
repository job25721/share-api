import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Log } from './dto/ItemLog.model';

@Schema()
class ItemLog {
  @Prop({ type: Types.ObjectId, ref: 'Item' })
  itemId: Types.ObjectId | string;
  @Prop()
  logs: Log[];
}

export type ItemLogDocument = ItemLog & Document;
export const ItemLogSchema = SchemaFactory.createForClass(ItemLog);
