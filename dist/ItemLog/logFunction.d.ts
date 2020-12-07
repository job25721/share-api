import { Types } from 'mongoose';
import { Log } from './dto/itemLog.model';
export declare function calculateHash(data: any): string;
export declare function createItemLog(actorId: Types.ObjectId | string, action: string): Log;
