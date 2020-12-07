import { Model, Types } from 'mongoose';
import { NewUser } from './dto/new-user';
import { User } from './dto/user.model';
import { UserDocument } from './user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: NewUser): Promise<User>;
    findById(id: Types.ObjectId | string): Promise<User>;
}
