import React, { useEffect, useState } from "react";
import { FeedPostType } from "../../types/appTypes";
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
import { encodeEmailAddress } from "../../utils/middleware";
// import {Navigate} from "react-router-dom";
import { getUserByUserId } from "../../data/userData";
import { AppUserInterface } from "../../types/authentication";
import FriendButton from "../Buttons/FriendButton";
import PrivateButton from "../Buttons/PrivateButton";
import DeleteButton from "../Buttons/DeleteButton";
import LikeButton from "../Buttons/LikeButton";
import { CommentButton, CommentSection } from "../Buttons/CommentButton";
import { getLivePost } from "../../data/photoData";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type Props = {
  pid: string;
};

export default function Post(props: Props) {
  const { pid } = props;
  // const navigate = useNavigate();
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);
  const [postUser, setPostUser] = useState<AppUserInterface | undefined>(
    undefined
  );
  const [expanded, setExpanded] = useState(false);
  const user = useCurrentUser();
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [encodedEmail, setEncodedEmail] = useState("");
  (async () => {
    if (post?.pid !== undefined) {
      const user = await getUserByUserId(post.uid);
      const currentEmail = encodeEmailAddress(user);
      // let currentEmail = user.email;
      // currentEmail = encodeURIComponent(currentEmail);
      // currentEmail = currentEmail.replace(".", "-");
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
      if (post) inUser = await getUserByUserId(post.uid);
      if (inUser) setPostUser(inUser);
    };
    if (post?.pid) {
      (async () => {
        await getPostUser();
      })();
    }
  }, [post]);

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
        subheader={postUser?.displayName}
        role="post-header"
        sx={{
          textDecoration: "none",
        }}
      />
      <CardMedia
        component="img"
        image={post?.imageUrl}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {post?.classification?.classifications.map((item) => (
            <div key={item.className}>
              <Chip
                size="small"
                label={item.className}
                color="secondary"
                sx={{ margin: 0.125 }}
              />
            </div>
          ))}
        </Box>
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
