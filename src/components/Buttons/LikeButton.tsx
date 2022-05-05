import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addPostLikes,
  addUserLikes,
  getLivePost,
  removePostLikes,
  removeUserLikes,
} from "../../data/photoData";
import { FeedPostType } from "../../types/appTypes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type Props = {
  pid: string;
};

export default function LikeButton(props: Props) {
  const { pid } = props;
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const user = useCurrentUser();

  useEffect(() => {
    const unsubscribe = getLivePost(pid, setPost);
    return () => {
      unsubscribe;
    };
  }, [pid]);

  useEffect(() => {
    if (post?.pid) {
      setIsLiked(post.likes.includes(user.uid));
      setNumLikes(post.likes.length);
    }
  }, [post, user]);

  const handleUnlike = async () => {
    await removeUserLikes(user.uid, pid);
    await removePostLikes(pid, user.uid);
  };

  const handleLike = async () => {
    await addUserLikes(user.uid, pid);
    await addPostLikes(pid, user.uid);
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
