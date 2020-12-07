import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Item } from 'src/Item/dto/item.model';
import { ItemService } from 'src/Item/item.service';
import { User } from 'src/User/dto/user.model';
import { UserService } from 'src/User/user.service';
import { RequestInput } from './dto/request.input';
import { Request } from './dto/request.model';
import { RequestService } from './request.service';

@Resolver(() => Request)
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
    private readonly userService: UserService,
    private readonly itemService: ItemService,
  ) {}

  @Mutation(() => Request)
  async createRequest(
    @Args('reqData')
    { itemId, requestPersonId, reason, wantedRate }: RequestInput,
  ): Promise<Request> {
    return await this.requestService.addRequest({
      itemId,
      requestPersonId,
      reason,
      wantedRate,
    });
  }

  @Query(() => Request)
  getReqById(@Args('reqId') reqId: string): Promise<Request> {
    return this.requestService.findById(reqId);
  }

  @ResolveField(() => Item)
  item(@Parent() { itemId }: Request): Promise<Item> {
    return this.itemService.findById(itemId);
  }

  @ResolveField(() => User)
  requestPerson(@Parent() { requestPersonId }: Request): Promise<User> {
    return this.userService.findById(requestPersonId);
  }
}
