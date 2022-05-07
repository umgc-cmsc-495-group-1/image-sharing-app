import { FieldValue } from "firebase/firestore";
import {UserInterestsType} from "./interests";
import {AppUserInterface} from "./authentication"

/**
 * @description - User Images Base Interface
 * @export interface UserImagesInterface
 * @interface UserImagesInterface
 * @property {string} imageUrl - location of the image
 */
export interface UserImagesInterface {
  imageUrl: string;
}

/**
 * @description - User Profile Base Interface
 * @export interface UserInterface
 * @interface UserInterface
 * @property {string} uid - user id of the user
 * @property {string} username - username of the user
 */
export interface UserInterface {
  uid: string;
  username: string;
}

export type UserType = UserInterface;


/**
 * @description - Comment Interface with extended user information
 * @export interface CommentInterface
 * @interface CommentInterface
 * @extends {UserInterface}
 * @property {string} comment - comment of the user
 * @property {string} uid - user id of the user
 * @property {string} username - username of the user
 */
export interface CommentInterface extends UserInterface {
  comment: string | string[];
}

/**
 * @description This interface is used to create a new comment
 * @export interface CommentInterface
 * @interface CommentInterface
 * @extends {UserInterface} UserInterface
 * @property {string} comment - The comment
 * @property {string} uid - The user id
 * @property {string} username - The username
 */
export type CommentType = CommentInterface | CommentInterface[];

/**
 * @description - Specific Feed Post Interface
 * @export interface FeedPostInterface
 * @interface FeedPostInterface
 * @property {string} uid - user id of the user
 * @property {string} username - username of the user
 * @property {string} pid - post id of the post
 * @property {string} postText - caption of the post
 * @property {number} numberLikes - number of likes on the post
 * @property {number} numberComments - number of comments on the post
 * @property {string} imageUrl - location of the image
 * @property {CommentInterface[]} comments - comments on the post
 */
export interface FeedPostInterface {
  uid: string;
  username: string | null;
  pid: string;
  postText: string;
  likes: string[];
  isPrivate: boolean;
  imageUrl?: string | undefined;
  comments: CommentInterface[];
  classification: UserInterestsType;
  path?: string | undefined;
  timestamp: FieldValue;
}

export interface AvatarImageInterface {
  uid: string;
  email: string | null;
  displayName: string | null;
  pid: string;
  imageUrl: string;
  path: string;
  timestamp: FieldValue;
}

export type AvatarImageType = AvatarImageInterface;

/**
 * @description - Specific Feed Post Interface
 * @export interface FeedPostInterface
 * @interface FeedPostInterface
 * @property {string} uid - user id of the user
 * @property {string} username - username of the user
 * @property {string} pid - post id of the post
 * @property {string} postText - caption of the post
 * @property {number} numberLikes - number of likes on the post
 * @property {number} numberComments - number of comments on the post
 * @property {string} imageUrl - location of the image
 * @property {CommentInterface[]} comments - comments on the post
 */
export interface FeedPostWithUserInterface extends FeedPostInterface {
  user: AppUserInterface;
}



/**
 * @description - Feed Post Type based on the FeedPostInterface
 * @export type FeedPostType
 * @type FeedPostType
 * @extends {FeedPostInterface} FeedPostInterface
 */
export type FeedPostType = FeedPostInterface;

/**
 * @description - User profile interface
 * @export interface ProfileInterface
 * @interface ProfileInterface
 * @extends {UserInterface} UserInterface
 * @extends {UserImagesInterface} UserImagesInterface
 * @property {string} imageUrl - location of the image
 * @property {string} uid - user id of the user
 * @property {string} username - username of the user
 * @property {string} bio - bio of the user
 * @property {string} posts - number of posts the user has made
 * @property {string} friends - number of followers the user has
 */
export interface ProfileInterface extends UserInterface, UserImagesInterface {
  displayName: string;
  email: string;
  avatarImage: string;
  friends: [];
  likes: [];
  posts: number;
  bio: string;
}

export interface TestProfileInterface extends ProfileInterface {
  testImages: string[];
}


export interface MetaDataBarInterface extends FeedPostInterface {
  margin: number;
  padding: number;
  screenWidth: number;
  screenHeight: number;
}

export interface MarginPadding {
  margin: number;
  padding: number;
}

export interface LikeIconProps {
  isLiked: boolean;
  numberOfLikes?: number;
  favoriteIcon?: IconType | null;
  favoriteBorderIcon?: IconType | null;
}

export interface CommentIconProps extends MarginPadding {
  numberOfComments: number;
  commentIcon?: IconType | null;
}

export interface PostDetailProps extends MarginPadding {
  username: string | null;
  postText: string;
  metaDataProps?: boolean | false;
}

export type ImageItemProps = {
  src: string | undefined;
  margin: number;
  padding: number;
  alt?: string;
  loading?: "lazy" | "eager" | undefined;
  sizes?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
}

export interface ProfileImageInterface extends ImageItemProps {
  username: string;
}

export interface ProfileUpdateInterface {
  displayName: string,
  email: string,
  bio: string
}

export interface ImageCompressionWorkerInterface {
  progress: number;
  inputSize: string;
  outputSize: string;
  inputUrl: string;
  outputUrl: string;
}

export interface ImageCompressionOptionsBasic {
  maxSizeMB: number;               // (default: Number.POSITIVE_INFINITY)
  maxWidthOrHeight: number;        // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
                                   // but, automatically reduce the size to smaller than the maximum Canvas size supported by each browser.
                                   // Please check the Caveat part for details.
  // onProgress: Function,         // optional, a function takes one progress argument (percentage from 0 to 100)
  // eslint-disable-next-line no-unused-vars
  onProgress: (progress: number, useWebWorker: boolean) => void;
  useWebWorker: boolean;          // optional, use multi-thread web worker, fallback to run in main-thread (default: true)

  signal?: AbortSignal;           // options, to abort / cancel the compression
}

export interface ImageCompressionOptionsAdvanced extends ImageCompressionOptionsBasic {
  // following options are for advanced users
  maxIteration: number;           // optional, max number of iteration to compress the image (default: 10)
  exifOrientation: number;        // optional, see https://stackoverflow.com/a/32490603/10395024
  fileType: string;               // optional, fileType override e.g., 'image/jpeg', 'image/png' (default: file.type)
  initialQuality: number;         // optional, initial quality value between 0 and 1 (default: 1)
  alwaysKeepResolution: boolean;  // optional, only reduce quality, always keep width and height (default: false)
}
