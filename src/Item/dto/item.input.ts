import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class changeStatus {
  @Field(() => String)
  itemId: string | Types.ObjectId;
  @Field(() => String)
  status: string;
}

@InputType()
export class ItemInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  category: string;
  @Field(() => [String], { nullable: true })
  tag: string[];
}
