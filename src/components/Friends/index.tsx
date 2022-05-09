import React, {useState, useEffect} from "react";
import FriendsList from "./FriendsList";
import {getUserByUserId} from "../../data/userData"
import { useFriends } from "../../hooks/useFriends";
import { Card, CardHeader, Container } from "@mui/material";
import {AppUserInterface} from "../../types/authentication";

const Friends: React.FC = () => {
  const [friendsListData, setFriendsListData] = useState<Array<AppUserInterface>>([])
  const friends = useFriends();

  useEffect(() => {
    async function getFriendsData() {
      const totalUsers: AppUserInterface[] = [];
      for (const friend of friends) {
        await getUserByUserId(friend).then(user => {
          totalUsers.push(user);
        })
      }
      setFriendsListData(totalUsers);
    }
    getFriendsData();
  }, [friends]);


  return (
    <Container maxWidth="sm">
      <Card raised sx={{ width: "100%" }} role="friends">
        <CardHeader title="Friends" />
        {friendsListData.length > 0 ? (
          friendsListData.map((friend: AppUserInterface, index: number) => (
            <FriendsList
              key={`${friend.displayName}-${index}`}
              friend={friend}
              index={index}
              size={friends.length}
            />
          ))
        ) : (
          <p>You have no friends</p>
        )}
      </Card>
    </Container>
  );
};

export { Friends }
