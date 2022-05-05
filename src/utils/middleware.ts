import {getPhotoUrl} from "../data/photoData";
import { FeedPostType} from "../types/appTypes";

function mapUserPhotos(usersPhotos: FeedPostType[]) {
  usersPhotos.map((photo) => {
    getPhotoUrl(photo.path || "").then(
      (url: string | undefined) => url && (photo.imageUrl = url)
    );
  });
}

export {
  mapUserPhotos
};
