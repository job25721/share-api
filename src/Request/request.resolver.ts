import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestInput } from './dto/request.input';
import { Request } from './dto/request.model';
import { RequestService } from './request.service';

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

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
}
