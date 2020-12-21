import { Args, Resolver, Query, ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ChatService } from './chat.service';
import { Chat } from './dto/chat.model';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [Chat])
  async getMyChat(
    @Args('chatUidArr', { type: () => [String] }) _chatUid: string[],
  ): Promise<Chat[]> {
    const castedUid = _chatUid.map((each) => Types.ObjectId(each));
    return await this.chatService.findChat(castedUid);
  }
}
