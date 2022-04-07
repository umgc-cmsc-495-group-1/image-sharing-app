import React, { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
// import CommentIconOutlined from '@mui/icons-material/CommentOutlined';
import { FeedPostTypeInterface } from '../../tests/test_data';
// /user/:userId/profile/:postId
type LikeIconProps = {
  isLiked: boolean;
  numberOfLikes: number;
  favoriteIcon?: typeof FavoriteIcon | null;
  favoriteBorderIcon?: typeof FavoriteBorderIcon | null;
}

type CommentIconProps = {
  numberOfComments: number;
  commentIcon?: typeof CommentIcon | null;
}

// type PostDetailProps = {
//   username: string;
//   postText: string;
// }

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

const CommentIconCustom: React.FC<CommentIconProps> = ({ numberOfComments, commentIcon }): JSX.Element => {
  return (
    <div>
      {numberOfComments}
      {commentIcon}
    </div>
  );
};

// const PostDetails: React.FC<PostDetailProps> = ({ username, postText }): JSX.Element => {
//   const userStyle: React.CSSProperties = {
//     fontWeight: 'bold',
//     fontSize: '1.2rem',
//     color: '#bfa760',
//     float: 'left',
//   }
//   const postStyle: React.CSSProperties = {
//     fontSize: '0.8rem',
//     color: '#000',
//     float: 'right',
//   }
//   return (
//     <div>
//       <p>
//         <span style={userStyle}>{username}</span>
//         <span style={postStyle}>{postText}</span>
//       </p>
//     </div>
//   );
// };


const MetaDataBar: React.FC<FeedPostTypeInterface> = ({
  imageUrl, uid, username, pid, postText, numberLikes, numberComments, comments
}): JSX.Element => {
  console.log(imageUrl, comments, username, postText)
  const [isLiked, setIsLiked] = useState(numberLikes > 0);
  const [numberOfLikes, setNumberOfLikes] = useState(numberLikes);
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
        onClick={() => navigate(`/user/${uid}/profile/${pid}`)}
      >
        <CommentIconCustom
          numberOfComments={numberComments}
          commentIcon={CommentIcon}
        />
      </IconButton>
    </Box>
  );
}

export {
  MetaDataBar
}

      // {/* <Box>
      //   <PostDetails
      //     username={username}
      //     postText={postText}
      //   />
      // </Box> */}