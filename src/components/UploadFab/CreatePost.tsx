import React, {useEffect, useState, useRef, useContext} from 'react';
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-converter"
import "@tensorflow/tfjs-backend-webgl"
import * as mobilenet from '@tensorflow-models/mobilenet'
import {
  Modal, Box, Typography, TextareaAutosize,
  FormGroup, FormControlLabel, Switch, styled, alpha, Button
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { pink } from '@mui/material/colors';
import { LoadingBackdrop } from './LoadingBackdrop'
import ErrorsDisplay from "../ErrorsDisplay";
import {CreatePostInterface, ImageClassificationType, UserInterestsType} from "../../types/interests";
import {User} from "firebase/auth";
import {AuthContext} from "../../context/AuthContext";
import {fabPostCallback} from "../../data/photoData";

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'rgb(255, 255, 255)',
  border: '2px solid #000',
  paddingTop: 3,
  paddingBottom: 10,
  borderRadius: 3
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const CreatePost: React.FC<CreatePostInterface> = ({
  open, handleClose
}) => {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("")
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  const user: User | null = useContext(AuthContext);
  const imageRef = useRef<any>()
  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)
  const handleIsPrivate = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target.checked) {
      setIsPrivate(checked);
    } else {
      setIsPrivate(false);
    }
  }

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load()
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
      setFileToUpload(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(undefined);
      setFileToUpload(undefined);
    }
  }

  const identify = async () => new Promise<ImageClassificationType>((resolve) => {
    if (model !== null) {
      const results = model.classify(imageRef.current);
      return resolve(results);
    }
  })

  const validateData = () => {
    if (imageUrl === undefined && description.length < 10 || description.length > 140) {
      setErrors( ["Please upload an image", "Description must be between 10 and 140 characters"])
      return false;
    } else if (imageUrl === undefined) {
      setErrors(["Please upload an image"])
      return false;
    } else if (description.length < 10) {
      setErrors(["Description must be between 10 and 140 characters"])
      return false;
    } else {
      errors.pop()
      setErrors([])
      const errorNode = document.querySelector('.error--list');
      if (errorNode !== null) {
        errorNode.remove();
      }
      return true;
    }
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (validateData()) {
      const results = await identify() // identify the image
      const classification: UserInterestsType = {
        classifications: results,
        viewCount: 0,
        isLiked: false,
        isCommentedOn: false
      }
      // upload the data to the database
      await fabPostCallback(classification, description,
          isPrivate, user, fileToUpload)
    } else {
      setErrors(["Error uploading image"])
    }

  }

  useEffect( () => {
    loadModel()
  }, [])

  const imageContainerCss: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10,
  }
  const imageCss: React.CSSProperties = {
    width: '50%',
    height: '25%',
  }
  const positionRelativeCenter: React.CSSProperties = {
    position: 'relative',
    left: '25%',
    right: '25%'
  }

  if (isModelLoading) {
    return <LoadingBackdrop />
  }

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={modalStyle}
      >
        <Box
          sx={positionRelativeCenter}
        >
          <Button
              variant="contained"
              component="label"
              color="primary"
              sx={{
                width: '50%',
                marginBottom: 2
              }}
          >
            <ImageIcon />
            <input id='add-image-for-upload' type="file" accept='image/*'
                   capture='environment' hidden={true} onChange={uploadImage} />
          </Button>
        </Box>
        <Box className='post-preview' sx={positionRelativeCenter}>
          <Typography variant='h4' component='h3' className='post-preview'>
            Post Preview
          </Typography>
          <Box className='post-preview image-holder' style={imageContainerCss}>
            {
              (imageUrl !== undefined) ?
                <>
                  <img src={imageUrl} alt="Image Preview" style={imageCss} ref={imageRef} />
                </>
                :
                <>
                  <h3>Upload an Image to Start</h3>
                </>
            }
          </Box>
          <Box
            className='post-preview post-description'
            sx={{
              width: '50%',
            }}
          >
            <TextareaAutosize
              maxLength={140}
              minLength={10}
              minRows={3}
              maxRows={8}
              style={{
                width: '100%',
              }}
              name='post-description'
              placeholder='Enter the description about your photo for others to see. No more than 140 characters, no less than 10.'
              onChange={handleDescription}
              value={description}
            />
          </Box>
          <FormGroup
            sx={{
              my: 2
            }}
          >
            <FormControlLabel
              control={<StyledSwitch
                value={isPrivate}
                onChange={handleIsPrivate}
              />}
              label="Private Post?"
              labelPlacement='end'
            />
          </FormGroup>
          <Box>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                width: '50%',
                marginBottom: 2
              }}
            >Create Post</Button>
          </Box>
        </Box>
        <Box>
          <ErrorsDisplay errors={errors} />
        </Box>
      </Box>
    </Modal>
  )
}

export {
  CreatePost
}
