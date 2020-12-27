import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Item } from 'src/Item/dto/item.model';
import { ItemService } from 'src/Item/item.service';
import { RequestService } from 'src/Request/request.service';
import { ChatService } from './chat.service';
import { Chat } from './dto/chat.model';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly itemService: ItemService,
    private readonly requestService: RequestService,
  ) {}

  @Query(() => [Chat])
  async getMyChat(@Args('userId') userId: string): Promise<Chat[]> {
    const myReq = await this.requestService.findMyRequests(userId);
    const mySendReq = await this.requestService.findMySendRequests(userId);

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
