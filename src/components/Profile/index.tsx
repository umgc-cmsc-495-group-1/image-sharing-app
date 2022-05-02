import React, {useContext, useEffect, useState} from "react";
import { UploadFab } from "../UploadFab";
import {emailInDb, getUserByUserId} from "../../data/userData";
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
import {AuthContext} from "../../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      if (user) {
        const userData = await getUserByUserId(user.uid);
        setEmail(userData.email);
      }
    })();
  }, [user]);
  const [profile, setProfile] = useState<ProfileInterface>({
    uid: "",
    username: "",
    imageUrl: "",
    displayName: "",
    avatarImage: "",
    email: email || "",
    friends: [],
    likes: [],
    posts: 0,
    bio: "",
  });

  const [posts, setPosts] = useState<Array<FeedPostInterface>>([]);

  useEffect(() => {
    // async function fetchProfile() {
    //   const inProfile = await emailInDb(email ? email : "");
    //   inProfile && setProfile(inProfile);
    // }
    //
    // fetchProfile();
    const fetchProfile = async () => await emailInDb(email ? email : "")



    fetchProfile().then((inProfile) => {
      if (inProfile !== undefined) {
        setProfile(inProfile);
      }
    });
  }, [email]);

  // useEffect(() => {
  //   async function fetchProfile() {
  //     const userPosts = await getByUsername(currentUsername ? currentUsername : "");
  //     return userPosts;
  //   }
  //   fetchProfile().then(res => {
  //     console.log(res)
  //     if (res) {
  //       setProfile(res);
  //     }
  //   })
  // }, [currentUsername]);
  //
  // useCallback(async () => {
  //   const livePosts = await getLiveUserPostData(profile.uid, setPosts);
  //   return livePosts;
  // }, [profile.uid]);

  useEffect(() => {
    getLiveUserPostData(profile.uid, setPosts);
  }, [profile.uid]);
  console.log(profile)
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
          <Card
            raised
            sx={{
              width: "100%", aspectRatio: "1",
            }}
          >
            <Box
              sx={{
                width: 1.0,
                height: 0,
                paddingBottom: "100%",
                backgroundImage: `url(${profile.avatarImage})`,
                backgroundSize: "cover",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex">
            <Typography variant="h4">{profile.email}</Typography>
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
