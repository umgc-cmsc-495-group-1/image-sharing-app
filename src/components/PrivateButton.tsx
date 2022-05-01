import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLivePost, updateIsPrivate } from "../data/photoData";
import { FeedPostType } from "../types/appTypes";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useCurrentUser } from "../hooks/useCurrentUser";

type Props = {
  pid: string;
};

export default function PrivateButton(props: Props) {
  const { pid } = props;
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (user.uid == post?.uid) {
      setOpen(true);
    }
  };

  const handleMakePrivate = () => {
    if (user.uid == post?.uid) {
      updateIsPrivate(pid, true);
    }
  };

  const handleMakePublic = () => {
    updateIsPrivate(pid, false);
    handleClose();
  };

  useEffect(() => {
    const unsubscribe = getLivePost(pid, setPost);
    return () => {
      unsubscribe;
    };
  }, [pid]);

  return (
    <>
      {post?.isPrivate ? (
        <IconButton onClick={handleOpen}>
          <LockIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleMakePrivate}>
          <LockOpenIcon />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Make Post Public"}</DialogTitle>
        <DialogContent>
          Confirm you would like to make this post public
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleMakePublic}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
