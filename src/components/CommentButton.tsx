import {
  Box,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getLivePost, postComment } from "../data/photoData";
import { CommentType, FeedPostType } from "../types/appTypes";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { useCurrentUser } from "../hooks/useCurrentUser";

type CommentButtonProps = {
  pid: string;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

function CommentButton(props: CommentButtonProps) {
  const { pid, setExpanded } = props;
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  const [numComments, setNumComments] = useState(0);

  useEffect(() => {
    const unsubscribe = getLivePost(pid, setPost);
    return () => {
      unsubscribe;
    };
  }, [pid]);

  useEffect(() => {
    if (post?.pid) {
      setNumComments(post.comments.length);
    }
  }, [post]);

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded, setExpanded]);

  const handleExpand = async () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <IconButton onClick={handleExpand}>
        <CommentIcon />
      </IconButton>
      <Typography>{numComments}</Typography>
    </>
  );
}

type CommentSectionProps = {
  pid: string;
  expanded: boolean;
};

function CommentSection(props: CommentSectionProps) {
  const { pid, expanded } = props;
  const user = useCurrentUser();
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    const unsubscribe = getLivePost(pid, setPost);
    return () => {
      unsubscribe;
    };
  }, [pid]);

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment: CommentType = {
      uid: user.uid,
      username: user.displayName,
      comment: userComment,
    };
    await postComment(pid, comment);
    setUserComment("");
  };

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <List>
          {post?.comments?.map((item, index) => (
            <ListItem key={item.username + item.comment}>
              <ListItemText primary={item.comment} secondary={item.username} />
              {index < post.comments.length - 1 && <Divider />}
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
            flex-grow="true"
            required
            name="comment"
            label="Comment"
            id="comment"
            sx={{ width: "1" }}
          />
          <IconButton type="submit">
            <SendIcon color="secondary" />
          </IconButton>
        </Box>
      </CardContent>
    </Collapse>
  );
}

export { CommentButton, CommentSection };
