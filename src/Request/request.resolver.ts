import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Item } from '../Item/dto/item.model';
import { ItemService } from '../Item/item.service';
import { User } from '../User/dto/user.model';
import { UserService } from '../User/user.service';
import { RequestActivityDto, RequestInput } from './dto/request.input';
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

  @Mutation(() => Item)
  async acceptRequest(
    @Args('reqData') data: RequestActivityDto,
  ): Promise<Item> {
    return await this.requestService.acceptRequest(data);
  }

  @Mutation(() => Item)
  async rejectRequest(
    @Args('reqData') data: RequestActivityDto,
  ): Promise<Item> {
    return await this.requestService.rejectRequest(data);
  }

  @Query(() => Request)
  getReqById(@Args('reqId') reqId: string): Promise<Request> {
    return this.requestService.findById(reqId);
  }

  @Query(() => [Request])
  getMyRequests(@Args('myId') id: string): Promise<Request[]> {
    return this.requestService.findMyRequests(id);
  }

  @Query(() => [Request])
  getMySendRequests(@Args('myId') id: string): Promise<Request[]> {
    return this.requestService.findMySendRequests(id);
  }

  @ResolveField(() => Item)
  item(@Parent() { itemId }: Request): Promise<Item> {
    return this.itemService.findById(itemId);
  }

  @ResolveField(() => User)
  requestPerson(@Parent() { requestPersonId }: Request): Promise<User> {
    return this.userService.findById(requestPersonId);
  }

  @ResolveField(() => User)
  requestToPerson(@Parent() { requestToPersonId }: Request): Promise<User> {
    return this.userService.findById(requestToPersonId);
  }
}
