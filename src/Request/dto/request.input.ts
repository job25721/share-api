import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RequestInput {
  @Field(() => String)
  itemId: string;
  @Field(() => String)
  requestPersonId: string;
  @Field(() => String)
  reason: string;
  @Field(() => Number)
  wantedRate: number;
}

@InputType()
export class AcceptRequestDto {
  @Field(() => String)
  reqId: string;
  @Field(() => String)
  acceptPersonId: string;
}
