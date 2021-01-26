import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class ChatMessage {
  @Field(() => String)
  from: string;
  @Field(() => String)
  to: string;
  @Field(() => String)
  message: string;
  @Field(() => Date)
  timestamp: Date;
}

@ObjectType()
export class Chat {
  @Field(() => ID)
  id?: Types.ObjectId;
  @Field(() => [ChatMessage])
  data: ChatMessage[];
  @Field(() => Boolean)
  active: boolean;
  @Field(() => Number)
  lastestUpdate: number;
}
