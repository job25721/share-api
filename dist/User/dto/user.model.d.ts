import { Types } from 'mongoose';
export declare class UserInfo {
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: number;
}
export declare class User {
    id?: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    avatar: string;
    info: UserInfo;
}
