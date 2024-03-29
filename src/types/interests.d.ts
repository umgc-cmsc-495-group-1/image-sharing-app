import {AppUserInterface} from "./authentication";
import {FeedPostInterface} from "./appTypes";

export interface ImageClassificationInterface {
  className: string;
  probability: number;
}

export type ImageClassificationType = Array<ImageClassificationInterface>;

export interface UserInterestsInterface {
  classifications: ImageClassificationType;
  viewCount: number | 0;
  isLiked: boolean;
  isCommentedOn: boolean;
}

export type UserInterestsType = UserInterestsInterface;

export interface CreatePostInterface {
  open: boolean;
  handleClose: () => void
}

// export interface GraphSortInterface {
//   user: AppUserInterface;
//   post: FeedPostInterface;
// }

