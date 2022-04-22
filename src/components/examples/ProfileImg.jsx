import React, { useRef, useState, useEffect } from "react";
import { updateProfileImg, getProfileUrl } from '../data/photoData';
import { auth } from '../firebaseSetup'
import { onAuthStateChanged } from "firebase/auth";


/**
 * @description example of a simple component to
 * display a profile image, it gets the image url
 * (location in storage) to use as src attribute in
 * <img> tag
 * A placeholder is displayed if the image does not
 * exist
 * @returns
 */
export const ProfileImage = () => {

  const [uid, setUid] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid("");
    }
  });

  const id = (uid || 'not authenticated')
  // const id = '9WNXDNDFOOCn1aVTYKc2rsOPInCH' // put a hardcoded value here for testing

  const fileInput = useRef(null); //pass ref obj to react with ref=""
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getProfileUrl(id, { fileInput }).then((url) => !!url && setImageUrl(url));
  }, [id]);


  const fileChange = async (files) => {
    if (!id) { return }
    console.log(files[0].name)
    const ref = await updateProfileImg(id, files[0]);

    console.log(ref);
    console.log("file", files[0].name);
    console.log("url: ", { imageUrl });
  }

  return (
    <div >
      <img
        src={uid? imageUrl : "/placeholder.png"}
        alt="profile"
        width={100} height={100}
      />
      <input
        type="file"
        accept=".png, .jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <button className="ui grey button upload-button"
        onClick={() => fileInput.current.click()}
      >upload profile photo
      </button>
    </div>
  );
}

