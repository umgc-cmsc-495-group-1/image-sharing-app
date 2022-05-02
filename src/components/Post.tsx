import React, { useEffect, useState } from "react";
import {
  CommentType,
  FeedPostInterface,
  FeedPostWithUserInterface,
  ImageItemProps,
} from "../types/appTypes";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
// import {useNavigate} from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { getOnePost, postComment } from "../data/photoData";
import { getUserByUserId } from "../data/userData";
import { AppUserInterface } from "../types/authentication";
import FriendButton from "./FriendButton";
import PrivateButton from "./PrivateButton";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

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

const Post: React.FC<FeedPostWithUserInterface> = ({
  imageUrl,
  uid,
  username,
  pid,
  postText,
  comments,
  likes,
  classification,
  timestamp,
  user,
  isPrivate,
}): JSX.Element => {
  // todo: issue with user being empty strings upon loading, need to fix this for comparison with
  //  with the likes for the post in order to determine if the user has liked the post
  const [post, setPost] = useState<FeedPostInterface>({
    imageUrl: imageUrl,
    uid: uid,
    username: username,
    pid: pid,
    postText: postText,
    comments: comments,
    isPrivate: isPrivate,
    likes: likes,
    classification: classification,
    timestamp: timestamp,
  });
  const [expanded, setExpanded] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [tileUser, setTileUser] = useState<AppUserInterface | undefined>(
    undefined
  );

  useEffect(() => {
    async function retrieveUser() {
      const inUser = await getUserByUserId(uid);
      setTileUser(inUser);
    }
    retrieveUser();
  }, [uid]);

  // todo: implement logic for adding user that liked post
  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment: CommentType = {
      uid: user.uid,
      username: user.email,
      comment: userComment,
    };
    await postComment(pid, comment);
    const updatedPost = await getOnePost(post.pid);
    if (updatedPost) {
      setPost(updatedPost);
      setUserComment("");
    } else {
      console.error("error updating post");
    }
    // updatedPost
    //   ? setPost(updatedPost)
    //   : console.log(JSON.stringify(updatedPost));
    setUserComment("");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(post.classification);

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
        href={`user/${tileUser?.email}`}
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {tileUser?.displayName.charAt(0)}
          </Avatar>
        }
        title={tileUser?.displayName}
      />
      <CardMedia component="img" image={post.imageUrl} />
      <CardContent>
        <div style={{ display: "flex", marginBottom: 20 }}>
          {post.classification.classifications.map((item) => (
            <div key={item.className}>
              <Chip
                label={item.className}
                color="secondary"
                sx={{ marginRight: 1 }}
              />
            </div>
          ))}
        </div>
        <Typography>{post.postText}</Typography>
      </CardContent>
      <CardActions>
        <LikeButton pid={pid} />
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <CommentIcon />
        </IconButton>
        <Typography>{post.comments.length}</Typography>
        <FriendButton uid={uid} />
        <PrivateButton pid={pid} />
        <DeleteButton pid={pid} />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          <List>
            {post.comments.map((item) => (
              <ListItem key={item.comment + item.username}>
                <ListItemText
                  primary={item.comment}
                  secondary={item.username}
                />
              </ListItem>
            ))}
          </List>
          <Box
            component="form"
            display="flex"
            noValidate
            onSubmit={handleComment}
            role="comment-form"
          >
            <TextField
              onChange={(event) => {
                setUserComment(event.target.value);
              }}
              value={userComment}
              variant="standard"
              multiline
              flex-grow="true"
              required
              name="comment"
              label="Comment"
              id="comment"
              sx={{ width: "1" }}
            />
            <IconButton type="submit">
              <SendIcon color="primary" />
            </IconButton>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { Post, ImageItem };
