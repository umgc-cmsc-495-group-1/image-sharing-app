import { serverTimestamp, FieldValue  } from 'firebase/firestore';

/**
 * Interface for firestore data
 * associated with a photo post
 */
 export interface photoData {
  photoId: string, // make both ids user id for profile?
  userId: string,
  imgName?: string,
  caption?: string,
  numberLikes: number,
  path?: string,
  // url?: string,
  tags?: string[],
  comments?: string[],
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
  imgName?: string;
  caption?: string;
  numberLikes: number;
  path?: string;
  // url?: string;
  tags?: string[];
  comments?: string[];
  timestamp?: FieldValue;
  constructor(data: photoData) {
    this.photoId = data.photoId;
    this.userId = data.userId;
    this.imgName = data.imgName;
    this.caption = data.caption || "";
    this.numberLikes = 0;
    this.path = data.path;
    // this.url = data.url ||  "";
    this.tags = data.tags || [];
    this.comments = data.comments || [];
    this.timestamp = data.timestamp || serverTimestamp();
  }
}
