import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthInput } from './dto/auth.input';
import { NewUser } from './dto/new-user';
import { User } from './dto/user.model';
import { UserDocument } from './user.schema';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: NewUser): Promise<User> {
    const hashPassword = await hash(createUserDto.password, this.saltRounds);
    createUserDto.password = hashPassword;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async login(auth: AuthInput): Promise<string> {
    try {
      const user = await this.userModel.findOne({ username: auth.username });
      if (user && user.password === auth.password) {
        const jwtPayload = {
          id: user.id,
          username: user.username,
          userInfo: {
            firstName: user.info.firstName,
            lastName: user.info.lastName,
          },
        };
        return jwt.sign(jwtPayload, process.env.JWT_SECRET);
      } else {
        return 'Login Failed';
      }
    } catch (err) {
      return err;
    }
  }

  async findById(id: Types.ObjectId | string): Promise<User> {
    return await this.userModel.findById(id);
  }
}
