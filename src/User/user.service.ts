import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NewUser } from './dto/new-user';
import { User } from './dto/user.model';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: NewUser): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findById(id: Types.ObjectId | string): Promise<User> {
    return await this.userModel.findById(id);
  }
}
