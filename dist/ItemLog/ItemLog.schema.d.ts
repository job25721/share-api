import { Document, Types } from 'mongoose';
import { Log } from './dto/itemLog.model';
declare class ItemLog {
    itemId: Types.ObjectId;
    logs: Log[];
}
export declare type ItemLogDocument = ItemLog & Document;
export declare const ItemLogSchema: import("mongoose").Schema<any>;
export {};
