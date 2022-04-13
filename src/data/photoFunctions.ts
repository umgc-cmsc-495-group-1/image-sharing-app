// import React, { useRef, useState, useEffect } from "react";
// import { getPhotoUrl, updateProfileImg } from '../data/photoData';
// import { useFirebaseAuth } from '../context/AuthContext';


// example of javascript usage
/*
export const ProfileImage = () => {

    const id = (useFirebaseAuth()?.uid || 'not authenticated')
   // const id = '9WNXDNDFOOCn1aVTYKc2rsOPInCH' // put a hardcoded value here for testing

    const fileInput = useRef(null); //pass ref obj to react with ref=""
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        getPhotoUrl(id).then((url) => !!url && setImageUrl(url)); /////
    }, [id]);

    const fileChange = async (files) => {
        if (!id) {return}
        const ref = await updateProfileImg(id, files[0]);

        // console.log(ref);
        const downloadUrl = await getPhotoUrl(ref);

        setImageUrl(downloadUrl);
        console.log("url", imageUrl);
    }

    return (
      <div >
          <img
          src={imageUrl || "/placeholder.png"}
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
          onClick = {() => fileInput.current.click()}
          >upload photos
          </button>
      </div>
    );
}

// ProfileImage.propTypes = {
////    id: PropTypes.string | ''
//  };

//separate photo component example
import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return <img src={src} alt={caption} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
};

//working with filenames ex
// Grab the file
        const file = req.file;        // Format the filename
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;
*/

export{}