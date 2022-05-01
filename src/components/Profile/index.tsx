import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadFab } from "../UploadFab";
import { addFriend, getUserByEmail, removeFriend } from "../../data/userData";
import {
  FeedPostInterface,
  FeedPostType,
  ProfileInterface,
} from "../../types/appTypes";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getLiveUserPostData } from "../../data/photoData";
import ProfilePost from "./ProfilePost";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const Profile: React.FC = () => {
  type Params = {
    email: string;
  };
  const { email } = useParams<Params>();
  const [profile, setProfile] = useState<ProfileInterface>({
    uid: "",
    username: "",
    imageUrl: "",
    displayName: "",
    email: email || "",
    friends: [],
    likes: [],
    posts: 0,
    bio: "",
  });

  const [posts, setPosts] = useState<Array<FeedPostInterface>>([]);
  const currentUser = useCurrentUser();
  const [isFriends, setIsFriends] = useState(
    currentUser.friends.indexOf(profile.uid) >= 0
  );

  useEffect(() => {
    async function fetchProfile() {
      const inProfile = await getUserByEmail(email ? email : "");
      inProfile && setProfile(inProfile);
    }

    fetchProfile();
  }, [email]);

  useEffect(() => {
    getLiveUserPostData(profile.uid, setPosts);
  }, [profile.uid]);

  console.log(currentUser.friends);
  console.log(profile.uid);
  console.log(currentUser.friends.indexOf(profile.uid));

  const handleAddFriend = () => {
    addFriend(profile.uid, currentUser.uid);
    setIsFriends(true);
  };

  const handleRemoveFriend = () => {
    removeFriend(profile.uid, currentUser.uid);
    setIsFriends(false);
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingBottom: 10,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card raised={true} sx={{ width: "100%", aspectRatio: "1" }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex">
            <Typography variant="h4">{profile.displayName}</Typography>
            {profile.uid != currentUser.uid &&
              (isFriends ? (
                <IconButton onClick={handleRemoveFriend}>
                  <PersonRemoveIcon sx={{ color: "secondary.main" }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleAddFriend}>
                  <PersonAddIcon sx={{ color: "secondary.main" }} />
                </IconButton>
              ))}
          </Box>
          <Typography variant="h6">
            {posts.length} Posts | {profile.friends.length} Friends{" "}
          </Typography>
          <Typography>{profile.bio}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {posts.map((item: FeedPostType) => (
              <ProfilePost key={item.pid} item={item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <UploadFab />
      </Box>
    </Container>
  );
};

export { Profile };
