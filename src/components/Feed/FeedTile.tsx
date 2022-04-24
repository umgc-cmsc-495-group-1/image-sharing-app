import React, {useState} from "react";
import {FeedPostInterface, ImageItemProps, LikeIconProps} from "../../types/appTypes";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton, SvgIcon,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useNavigate} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeIcon: React.FC<LikeIconProps> = ({
  isLiked
}): JSX.Element => {
  let Icon: JSX.Element = <SvgIcon component={FavoriteBorderIcon} color='info' />;
  if (isLiked) {
    Icon = <SvgIcon component={FavoriteIcon} color='warning' />;
  }
  return Icon
};

const ImageItem: React.FC<ImageItemProps> = ({
  src,
  alt,
  margin,
  padding,
}): JSX.Element => {
  const isAlt = alt !== "" ? alt : "image";
  const details: React.CSSProperties = {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  };
  return (
    <Box
      sx={{
        px: padding,
        mx: margin,
      }}
    >
      <img src={src} alt={isAlt} style={details} loading="lazy" />
    </Box>
  );
};

const FeedTile: React.FC<FeedPostInterface> = ({
  imageUrl,
  uid,
  username,
  pid,
  postText,
  numberLikes,
  numberComments
}): JSX.Element => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(numberLikes);
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/user/${uid}/profile/${pid}`)
  }
  function handleLike() {
    setIsLiked(!isLiked);
    setNumberOfLikes(numberOfLikes + (isLiked ? -1 : 1));
  }

  return (
    <Card
      raised={true}
      sx={{
        marginBottom: 5,
        maxWidth: "lg",
        width: {
          xs: 1.0,
          sm: 0.9,
        },
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "primary.main" }}>?</Avatar>}
        title={username}
      />
      <CardMedia component="img" image={imageUrl} />
      <CardContent>
        <Typography>{postText}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" onClick={handleLike}>
          <LikeIcon isLiked={isLiked} />
        </IconButton>
        <Typography>{numberOfLikes}</Typography>
        <IconButton aria-label="comment" onClick={handleNavigate}>
          <CommentIcon />
        </IconButton>
        <Typography>{numberComments}</Typography>
      </CardActions>
    </Card>
  );
};

export { FeedTile, ImageItem };
