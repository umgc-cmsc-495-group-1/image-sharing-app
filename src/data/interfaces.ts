import { serverTimestamp, FieldValue  } from 'firebase/firestore';

/**
 * Interface for firestore data
 * associated with a photo post
 */
 export interface photoData {
  photoId: string, // make both ids user id for profile?
  userId: string,
  displayName: string,
  imgName?: string,
  caption?: string,
  numberLikes: number,
  path?: string,
  url?: string,
  tags?: string[],
  comments?: string[],
  numberComments: number,
  timestamp?: FieldValue
}

/**
 * Trying this as a way to retrieve
 * data as an object rather than
 * DocumentData
 */
export class ImgData {
  photoId: string;
  userId: string;
  displayName: string;
  imgName?: string;
  caption?: string;
  numberLikes: number;
  path?: string;
  url?: string;
  tags?: string[];
  comments?: string[];
  numberComments: number;
  timestamp?: FieldValue;
  constructor(data: photoData) {
    this.photoId = data.photoId;
    this.userId = data.userId;
    this.displayName = data.displayName;
    this.imgName = data.imgName;
    this.caption = data.caption || "";
    this.numberLikes = 0;
    this.path = data.path;
    this.url = data.url ||  "";
    this.tags = data.tags || [];
    this.comments = data.comments || [];
    this.numberComments = 0;
    this.timestamp = data.timestamp || serverTimestamp();
  }
}
