export interface PhotoDataInterface {
  photoId: string, // make both ids user id for profile?
  userId: string,
  imgName?: string,
  caption?: string,
  numberLikes: number,
  comments: string[], // this may need to be moved to a sub-collection
  imgURL?: string
}