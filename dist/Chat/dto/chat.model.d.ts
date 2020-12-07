import { Types } from 'mongoose';
export declare class ChatMessage {
    message: string;
    timestamp: Date;
}
export declare class Chat {
    id?: Types.ObjectId;
    from: Types.ObjectId;
    to: Types.ObjectId;
    data: ChatMessage[];
}
