import {getPhotoUrl} from "../data/photoData";
import { FeedPostType} from "../types/appTypes";
import {AppUserInterface} from "../types/authentication";

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;!!#$%&*:\s@"]+(\.[^<>()[\]\\.,;!#$%&*:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const ILLEGAL_CHARACTERS_REGEX = /[^A-Za-z0-9_\- ]/gi;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!$#])[A-Za-z0-9!$#]{8,20}$/;
export const sanitizeDisplayName = (displayName: string) => displayName.replace(ILLEGAL_CHARACTERS_REGEX, "");

export function mapUserPhotos(usersPhotos: FeedPostType[]) {
  usersPhotos.map((photo) => {
    getPhotoUrl(photo.path || "").then(
      (url: string | undefined) => url && (photo.imageUrl = url)
    );
  });
}

export function encodeEmailAddress(userData: AppUserInterface){
  let currentEmail = userData.email;
  currentEmail = encodeURIComponent(currentEmail);
  currentEmail = currentEmail.replace(".", "-");
  return currentEmail;
}

export function decodeEmailAddress(email: string){
  let temp = email;
  temp = decodeURIComponent(temp);
  temp = temp.replace("-", ".");
  return temp;
}
