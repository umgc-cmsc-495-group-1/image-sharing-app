import React, { useEffect, useState } from "react";
import { FeedPostType, ImageItemProps } from "../types/appTypes";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Link,
  Chip,
} from "@mui/material";
// import {useNavigate} from "react-router-dom";
import { getUserByUserId } from "../data/userData";
import { AppUserInterface } from "../types/authentication";
import FriendButton from "./FriendButton";
import PrivateButton from "./PrivateButton";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import { CommentButton, CommentSection } from "./CommentButton";
import { getLivePost } from "../data/photoData";
import { useCurrentUser } from "../hooks/useCurrentUser";

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

type Props = {
  pid: string;
};

export default function Post(props: Props) {
  const { pid } = props;
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);
  const [postUser, setPostUser] = useState<AppUserInterface | undefined>(
    undefined
  );
  const [expanded, setExpanded] = useState(false);
  const user = useCurrentUser();

  useEffect(() => {
    const unsubscribe = getLivePost(pid, setPost);
    return () => {
      unsubscribe;
    };
  }, [pid]);

  useEffect(() => {
    const getPostUser = async () => {
      let inUser;
      if (post) inUser = await getUserByUserId(post.uid);
      if (inUser) setPostUser(inUser);
    };
    if (post) getPostUser();
  }, [post]);

  console.log(post);

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
        component={Link}
        href={`user/${postUser?.email}`}
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {postUser?.displayName.charAt(0)}
          </Avatar>
        }
        title={postUser?.displayName}
      />
      <CardMedia component="img" image={post?.imageUrl} />
      <CardContent>
        <div style={{ display: "flex", marginBottom: 20 }}>
          {post?.classification.classifications.map((item) => (
            <div key={item.className}>
              <Chip
                label={item.className}
                color="secondary"
                sx={{ marginRight: 1 }}
              />
            </div>
          ))}
        </div>
        <Typography>{post?.postText}</Typography>
      </CardContent>
      <CardActions>
        <LikeButton pid={pid} />
        <CommentButton pid={pid} setExpanded={setExpanded} />
        <FriendButton uid={user.uid} />
        <PrivateButton pid={pid} />
        <DeleteButton pid={pid} />
      </CardActions>
      <CommentSection pid={pid} expanded={expanded} />
    </Card>
  );
}

export { Post, ImageItem };
