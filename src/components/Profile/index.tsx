import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadFab } from "../UploadFab";
import { getUserByEmail } from "../../data/userData";
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
      const inProfile = await getUserByEmail(email ? email : "");
      inProfile && setProfile(inProfile);
    }

    fetchProfile();
  }, [email]);

  useEffect(() => {
    getLiveUserPostData(profile.uid, setPosts);
  }, [profile.uid]);

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
            <IconButton>
              <PersonAddIcon sx={{ color: "secondary.main" }} />
            </IconButton>
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
