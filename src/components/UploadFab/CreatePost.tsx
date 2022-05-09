import React, {useEffect, useState, useRef, useContext} from "react";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import imageCompression from "browser-image-compression";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { LoadingBackdrop } from "./LoadingBackdrop";
import ErrorsDisplay from "../ErrorsDisplay";
import {ImageCompressionWorkerInterface} from "../../types/appTypes";
import {
  CreatePostInterface,
  ImageClassificationType,
  UserInterestsType,
} from "../../types/interests";
import { AuthContext } from "../../context/AuthContext";
import { fabPostCallback } from "../../data/photoData";

const CreatePost: React.FC<CreatePostInterface> = ({ open, handleClose }) => {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [webWorkerData, setWebWorkerData] = useState<ImageCompressionWorkerInterface>({
    progress: 0,
    inputSize: "",
    outputSize: "",
    inputUrl: "",
    outputUrl: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const {user} = useContext(AuthContext);
  // eslint-disable-next-line
  const imageRef = useRef<any>();
  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);
  const handleIsPrivate = (event: React.ChangeEvent<HTMLInputElement>) => setIsPrivate(event.target.checked);

  const handleOnProgress = (progress: number, useWebWorker: boolean) => {
    if (useWebWorker) {
      setWebWorkerData({
        ...webWorkerData,
        progress,
      });
    }
  };

  const handleCompressImage = async (file: File, fileType: string) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      onProgress: (p: number) => handleOnProgress(p, true),
      fileType: fileType
    };
    setWebWorkerData({
      ...webWorkerData,
      inputSize: (file.size / 1024 / 1024).toFixed(2),
      inputUrl: URL.createObjectURL(file),
    })
    const result = await imageCompression(file, options);
    setWebWorkerData({
      ...webWorkerData,
      outputSize: (file.size / 1024 / 1024).toFixed(2),
      outputUrl: URL.createObjectURL(file),
    });
    return result;
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.error(error);
      setIsModelLoading(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      await handleCompressImage(files[0], files[0].type).then(result => {
        const file = new File([result], result.name, { type: result.type });
        setFileToUpload(file);
      });
      setFileToUpload(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(undefined);
      setFileToUpload(undefined);
      setWebWorkerData({
        progress: 0,
        inputSize: "",
        outputSize: "",
        inputUrl: "",
        outputUrl: "",
      });
    }
  };

  const identify = async () => new Promise<ImageClassificationType>((resolve) => {
      if (model !== null) {
        const results = model.classify(imageRef.current);
        return resolve(results);
      }
    });

  const validateData = () => {
    setErrors([]);
    if (imageUrl === undefined)
      setErrors((prevErrors) => [...prevErrors, "Please upload an image"]);
    if (description.length < 10 || description.length > 140)
      setErrors((prevErrors) => [
        ...prevErrors,
        "Description must be between 10 and 140 characters",
      ]);

    return errors.length == 0;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validateData()) {
      const results = await identify(); // identify the image
      const classification: UserInterestsType = {
        classifications: results,
        viewCount: 0,
        isLiked: false,
        isCommentedOn: false,
      };
      // upload the data to the database
      await fabPostCallback(
        classification,
        description,
        isPrivate,
        user,
        fileToUpload
      ).then(() => {
        handleClose();
        setFileToUpload(undefined);
        setDescription("");
        setIsPrivate(false);
        setErrors([]);
        setImageUrl("");
      }).catch((error) => {
        console.error(error);
        setErrors((prevErrors) => [
          ...prevErrors,
          "Error Uploading Image"
        ]);
      });
    }
  }

  useEffect(() => {
    (async () => {
      await loadModel();
    })();
  }, []);

  if (isModelLoading) {
    return <LoadingBackdrop />;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <Box className="post-preview image-holder">
            {(webWorkerData.progress > 0) && <span> Compressing {webWorkerData.progress} %</span>}
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="Image Preview"
                  width="100%"
                  ref={imageRef}
                />
              </>
            ) : (
              <>
                <Typography variant="h6" align="center">
                  Upload an Image to Start
                </Typography>
              </>
            )}
          </Box>
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{
              marginBottom: 2,
            }}
          >
            <ImageIcon />
            <input
              id="add-image-for-upload"
              type="file"
              accept="image/*"
              hidden={true}
              onChange={uploadImage}
            />
          </Button>
          <TextField
            multiline
            minRows={1}
            maxRows={4}
            fullWidth
            inputProps={{
              maxLength: 140,
              minLength: 10,
            }}
            name="post-description"
            placeholder="Enter the description about your photo for others to see. No more than 140 characters, no less than 10."
            onChange={handleDescription}
            value={description}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  value={isPrivate}
                  onChange={handleIsPrivate}
                  color="secondary"
                />
              }
              label="Private Post?"
              labelPlacement="end"
            />
          </FormGroup>
          <Box>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Create Post
            </Button>
          </Box>
          <Box>
            <ErrorsDisplay errors={errors} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { CreatePost };
