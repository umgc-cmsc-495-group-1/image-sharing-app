import React, { useCallback, useEffect, useState } from "react";
import { UploadFab } from "../UploadFab";
import { getUserByEmail } from "../../data/userData";
import { FeedPostInterface, ProfileInterface } from "../../types/appTypes";
import {
  Box,
  Card,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import HootDefaultImage from "../../assets/logo/png/simple-192x192.png"
import { getLiveUserPostData } from "../../data/photoData";
import FriendButton from "../FriendButton";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { email } = useParams<string>();
  const [currentEmail, setCurrentEmail] = useState("");
  const decodeEmail = useCallback(() => {
    if (!email) {
      return;
    }
    let temp = email;
    temp = decodeURIComponent(temp);
    temp = temp.replace("-", ".");
    setCurrentEmail(temp);
  }, [email]);
  const [profile, setProfile] = useState<ProfileInterface>({
    uid: "",
    username: "",
    imageUrl: "",
    displayName: "",
    avatarImage: "",
    email: "",
    friends: [],
    likes: [],
    posts: 0,
    bio: "",
  });

  const [posts, setPosts] = useState<Array<FeedPostInterface>>([]);
  // const [profileImage, setProfileImage] = useState<string>("");
  useEffect(() => {
    decodeEmail();
    const fetchProfile = async () => await getUserByEmail(currentEmail);
    fetchProfile().then((inProfile) => {
      if (inProfile) {
        // setProfileImage(inProfile.avatarImage);
        setProfile(inProfile);
      }
    });
  }, [currentEmail, decodeEmail]);

  useEffect(() => {
    profile && getLiveUserPostData(profile.uid, setPosts);
  }, [profile]);

  function handleClick(pid: string) {
    navigate("/post/" + pid);
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            raised
            sx={{
              width: "100%",
              aspectRatio: "1",
            }}
          >
            <Box
              sx={{
                width: 1,
                height: 0,
                paddingBottom: "100%",
                backgroundImage: `url(${profile.avatarImage ? profile.avatarImage : HootDefaultImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex">
            <Typography variant="h4">{profile.displayName}</Typography>
            <FriendButton uid={profile.uid} />
          </Box>
          <Typography variant="h6">
            {posts.length} Posts | {profile.friends.length} Friends{" "}
          </Typography>
          <Typography>{profile.bio}</Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageList
            sx={{ width: "100%" }}
            variant="masonry"
            cols={posts.length < 3 ? 1 : posts.length < 5 ? 2 : 3}
            gap={4}
          >
            {posts.map((item: FeedPostInterface) => (
              <ImageListItem key={item.pid}>
                <a
                  id={item.pid}
                  onClick={() => handleClick(item.pid)}
                  style={{ display: "block", height: "100%" }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.postText}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </a>
                <ImageListItemBar title={item.postText} />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
      <UploadFab />
    </Container>
  );
}

/*
const OldProfile: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const { email } = useParams<string>();
  const decodeEmail = useCallback(() => {
    if (!email) {
      return;
    }
    let temp = email;
    temp = decodeURIComponent(temp);
    temp = temp.replace("-", ".");
    setCurrentEmail(temp);
  }, [email]);

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
    decodeEmail();
    const fetchProfile = async () => await getUserByEmail(currentEmail);

    fetchProfile().then((inProfile) => {
      if (inProfile !== undefined) {
        setProfile(inProfile);
      }
    });
  }, [currentEmail, decodeEmail]);

  useEffect(() => {
    getLiveUserPostData(profile.uid, setPosts);
  }, [profile.uid]);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            raised
            sx={{
              width: "100%",
              aspectRatio: "1",
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
            <Typography variant="h4">{profile.displayName}</Typography>
            <FriendButton uid={profile.uid} />
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
*/
export { Profile };
