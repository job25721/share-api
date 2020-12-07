import { Model, Types } from 'mongoose';
import { UserService } from '../User/user.service';
import { ItemLog } from './dto/itemLog.model';
import { ItemLogDocument } from './ItemLog.schema';
export declare class ItemLogService {
    private itemLogModel;
    private readonly userService;
    constructor(itemLogModel: Model<ItemLogDocument>, userService: UserService);
    InitLog(data: {
        itemId: string;
        actorId: string;
    }): Promise<ItemLog>;
    addLog(data: {
        itemId: string;
        actorId: string;
        action: string;
    }): Promise<ItemLog>;
    findById(logId: Types.ObjectId | string): Promise<ItemLog>;
    findByItemId(itemId: string): Promise<ItemLog>;
}
