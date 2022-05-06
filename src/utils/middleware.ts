import {getPhotoUrl} from "../data/photoData";
import { FeedPostType} from "../types/appTypes";
import {AppUserInterface} from "../types/authentication";

function mapUserPhotos(usersPhotos: FeedPostType[]) {
  usersPhotos.map((photo) => {
    getPhotoUrl(photo.path || "").then(
      (url: string | undefined) => url && (photo.imageUrl = url)
    );
  });
}

function encodeEmailAddress(userData: AppUserInterface){
  let currentEmail = userData.email;
  currentEmail = encodeURIComponent(currentEmail);
  currentEmail = currentEmail.replace(".", "-");
  return currentEmail;
}

function decodeEmailAddress(email: string){
  let temp = email;
  temp = decodeURIComponent(temp);
  temp = temp.replace("-", ".");
  return temp;
}

export {
  mapUserPhotos,
  encodeEmailAddress,
  decodeEmailAddress
};
