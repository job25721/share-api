import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChatService } from 'src/Chat/chat.service';
import { Chat } from 'src/Chat/dto/chat.model';
import { AuthGuard } from 'src/User/auth.guard';
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
    private readonly chatService: ChatService,
  ) {}

  @UseGuards(new AuthGuard())
  @Mutation(() => Request)
  async createRequest(
    @Args('reqData')
    { itemId, reason, wantedRate }: RequestInput,
    @Context('user') user,
  ): Promise<Request> {
    return await this.requestService.addRequest({
      itemId,
      requestPersonId: user.id,
      reason,
      wantedRate,
    });
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Item)
  async acceptDelivered(
    @Args('reqData') data: RequestActivityDto,
    @Context('user') user,
  ) {
    return await this.requestService.acceptDelivered(data, user.id);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Item)
  async acceptRequest(
    @Args('reqData') data: RequestActivityDto,
    @Context('user') user,
  ): Promise<Item> {
    return await this.requestService.acceptRequest(data, user.id);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Item)
  async rejectRequest(
    @Args('reqData') data: RequestActivityDto,
    @Context('user') user,
  ): Promise<Item> {
    return await this.requestService.rejectRequest(data, user.id);
  }

  @Query(() => Request)
  getReqById(@Args('reqId') reqId: string): Promise<Request> {
    return this.requestService.findById(reqId);
  }

  @UseGuards(new AuthGuard())
  @Query(() => [Request])
  getMyRequests(@Context('user') user): Promise<Request[]> {
    return this.requestService.findMyRequests(user.id);
  }

  @UseGuards(new AuthGuard())
  @Query(() => [Request])
  getMySendRequests(@Context('user') user): Promise<Request[]> {
    return this.requestService.findMySendRequests(user.id);
  }

  @UseGuards(new AuthGuard())
  @Query(() => [Request])
  getMySuccessRequests(@Context('user') user): Promise<Request[]> {
    return this.requestService.findMySuccessRequests(user.id);
  }

  @ResolveField(() => Chat)
  chat(@Parent() { chat_uid }: Request): Promise<Chat> {
    return this.chatService.findById(chat_uid);
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
