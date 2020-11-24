import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ItemLog } from 'src/ItemLog/dto/ItemLog.model';

import { ItemLogService } from 'src/ItemLog/ItemLog.service';
import { User } from 'src/User/dto/user.model';
import { UserService } from 'src/User/user.service';
import { ItemInput } from './dto/item.input';
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

  @Mutation(() => Item)
  async addNewItem(@Args('item') newItem: ItemInput): Promise<Item> {
    return await this.itemService.create(newItem);
  }

  @ResolveField(() => User)
  async owner(@Parent() { userId }: Item): Promise<User> {
    return await this.userService.findById(userId);
  }

  @ResolveField(() => ItemLog)
  async log(@Parent() { logId }: Item): Promise<ItemLog> {
    return await this.itemLogService.findById(logId);
  }
}
