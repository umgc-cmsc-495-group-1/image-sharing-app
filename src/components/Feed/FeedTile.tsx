import React, { useState } from "react";
import {
  CommentType,
  FeedPostInterface,
  ImageItemProps,
  LikeIconProps
} from "../../types/appTypes";
import {
  Avatar, Box, Card, CardActions,
  CardContent, CardHeader, CardMedia,
  IconButton, SvgIcon, Collapse,
  List, ListItem, ListItemText,
  TextField, Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import {useNavigate} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import { getOnePost, postComment } from "../../data/photoData";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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
  numberComments,
  comments,
  classification,
  timestamp
}): JSX.Element => {
  const user = useCurrentUser();
  const [post, setPost] = useState<FeedPostInterface>({
    imageUrl: imageUrl,
    uid: uid,
    username: username,
    pid: pid,
    postText: postText,
    numberLikes: numberLikes,
    numberComments: numberComments,
    comments: comments,
    classification: classification,
    timestamp: timestamp,
  });
  const [isLiked, setIsLiked] = useState(false);
  // const [numberOfLikes, setNumberOfLikes] = useState(numberLikes);
  const [expanded, setExpanded] = useState(false);
  const [userComment, setUserComment] = useState("");
  // const navigate = useNavigate();
  // function handleNavigate() {
  //   navigate(`/user/${uid}/profile/${pid}`)
  // }
  function handleLike() {
    setIsLiked(!isLiked);
    setPost({
      ...post,
      numberLikes: numberLikes + (isLiked ? 0 : 1),
    });
    // setNumberOfLikes(numberOfLikes + (isLiked ? -1 : 1));
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
    updatedPost
      ? setPost(updatedPost)
      : console.log(JSON.stringify(updatedPost));
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
        avatar={<Avatar sx={{ bgcolor: "primary.main" }}>?</Avatar>}
        title={post.username}
      />
      <CardMedia component="img" image={post.imageUrl} />
      <CardContent>
        <Typography>{post.postText}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" onClick={handleLike}>
          <LikeIcon isLiked={isLiked} />
        </IconButton>
        <Typography>{post.numberLikes}</Typography>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <CommentIcon />
        </IconButton>
        <Typography>{post.comments.length}</Typography>
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
