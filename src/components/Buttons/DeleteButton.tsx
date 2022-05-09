import React, { useState } from "react";
import { FeedPostType } from "../../types/appTypes";
import { deletePostByPid } from "../../data/photoData";
import { useCurrentUser } from "../../hooks/useCurrentUser";
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
import { useNavigate, useLocation } from "react-router-dom";
import { encodeEmailAddress } from "../../utils/middleware";

type Props = {
  post: FeedPostType;
};

export default function DeleteButton(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = props;
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deletePostByPid(post.pid)
      .then(() => {
        handleClose();
      })
      .then(() => {
        if (location.pathname.includes("/explore")) {
          navigate("/explore");
          window.location.reload();
        } else if (location.pathname.includes("/post")) {
          const email = encodeEmailAddress(user);
          location.pathname = `/user/${email}`;
          navigate(location.pathname);
          window.location.reload();
        }
      });
  };

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
