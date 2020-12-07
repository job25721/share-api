import { Types } from 'mongoose';
export declare class changeStatus {
    itemId: string | Types.ObjectId;
    status: string;
}
export declare class ItemInput {
    name: string;
    description: string;
    category: string;
    tag: string[];
}
