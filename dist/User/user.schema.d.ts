import { Document } from 'mongoose';
import { UserInfo } from './dto/user.model';
declare class User {
    username: string;
    password: string;
    email: string;
    avatar: string;
    info: UserInfo;
}
export declare type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<any>;
export {};
