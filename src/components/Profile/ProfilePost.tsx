import React from "react";
import { FeedPostType } from "../../types/appTypes";
import { Grid } from "@mui/material";
import Post from "./Post";
interface Props {
  item: FeedPostType;
}
export default function ProfilePost(props: Props) {
  const { item } = props;
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
      <Post key={item.pid} pid={item.pid} />
    </Grid>
  );
}
