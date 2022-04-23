// import { useState, useEffect, useRef } from "react";
// import "@tensorflow/tfjs-core"
// import "@tensorflow/tfjs-converter"
// import "@tensorflow/tfjs-backend-webgl"
// import * as mobilenet from '@tensorflow-models/mobilenet'

// // const [isModelLoading, setIsModelLoading] = useState(false);
// const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
// const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

// const imageRef = useRef<any>()

// const loadModel = async () => {
//   // setIsModelLoading(true);

//   try {
//     const model = await mobilenet.load()
//     console.log(model)
//     setModel(model);
//     // setIsModelLoading(false);
//   } catch (error) {
//     console.error(error);
//     // setIsModelLoading(false);
//   }

// }

// const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { files } = e.target;
//   if (files !== null && files.length > 0) {
//     const url = URL.createObjectURL(files[0]);
//     setImageUrl(url);
//   } else {
//     setImageUrl(undefined);
//   }
// }

// const identify = async () => {
//   if (model !== null) {
//     const results = await model.classify(imageRef.current)
//     console.log(results)
//   }

// }

// useEffect(() => {
//   loadModel()
// }, [])


export default function useIdentifyImage() {

}
