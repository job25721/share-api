import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Request {
  @Field(() => ID)
  id?: string;
  @Field(() => String)
  itemId: Types.ObjectId | string;
  @Field(() => String)
  requestPersonId: Types.ObjectId | string;
  @Field(() => String)
  requestToPersonId: Types.ObjectId | string;
  @Field(() => Date)
  timestamp: Date;
  @Field(() => String)
  reason: string;
  @Field(() => Number)
  wantedRate: number;
  @Field(() => String)
  status: string;
}
