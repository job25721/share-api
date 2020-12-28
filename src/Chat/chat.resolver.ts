import { UseGuards } from '@nestjs/common';
import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { Item } from 'src/Item/dto/item.model';
import { ItemService } from 'src/Item/item.service';
import { RequestService } from 'src/Request/request.service';
import { AuthGuard } from 'src/User/auth.guard';
import { User } from 'src/User/dto/user.model';
import { ChatService } from './chat.service';
import { Chat } from './dto/chat.model';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly itemService: ItemService,
    private readonly requestService: RequestService,
  ) {}

  @UseGuards(new AuthGuard())
  @Query(() => [Chat])
  async getMyChat(@Context('user') user): Promise<Chat[]> {
    console.log(user);

    const myReq = await this.requestService.findMyRequests(user.id);
    const mySendReq = await this.requestService.findMySendRequests(user.id);

    const myChat = [
      ...myReq.map(({ chat_uid }) => chat_uid),
      ...mySendReq.map(({ chat_uid }) => chat_uid),
    ];

    return await this.chatService.findChat(myChat);
  }

  @ResolveField(() => Item)
  async getItemChat(@Parent() { for: itemId }: Chat): Promise<Item> {
    return await this.itemService.findById(itemId);
  }
}
