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
import React, { useContext, useEffect, useState } from "react";
import { addFriend, getLiveFriends, removeFriend } from "../../data/userData";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  uid: string;
};

export default function FriendButton(props: Props) {
  const { uid } = props;
  const { appUser } = useContext(AuthContext);
  const [friendsList, setFriendsList] = useState<Array<string>>([]);
  const [isFriends, setIsFriends] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!appUser) return;
      const unsubscribe = await getLiveFriends(appUser.uid, setFriendsList);
      return unsubscribe;
    })();
    // const unsubscribe = getLiveFriends(appUser.uid, setFriendsList);
    // return () => {
    //   unsubscribe;
    // };
  }, [appUser]);

  useEffect(() => {
    setIsFriends(friendsList.indexOf(uid) >= 0);
  }, [friendsList, uid]);

  const handleAddFriend = async () => {
    if (!appUser) return;
    await addFriend(uid, appUser.uid).then(() => {
      setIsFriends(true);
    });
  };

  const handleRemoveFriend = async () => {
    if (!appUser) return;
    await removeFriend(uid, appUser.uid).then(() => {
      setIsFriends(false);
      handleClose();
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {appUser?.uid != uid &&
        (isFriends ? (
          <IconButton onClick={() => setOpen(true)} role="add-friend">
            <PersonRemoveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleAddFriend} role="add-friend">
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
