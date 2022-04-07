// import React, { useRef, useState, useEffect } from "react";
// import { uploadImage, getDownloadUrl } from './data/photoFunctions';

/**

export const Avatar = ({ id }) => {
    const fileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        getDownloadUrl(id).then((url) => !!url && setImageUrl(url)); /////
    }, [id]);

    //const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${file.name}`;
    //const newImageRef = ref(getStorage(), filePath);
    //const fileSnapshot = await uploadBytesResumable(newImageRef, file);

    const fileChange = async (files) => {
        //const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${file.name}`;
        const ref = await uploadImage(id, files[0], updateProgress);
        const downloadUrl = await ref.getDownloadUrl;
        setImageUrl(downloadUrl); ///////////
    };
    const updateProgress = (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
    };

    return (
        <div >
          <img className="ui image"
          src={imageUrl || "/placeholder.png"}
          alt="profile" />
          <input className="file-input"
          type="file"
          accept=".png, .jpg, jpeg"
          ref={fileInput}
          onChange={(e) => fileChange(e.target.files)}
          />
          <progress style={{width: '100%'}} max="100" value={uploadProgress} />
          <button className="ui grey button upload-button"
          onClick = {() => fileInput.current.click()}
          >upload photos
          </button>
      </div>
    );
};


 */
export {}