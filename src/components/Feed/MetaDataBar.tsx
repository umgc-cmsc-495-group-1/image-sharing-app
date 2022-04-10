import React, { useState } from 'react';
import { IconButton, Box, SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { FeedPostInterface } from '../../tests/test_data';
type IconType = typeof FavoriteIcon | typeof FavoriteBorderIcon | typeof CommentIcon;

export interface MetaDataBarInterface extends FeedPostInterface {
  margin: number;
  padding: number;
  screenWidth: number;
  screenHeight: number;
}

interface MarginPadding {
  margin: number;
  padding: number;
}

interface LikeIconProps extends MarginPadding {
  isLiked: boolean;
  numberOfLikes: number;
  favoriteIcon?: IconType | null;
  favoriteBorderIcon?: IconType | null;
}

interface CommentIconProps extends MarginPadding {
  numberOfComments: number;
  commentIcon?: IconType | null;
}

interface PostDetailProps extends MarginPadding {
  username: string;
  postText: string;
  metaDataProps?: boolean | false;
}

function determinBarHeight(width: number): number {
  let barHeight = 0;

  if (width >= 1536) {
    barHeight = 222.086;
  } else if (width >= 1200 && width < 1536) {
    barHeight = 240.086;
  } else if (width >= 900 && width < 1200) {
    barHeight = 220.086;
  } else if (width >= 600 && width < 900) {
    barHeight = 234.086;
  } else if (width >= 400 && width < 600) {
    barHeight = 248.086;
  } else if (width >= 300 && width < 400) {
    barHeight = 268.086;
  } else if (width >= 250 && width < 300) {
    barHeight = 386.086;
  } else {
    barHeight = 400;
  }

  return barHeight;
}

function determineIconSize(margin: number): number {
  let fontSize = 0;

  switch (margin) {
    case 20:
      fontSize = 70;
      break;
    case 15:
      fontSize = 50;
      break;
    case 10:
      fontSize = 40;
      break;
    case 5:
      fontSize = 30;
      break;
    case 3:
      fontSize = 25;
      break;
    default:
      fontSize = 20;
      break;
  }

  return fontSize;
}


const LikeIcon: React.FC<LikeIconProps> = ({
  isLiked, numberOfLikes, margin
}): JSX.Element => {
  const fontSize = determineIconSize(margin);
  let Icon: JSX.Element = <SvgIcon component={FavoriteBorderIcon} color='info' sx={{ fontSize: fontSize }} />;
  if (isLiked) {
    Icon = <SvgIcon component={FavoriteIcon} color='warning' sx={{ fontSize: fontSize }} />;
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
      <p style={userStyle}>{username}</p>
      <p style={postStyle}>{postText}</p>
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
            margin={margin}
            padding={padding}
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
          onClick={() => navigate(`/user/${uid}/profile/${pid}`)}
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
  determinBarHeight,
  determineIconSize,
  PostDetails
}
