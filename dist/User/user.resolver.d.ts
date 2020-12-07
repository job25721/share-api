import { NewUser } from './dto/new-user';
import { User } from './dto/user.model';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(newUser: NewUser): Promise<User>;
}
