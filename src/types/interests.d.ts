export interface ImageClassifcationInterface {
  className: string[],
  probablility: number;
}

export interface UserInterestsInterface extends ImageClassifcationInterface {
  viewCount: number | 0;
  isLiked: boolean;
  isCommentedOn: boolean;
}

export type UserInterestsType = UserInterestsInterface;