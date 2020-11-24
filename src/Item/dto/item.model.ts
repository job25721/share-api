import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Item {
  @Field(() => ID)
  id?: Types.ObjectId;
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  category: string;
  @Field(() => [String])
  tag: string[];
  @Field(() => String)
  userId: Types.ObjectId | string;
  @Field(() => String)
  status: string;
  @Field(() => Date)
  createdDate: Date;
}
