import React from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import Post from "./Post";

export default function PostPage() {
  const { pid } = useParams<string>();
  return (
    <Container maxWidth="md">
      <Post pid={pid ? pid : ""} />
    </Container>
  );
}
