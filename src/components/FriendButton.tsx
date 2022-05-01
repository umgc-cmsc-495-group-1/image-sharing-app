import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { addFriend, getLiveFriends, removeFriend } from "../data/userData";

type Props = {
  uid: string;
};

export default function FriendButton(props: Props) {
  const { uid } = props;
  const currentUser = useCurrentUser();
  const [friendsList, setFriendsList] = useState<Array<string>>([]);
  const [isFriends, setIsFriends] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getLiveFriends(currentUser.uid, setFriendsList);
  }, [currentUser]);

  useEffect(() => {
    setIsFriends(friendsList.indexOf(uid) >= 0);
  }, [friendsList, uid]);

  const handleAddFriend = () => {
    addFriend(uid, currentUser.uid);
    setIsFriends(true);
  };

  const handleRemoveFriend = () => {
    removeFriend(uid, currentUser.uid);
    setIsFriends(false);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {currentUser.uid != uid &&
        (isFriends ? (
          <IconButton onClick={() => setOpen(true)}>
            <PersonRemoveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleAddFriend}>
            <PersonAddIcon />
          </IconButton>
        ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Remove Friend Confirmation"}</DialogTitle>
        <DialogContent>
          Confirm you would like to remove user from your friends list
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemoveFriend} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
