import React from "react";
import { FeedPostType } from "../../types/appTypes";
import { Typography } from "@mui/material";
interface Props {
  item: FeedPostType;
}
export default function ProfilePost(props: Props) {
  const { item } = props;
  console.log(item);
  return <Typography>{item.pid}</Typography>;
}
