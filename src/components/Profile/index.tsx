import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadFab } from "../UploadFab";
import { emailInDb } from "../../data/userData";
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

  useEffect(() => {
    async function fetchProfile() {
      console.log(email);
      const inProfile = await emailInDb(email ? email : "");
      inProfile && setProfile(inProfile);
    }

    fetchProfile();
  }, [email]);

  useEffect(() => {
    getLiveUserPostData(profile.uid, setPosts);
  }, [profile.uid]);

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
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
