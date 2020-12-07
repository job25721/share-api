import { Types } from 'mongoose';
export declare class Item {
    id?: Types.ObjectId;
    name: string;
    description: string;
    category: string;
    tag: string[];
    ownerId: Types.ObjectId | string;
    status: string;
    createdDate: Date;
    logId: Types.ObjectId | string;
}
