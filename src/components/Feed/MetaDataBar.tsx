import React, { useState } from 'react';
import { IconButton, Box, SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import {
  MetaDataBarInterface,
  PostDetailProps,
  LikeIconProps,
  CommentIconProps
} from '../../types/appTypes';
import { determinBarHeight, determineIconSize } from '../../utils/marginPadding';
type IconType = typeof FavoriteIcon | typeof FavoriteBorderIcon | typeof CommentIcon;

const LikeIcon: React.FC<LikeIconProps> = ({
  isLiked, numberOfLikes
}): JSX.Element => {
  let Icon: JSX.Element = <SvgIcon component={FavoriteBorderIcon} color='info' sx={{ fontSize: 16 }} />;
  if (isLiked) {
    Icon = <SvgIcon component={FavoriteIcon} color='warning' sx={{ fontSize: 16 }} />;
  }
  return (
    <Box
      sx={{}}
    >
      <span>{Icon}</span>
      <span>{numberOfLikes}</span>
    </Box>
  );
};

const CommentIconCustom: React.FC<CommentIconProps> = ({
  numberOfComments, margin
}): JSX.Element => {
  const fontSize = determineIconSize(margin);
  const Icon: IconType = CommentIcon;
  return (
    <Box
      sx={{}}
    >
      <span>{numberOfComments}</span>
      <span >{<SvgIcon component={Icon} sx={{ fontSize: fontSize }} />}</span>
    </Box>
  );
};

const PostDetails: React.FC<PostDetailProps> = ({
  username, postText, metaDataProps
}): JSX.Element => {
  const metaDataStyles = {
    userStyle: {
      justifyContent: 'flex-start',
    },
    postStyle: {
      justifyContent: 'flex-end',
    }
  }

  const userStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.35rem',
    color: '#bfa760',
    marginLeft: '1.25rem',
  }
  const postStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#000',
    marginLeft: '1.25rem',
  }

  if (metaDataProps) {
    userStyle.justifyContent = metaDataStyles.userStyle.justifyContent;
    postStyle.justifyContent = metaDataStyles.postStyle.justifyContent;
  }
  return (
    <Box
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <p role='username' style={userStyle}>{username}</p>
      <p role='description' style={postStyle}>{postText}</p>
    </Box>
  );
};


const MetaDataBar: React.FC<MetaDataBarInterface> = ({
  uid, pid, numberLikes, username, postText,
  numberComments, margin, padding, screenWidth
}): JSX.Element => {
  const [isLiked, setIsLiked] = useState(numberLikes > 0);
  const [numberOfLikes, setNumberOfLikes] = useState(numberLikes);
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/user/${uid}/profile/${pid}`)
  }
  return (
    <Box
      className='MetaDataBar'
      sx={{
        mx: margin,
        px: padding,
        height: determinBarHeight(screenWidth),
      }}
    >
      <Box
        className='MetaDataBar.Icons'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          outline: 'solid 3px #000',
        }}
      >
        <IconButton
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: '1.25rem',
          }}
          color="inherit"
          edge="start"
          size="large"
          aria-label="like"
          onClick={() => {
            setIsLiked(true)
            setNumberOfLikes(numberOfLikes + 1)
          }}
        >
          <LikeIcon
            isLiked={isLiked}
            numberOfLikes={numberOfLikes}
          />
        </IconButton>
        <IconButton
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: '1.25rem',
          }}
          color="inherit"
          edge="end"
          size="large"
          aria-label="comment"
          onClick={handleNavigate}
        >
          <CommentIconCustom
            numberOfComments={numberComments}
            commentIcon={CommentIcon}
            margin={margin}
            padding={padding}
          />
        </IconButton>
      </Box>
      <Box
        className='MetaDataBar.Details'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          outline: 'solid 3px #000',
        }}
      >
        <PostDetails
          username={username}
          postText={postText}
          margin={margin}
          padding={padding}
          metaDataProps={true}
        />
      </Box>
    </Box>
  );
}

export {
  MetaDataBar,
  PostDetails
}
