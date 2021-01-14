import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthInput } from './dto/auth.input';
import { NewUser } from './dto/new-user';
import { User } from './dto/user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => User)
  async createUser(@Args('user') newUser: NewUser): Promise<User> {
    return await this.userService.create(newUser);
  }

  @Mutation(() => String)
  async login(@Args('auth') auth: AuthInput): Promise<string> {
    return await this.userService.login(auth);
  }

  @UseGuards(new AuthGuard())
  @Query(() => User)
  async getMyInfo(@Context('user') user): Promise<User> {
    return this.userService.getMyInfo(user.id);
  }
}
