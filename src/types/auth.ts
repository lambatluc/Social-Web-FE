import { IToken } from './token';
import { IUser } from './user';

export interface ISignup {
  email: string;
  username: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginResponse extends IToken {
  user: IUser;
}
