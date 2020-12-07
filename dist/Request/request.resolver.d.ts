import { Item } from '../Item/dto/item.model';
import { ItemService } from '../Item/item.service';
import { User } from '../User/dto/user.model';
import { UserService } from '../User/user.service';
import { RequestActivityDto, RequestInput } from './dto/request.input';
import { Request } from './dto/request.model';
import { RequestService } from './request.service';
export declare class RequestResolver {
    private readonly requestService;
    private readonly userService;
    private readonly itemService;
    constructor(requestService: RequestService, userService: UserService, itemService: ItemService);
    createRequest({ itemId, requestPersonId, reason, wantedRate }: RequestInput): Promise<Request>;
    acceptRequest(data: RequestActivityDto): Promise<Item>;
    rejectRequest(data: RequestActivityDto): Promise<Item>;
    getReqById(reqId: string): Promise<Request>;
    getMyRequests(id: string): Promise<Request[]>;
    getMySendRequests(id: string): Promise<Request[]>;
    item({ itemId }: Request): Promise<Item>;
    requestPerson({ requestPersonId }: Request): Promise<User>;
    requestToPerson({ requestToPersonId }: Request): Promise<User>;
}
