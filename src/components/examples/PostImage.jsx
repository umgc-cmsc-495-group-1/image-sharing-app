import React, { useState, useEffect } from "react";
import { getPhotoUrl } from '../data/photoData';
import { auth } from '../firebaseSetup'
import { onAuthStateChanged } from "firebase/auth";

/**
 * @description example of a simple component which gets
 * the url of a photo from cloud storage using the path
 * then displays it in the <img> if it exists
 * @param {*} param0
 * @returns
 */
export const PostImage = ({ path }) => {

  const [uid, setUid] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid("");
    }
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getPhotoUrl(path).then((url) => !!url && setImageUrl(url));
  }, [path]);

  return (
    <div >
      <img
        src={imageUrl || "/placeholder.png"}
        alt="profile"
        width={100} height={100}
      />
      {uid}
    </div>
  );
}

