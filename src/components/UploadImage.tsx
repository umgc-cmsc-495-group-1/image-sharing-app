import React, { useEffect, useState, useRef } from 'react';
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-converter"
import "@tensorflow/tfjs-backend-webgl"
import * as mobilenet from '@tensorflow-models/mobilenet'

const UploadImage = () => {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const imageRef = useRef<any>()

  const loadModel = async () => {
    setIsModelLoading(true);

    try {
      const model = await mobilenet.load()
      console.log(model)
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.error(error);
      setIsModelLoading(false);
    }

  }

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(undefined);
    }
  }

  const identify = async () => {
    //   let results: Promise<{
    //     className: string;
    //     probability: number;
    // }[]>
    if (model !== null) {
      const results = await model.classify(imageRef.current)
      console.log(results)
    }

  }

  const imageCss: React.CSSProperties = {
    width: '25%',
    height: '25%',
  }
  const imageHolderCss: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
  }

  useEffect(() => {
    loadModel()
  }, [])

  if (isModelLoading) {
    return <h2>Model Loading...</h2>
  }

  console.log('test')

  return (
    <div>
      <h1>Image Identification</h1>
      <div>
        <input type="file" accept='image/*'
          capture='environment' onChange={uploadImage}
        />
      </div>
      <div className="mainwrapper">
        <div className="mainContent">
          <div className="imageHolder" style={imageHolderCss}>
            {
              (imageUrl !== undefined) ?
                <>
                  <img src={imageUrl} alt="Image Preview" style={imageCss} ref={imageRef} />
                  <button className='button' onClick={identify}>Identify Image</button>
                </>
                :
                ""
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  UploadImage
}