import { IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  addPostLikes,
  addUserLikes,
  removePostLikes,
  removeUserLikes,
} from "../../data/photoData";
import { FeedPostType } from "../../types/appTypes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  post: FeedPostType;
};

export default function LikeButton(props: Props) {
  const { post } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (post?.pid) {
      setIsLiked(post.likes.includes(user?.uid || ""));
      setNumLikes(post.likes.length);
    }
  }, [post, user]);

  const handleUnlike = async () => {
    await removeUserLikes(user?.uid || "", post.pid);
    await removePostLikes(post.pid, user?.uid || "");
  };

  const handleLike = async () => {
    await addUserLikes(user?.uid || "", post.pid);
    await addPostLikes(post.pid, user?.uid || "");
  };

  return (
    <>
      {isLiked ? (
        <IconButton onClick={handleUnlike} role="like-button">
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
      ) : (
        <IconButton onClick={handleLike} role="like-button">
          <FavoriteIcon />
        </IconButton>
      )}
      <Typography>{numLikes}</Typography>
    </>
  );
}
