import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { updateIsPrivate } from "../../data/photoData";
import { FeedPostType } from "../../types/appTypes";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type Props = {
  post: FeedPostType;
};

export default function PrivateButton(props: Props) {
  const { post } = props;
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

  const handleMakePrivate = async () => {
    if (user.uid == post?.uid) {
      await updateIsPrivate(post.pid, true);
    }
  };

  const handleMakePublic = async () => {
    await updateIsPrivate(post.pid, false).then(() => {
      handleClose();
    });
  };

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
