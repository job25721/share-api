import { Model } from 'mongoose';
import { Item } from '../Item/dto/item.model';
import { ItemService } from '../Item/item.service';
import { ItemLogService } from '../ItemLog/itemLog.service';
import { UserService } from '../User/user.service';
import { RequestActivityDto } from './dto/request.input';
import { Request } from './dto/request.model';
import { RequestDocument } from './request.schema';
export declare class RequestService {
    private requestModel;
    private readonly itemLogService;
    private readonly itemService;
    private readonly userService;
    constructor(requestModel: Model<RequestDocument>, itemLogService: ItemLogService, itemService: ItemService, userService: UserService);
    addRequest(data: {
        itemId: string;
        requestPersonId: string;
        reason: string;
        wantedRate: number;
    }): Promise<Request>;
    findById(reqId: string): Promise<Request>;
    findMyRequests(myId: string): Promise<Request[]>;
    findMySendRequests(requestPersonId: string): Promise<Request[]>;
    acceptRequest(data: RequestActivityDto): Promise<Item>;
    rejectRequest(data: RequestActivityDto): Promise<Item>;
}
