import { User } from '@firebase/auth';
import { UserInterestsType } from './interests';

export interface BaseUserInterface {
  displayName: string;
  username: string;
  email: string;
  photoURL: string;
  isVerified: boolean;
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
  uid: string;
  bio?: string;
  friends: string[];
  likes: string[];
  interests: UserInterestsType | UserInterestsType[] | [];
}

export interface UserCheckInterface {
  status: number | null;
  user: User | null;
  message?: string | undefined;
}
