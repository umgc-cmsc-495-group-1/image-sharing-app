import React from "react";
import { FeedPostType } from "../../types/appTypes";
import { Box, Card, Grid } from "@mui/material";
import { Link } from "@mui/icons-material";
interface Props {
  item: FeedPostType;
}
export default function ProfilePost(props: Props) {
  const { item } = props;
  console.log(item);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        raised
        sx={{
          width: 1.0,
          height: 1.0,
          aspectRatio: 1,
        }}
      >
        <Box
          component={Link}
          sx={{
            width: 1.0,
            height: 0,
            paddingBottom: "100%",
            backgroundImage: `url(${item.imageUrl})`,
            backgroundSize: "cover",
          }}
        />
      </Card>
    </Grid>
  );
}
