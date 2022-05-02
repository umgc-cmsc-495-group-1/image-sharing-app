import React from "react";
import {FriendsList} from "./FriendsList";
import {useCurrentUser} from "../../hooks/useCurrentUser";

const Friends: React.FC = () => {
  const user= useCurrentUser()

  return (
    <FriendsList
      uid={user.uid}
      bio={user.bio}
      friends={user.friends}
      likes={user.likes}
      avatarImage={user.avatarImage}
      interests={user.interests}
      displayName={user.displayName}
      email={user.email}
      photoURL={user.photoURL}
      isVerified={user.isVerified}
    />
  )
}

export {
  Friends
}
