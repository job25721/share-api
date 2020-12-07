import { ItemLog } from '../ItemLog/dto/itemLog.model';
import { ItemLogService } from '../ItemLog/itemLog.service';
import { User } from '../User/dto/user.model';
import { UserService } from '../User/user.service';
import { ItemInput, changeStatus } from './dto/item.input';
import { Item } from './dto/item.model';
import { ItemService } from './item.service';
export declare class ItemResolver {
    private readonly itemService;
    private readonly userService;
    private readonly itemLogService;
    constructor(itemService: ItemService, userService: UserService, itemLogService: ItemLogService);
    getAllItem(): Promise<Item[]>;
    getItemById(id: string): Promise<Item>;
    getMyItem(id: string): Promise<Item[]>;
    updateItemStatus(data: changeStatus): Promise<Item>;
    addNewItem(newItem: ItemInput): Promise<Item>;
    owner({ ownerId }: Item): Promise<User>;
    log({ logId }: Item): Promise<ItemLog>;
}
