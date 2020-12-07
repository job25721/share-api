import { Types } from 'mongoose';
export declare class Request {
    id?: string;
    itemId: Types.ObjectId | string;
    requestPersonId: Types.ObjectId | string;
    requestToPersonId: Types.ObjectId | string;
    timestamp: Date;
    reason: string;
    wantedRate: number;
}
