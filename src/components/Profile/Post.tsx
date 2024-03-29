import React, { useContext, useEffect, useState } from "react";
import { FeedPostType } from "../../types/appTypes";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Link,
} from "@mui/material";
import { encodeEmailAddress } from "../../utils/middleware";
import { getUserByUserId } from "../../data/userData";
import { AppUserInterface } from "../../types/authentication";
import FriendButton from "../Buttons/FriendButton";
import PrivateButton from "../Buttons/PrivateButton";
import DeleteButton from "../Buttons/DeleteButton";
import LikeButton from "../Buttons/LikeButton";
import { CommentButton, CommentSection } from "../Buttons/CommentButton";
import { getLivePost } from "../../data/photoData";
import { AuthContext } from "../../context/AuthContext";

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
  const { user } = useContext(AuthContext);
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [encodedEmail, setEncodedEmail] = useState("");
  (async () => {
    if (post?.pid !== undefined) {
      const user = await getUserByUserId(post.uid);
      const currentEmail = encodeEmailAddress(user);
      setCurrentAvatar(user.avatarImage);
      setEncodedEmail(currentEmail);
    }
  })();

  useEffect(() => {
    const unsubscribe = getLivePost(pid, setPost);
    return () => {
      unsubscribe.then((unsub) => unsub());
    };
  }, [pid]);

  useEffect(() => {
    const getPostUser = async () => {
      let inUser;
      if (post?.uid) inUser = await getUserByUserId(post.uid);
      if (inUser) setPostUser(inUser);
    };
    if (post?.pid) {
      (async () => {
        await getPostUser();
      })();
    }
  }, [post?.uid, post?.pid]);

  if (!post || !user) return <></>;
  return (
    <Card
      raised={true}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        marginBottom: 5,
        maxWidth: "lg",
        width: "100%",
      }}
      role="post-card-container"
    >
      <CardHeader
        component={Link}
        href={`/user/${encodedEmail}`}
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} src={currentAvatar}></Avatar>
        }
        title={postUser?.displayName}
        titleTypographyProps={{ variant: "h5", color: "black" }}
        role="post-header"
        sx={{
          textDecoration: "none",
        }}
      />
      <CardMedia component="img" image={post.imageUrl} />
      <CardContent>
        <Typography>{post?.postText}</Typography>
      </CardContent>
      <CardActions>
        <LikeButton post={post} />
        <CommentButton post={post} setExpanded={setExpanded} />
        <FriendButton uid={user?.uid || ""} />
        <PrivateButton post={post} />
        <DeleteButton post={post} />
      </CardActions>
      <CommentSection post={post} expanded={expanded} />
    </Card>
  );
}
