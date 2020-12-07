import { Document, Types } from 'mongoose';
declare class Item {
    name: string;
    description: string;
    category: string;
    tag: string[];
    ownerId: Types.ObjectId;
    status: string;
    createdDate: Date;
    logId: Types.ObjectId;
}
export declare type ItemDocument = Item & Document;
export declare const ItemSchema: import("mongoose").Schema<any>;
export {};
