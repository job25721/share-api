import { Document, Types } from 'mongoose';
declare class Request {
    itemId: Types.ObjectId;
    requestPersonId: Types.ObjectId;
    requestToPersonId: Types.ObjectId;
    timestamp: Date;
    reason: string;
    wantedRate: number;
}
export declare type RequestDocument = Request & Document;
export declare const RequestSchema: import("mongoose").Schema<any>;
export {};
