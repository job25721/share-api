import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class ChatMessage {
  @Field(() => String)
  message: string;
  @Field(() => Date)
  timestamp: Date;
}

@ObjectType()
export class Chat {
  @Field(() => ID)
  id?: Types.ObjectId;
  @Field(() => String)
  from: Types.ObjectId;
  @Field(() => String)
  to: Types.ObjectId;
  @Field(() => [ChatMessage])
  data: ChatMessage[];
  @Field(() => String)
  for: Types.ObjectId | string;
  @Field(() => Boolean)
  active: boolean;
}
