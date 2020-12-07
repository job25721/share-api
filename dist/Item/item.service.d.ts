import { Model, Types } from 'mongoose';
import { ItemLogService } from '../ItemLog/itemLog.service';
import { changeStatus, ItemInput } from './dto/item.input';
import { Item } from './dto/item.model';
import { ItemDocument } from './item.schema';
export declare class ItemService {
    private itemModel;
    private readonly itemLogService;
    constructor(itemModel: Model<ItemDocument>, itemLogService: ItemLogService);
    findAll(): Promise<Item[]>;
    findById(id: Types.ObjectId | string): Promise<Item>;
    findMyAllItem(ownerId: string): Promise<Item[]>;
    findMyItem(data: {
        ownerId: string;
        itemId: string;
    }): Promise<Item>;
    create(createItemDto: ItemInput): Promise<Item>;
    changeItemStatus(data: changeStatus): Promise<Item>;
}
