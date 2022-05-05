import React, { useState } from "react";
import {
  CommentType,
  FeedPostInterface,
  FeedPostWithUserInterface,
  ImageItemProps,
  LikeIconProps,
} from "../../types/appTypes";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  SvgIcon,
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import {
  getOnePost,
  postComment,
  addUserLikes,
  removeUserLikes,
  addPostLikes,
  removePostLikes,
} from "../../data/photoData";
import { getUserByUserId } from "../../data/userData";
// import { AppUserInterface } from "../../types/authentication";
import FriendButton from "../Buttons/FriendButton";
import PrivateButton from "../Buttons/PrivateButton";
import DeleteButton from "../Buttons/DeleteButton";
// todo: remove this component as it is not being used anymore
const LikeIcon: React.FC<LikeIconProps> = ({ isLiked }): JSX.Element => {
  let Icon: JSX.Element = (
    <SvgIcon component={FavoriteBorderIcon} color="info" />
  );
  if (isLiked) {
    Icon = <SvgIcon component={FavoriteIcon} color="warning" />;
  }
  return Icon;
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

const FeedTile: React.FC<FeedPostWithUserInterface> = ({
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
  const [numberOfLikes, setNumberOfLikes] = useState(
    likes.length > 0 ? likes.length : 0
  );
  const [currentLikes, setCurrentLikes] = useState<string[]>(likes);
  const [expanded, setExpanded] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [isLiked, setIsLiked] = useState<boolean>(
    currentLikes.includes(user.uid)
  );
  // const [tileUser, setTileUser] = useState<AppUserInterface | undefined>(
  //   undefined
  // );
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [encodedEmail, setEncodedEmail] = useState("");
  (async () => {
    if (post !== undefined) {
      const user = await getUserByUserId(post.uid);
      let currentEmail = user.email;
      currentEmail = encodeURIComponent(currentEmail);
      currentEmail = currentEmail.replace(".", "-");
      setCurrentAvatar(user.avatarImage)
      setEncodedEmail(currentEmail);
    }
  })()

  // useEffect(() => {
  //   async function retrieveUser() {
  //     const inUser = await getUserByUserId(uid);
  //     setTileUser(inUser);
  //   }
  //   retrieveUser();
  // }, [uid]);

  async function determineIfLiked() {
    // check if the user has liked anything
    if (user.likes.length === 0) {
      setIsLiked(false);
    }
    // check if the user has liked the post
    if (isLiked) {
      setIsLiked(false);
      setNumberOfLikes(numberOfLikes - 1);
      const result = currentLikes.filter((likePID) => likePID !== pid);
      if (currentLikes.length === 1) {
        setCurrentLikes([]);
      } else {
        setCurrentLikes([...currentLikes, ...result]);
      }
      await removeUserLikes(user.uid, pid);
      await removePostLikes(pid, user.uid);
    } else {
      setIsLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
      setCurrentLikes([...currentLikes, pid]);
      await addUserLikes(user.uid, pid);
      await addPostLikes(pid, user.uid);
    }
  }

  // todo: implement logic for adding user that liked post
  async function handleLike() {
    await determineIfLiked();
    const updatedPost = await getOnePost(post.pid);
    updatedPost ? setPost(updatedPost) : console.error("error updating post");
  }

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
    setUserComment("");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        avatar={<Avatar sx={{ bgcolor: "primary.main" }} src={currentAvatar}></Avatar>}
        title={post.username}
        component={Link}
        href={`user/${encodedEmail}`}
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
        <IconButton role="like-button" aria-label="like" onClick={handleLike}>
          <LikeIcon isLiked={isLiked} />
        </IconButton>
        <Typography>{numberOfLikes}</Typography>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
          role="comment-button"
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

export { FeedTile, ImageItem };
