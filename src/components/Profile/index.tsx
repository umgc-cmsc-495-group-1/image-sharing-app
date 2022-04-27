import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadFab } from "../UploadFab";
import { emailInDb } from "../../data/userData";
import { ProfileInterface } from "../../types/appTypes";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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

  useEffect(() => {
    async function fetchProfile() {
      console.log(email);
      const inProfile = await emailInDb(email ? email : "");
      inProfile && setProfile(inProfile);
    }

    fetchProfile();
  }, [email]);

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card raised={true} sx={{ width: "100%", aspectRatio: "1" }} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Box display="flex">
            <Typography variant="h4">{profile.email}</Typography>
            <IconButton>
              <PersonAddIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
          <Typography variant="h6">
            {profile.posts || 0} Posts | {profile.friends.length} Friends{" "}
          </Typography>
          <Typography>{profile.bio}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}></Grid>
        </Grid>
      </Grid>
      <Box>
        <UploadFab />
      </Box>
    </Container>
  );
};

export { Profile };

/*
const Profile: React.FC = () => {
  const { uid } = useParams();
  const profileData = getProfileData(uid);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 10
        }}
      >
        <UserMetaData
          uid={profileData.uid}
          username={profileData.username}
          posts={profileData.posts}
          displayName={profileData.displayName}
          friends={profileData.friends}
          likes={profileData.likes}
          email={profileData.email}
          bio={profileData.bio}
          imageUrl={profileData.imageUrl}
          testImages={demoFeedImages}
        />
      </Box>
      <Box>
        <UploadFab />
      </Box>
      <Outlet />
    </Container>
  )
}

export {
  Profile
}
*/
