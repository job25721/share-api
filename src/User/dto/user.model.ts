import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class UserInfo {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => Date)
  birthDate: Date;
  @Field(() => Number)
  age: number;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id?: Types.ObjectId;
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  avatar: string;
  @Field(() => UserInfo)
  info: UserInfo;
}

@ObjectType()
export class FindUserResponse {
  @Field(() => ID)
  id?: Types.ObjectId;
  @Field(() => String)
  avatar: string;
  @Field(() => UserInfo)
  info: UserInfo;
}
