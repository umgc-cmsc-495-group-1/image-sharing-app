import React, { useEffect, useState } from "react";
import { FeedPostType } from "../types/appTypes";
import { deletePostByPid, getLivePost } from "../data/photoData";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";

type Props = {
  pid: string;
};

export default function DeleteButton(props: Props) {
  const { pid } = props;
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();
  const [post, setPost] = useState<FeedPostType | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("I'm here");
    deletePostByPid(pid);
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
      {user.uid == post?.uid && (
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <DeleteForeverIcon sx={{ color: red[900] }} />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
