import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewUser } from './dto/new-user';
import { User } from './dto/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => User)
  async createUser(@Args('user') newUser: NewUser): Promise<User> {
    return await this.userService.create(newUser);
  }
}
