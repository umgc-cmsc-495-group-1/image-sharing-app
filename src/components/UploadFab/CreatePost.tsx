import React, { useEffect, useState, useRef } from 'react';
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-converter"
import "@tensorflow/tfjs-backend-webgl"
import * as mobilenet from '@tensorflow-models/mobilenet'
import {
  Modal, Box, Typography, TextareaAutosize,
  FormGroup, FormControlLabel, Switch, styled, alpha, Button
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { LoadingBackdrop } from './LoadingBackdrop'

interface CreatePostInterface {
  open: boolean;
  handleClose: () => void
}

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'rgb(255, 255, 255)',
  border: '2px solid #000',
  paddingTop: 3,
  paddingBottom: 10
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
    if (model !== null) {
      const results = await model.classify(imageRef.current)
      console.log(results)
    }
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    identify() // identify the image
    // log out all the values
    console.log("DESCRIPTION \n", description)
    console.log("ISPRIVATE \n", isPrivate);

  }

  useEffect(() => {
    loadModel()
  }, [])

  const imageContainerCss: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
  }
  const imageCss: React.CSSProperties = {
    width: '25%',
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
          <input id='add-image-for-upload' type="file" accept='image/*'
            capture='environment' onChange={uploadImage}
          />
        </Box>
        <Box className='post-preview' sx={positionRelativeCenter}>
          <Typography variant='h4' component='h2' className='post-preview'>
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
          <Box className='post-preview post-description'>
            <TextareaAutosize
              maxLength={140}
              minLength={10}
              minRows={3}
              maxRows={8}
              name='post-description'
              placeholder='Enter the description about your photo for others to see. No more than 140 characters, no less than 10.'
              onChange={handleDescription}
              value={description}
            />
          </Box>
          <FormGroup>
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
              variant="contained"
              onClick={handleSubmit}
              sx={{

              }}
            >Create Post</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export {
  CreatePost
}