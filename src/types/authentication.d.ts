import { User } from '@firebase/auth';
//@firebase/auth/dist/auth-public

export interface BaseUserInterface {
  first?: string | undefined;
  last?: string | undefined;
  displayName: string;
  username?: string | undefined;
  email: string;
}

export interface UserInterface extends BaseUserInterface {
  password: string;
  verifyPassword?: string | undefined;
}

export type GoogleUserType = BaseUserInterface;

export interface ReturnUserInterface {
  email: string;
  password: string;
}

export interface AppUserInterface extends BaseUserInterface {
  uid: string,
  bio?: string,
  friends: string[],
  likes: string[]
}

export interface UserCheckInterface {
  status: number | null;
  user: User | null;
  message?: string | undefined;
}