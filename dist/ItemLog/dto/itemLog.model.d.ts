import { Types } from 'mongoose';
export declare class Log {
    timestamp: Date;
    actor: Types.ObjectId | string;
    action: string;
    hash: string;
    prevHash: string;
}
export declare class ItemLog {
    id?: string;
    itemId: Types.ObjectId | string;
    logs: Log[];
}
