import { Document, Types } from 'mongoose';
import { ChatMessage } from './dto/chat.model';
declare class Chat {
    from: Types.ObjectId;
    to: Types.ObjectId;
    data: ChatMessage[];
}
export declare type ChatDocument = Chat & Document;
export declare const ChatSchema: import("mongoose").Schema<any>;
export {};
