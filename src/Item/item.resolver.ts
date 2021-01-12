import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ItemLog } from '../ItemLog/dto/itemLog.model';

import { ItemLogService } from '../ItemLog/itemLog.service';

import { User } from '../User/dto/user.model';
import { UserService } from '../User/user.service';
import { ItemInput, ChangeStatus } from './dto/item.input';
import { Item } from './dto/item.model';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    private readonly itemLogService: ItemLogService,
  ) {}

  @Query(() => [Item])
  async getAllItem(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Query(() => Item)
  async getItemById(@Args('itemId') id: string): Promise<Item> {
    return await this.itemService.findById(id);
  }

  @Query(() => [Item])
  async getMyItem(@Args('ownerId') id: string): Promise<Item[]> {
    return await this.itemService.findMyAllItem(id);
  }

  @Mutation(() => Item)
  async updateItemStatus(@Args('data') data: ChangeStatus): Promise<Item> {
    return await this.itemService.changeItemStatus(data);
  }

  @Mutation(() => Item)
  async addNewItem(@Args('item') newItem: ItemInput): Promise<Item> {
    return await this.itemService.create(newItem);
  }

  @ResolveField(() => User)
  async owner(@Parent() { ownerId }: Item): Promise<User> {
    return await this.userService.findById(ownerId);
  }

  @ResolveField(() => ItemLog)
  async log(@Parent() { logId }: Item): Promise<ItemLog> {
    return await this.itemLogService.findById(logId);
  }
}
