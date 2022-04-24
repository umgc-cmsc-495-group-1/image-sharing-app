import React from "react";
import { FeedPostInterface, ImageItemProps } from "../../types/appTypes";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  numberComments,
  comments,
  classification,
  timestamp,
}): JSX.Element => {
  console.log(uid, pid, comments, classification, timestamp);
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
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Typography>{numberLikes}</Typography>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <Typography>{numberComments}</Typography>
      </CardActions>
    </Card>
  );
};

export { FeedTile, ImageItem };
