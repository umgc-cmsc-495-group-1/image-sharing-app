import React, { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import CommentIconOutlined from '@mui/icons-material/CommentOutlined';
// /user/:userId/profile/:postId
type LikeIconProps = {
  isLiked: boolean;
  numberOfLikes: number;
  favoriteIcon?: typeof FavoriteIcon | null;
  favoriteBorderIcon?: typeof FavoriteBorderIcon | null;
}

const LikeIcon: React.FC<LikeIconProps> = ({
  isLiked, numberOfLikes, favoriteIcon, favoriteBorderIcon
}): JSX.Element => {
  const Icon = isLiked ? favoriteIcon : favoriteBorderIcon;
  return (
    <div>
      {Icon}
      {numberOfLikes}
    </div>
  );
};


const MetaDataBar: React.FC = ({ }): JSX.Element => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton
        sx={{}}
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
        sx={{}}
        color="inherit"
        edge="end"
        size="large"
        aria-label="comment"
      // onClick={() => navigate(`/user/${userId}/profile/${postID}`)}
      >

      </IconButton>
    </Box>
  );
}

export {
  MetaDataBar
}