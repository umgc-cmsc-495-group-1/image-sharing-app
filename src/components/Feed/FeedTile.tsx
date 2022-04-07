import React from 'react'
import { FeedPostTypeInterface } from '../../tests/test_data';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Box } from '@mui/material';
// import { MetaDataBar } from './MetaDataBar';

export type ImageItemProps = {
  src: string | undefined;
  alt?: string;
  loading?: "lazy" | "eager" | undefined;
  sizes?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
}

function determineMarginAndPadding(width: number) {
  let currentMargin = 0;
  let currentPadding = 0;

  if (width < 1200 && width > 800) {
    currentMargin = 15;
    currentPadding = 5;
  } else if (width < 800 && width > 600) {
    currentMargin = 10;
    currentPadding = 5;
  } else if (width < 600 && width > 400) {
    currentMargin = 5;
    currentPadding = 2;
  } else if (width < 400 && width > 275) {
    currentMargin = 3;
    currentPadding = 2;
  } else {
    currentMargin = 20;
    currentPadding = 5;
  }
  return { margin: currentMargin, padding: currentPadding };
}


const ImageItem: React.FC<ImageItemProps> = ({ src, alt }): JSX.Element => {
  const { width } = useWindowDimensions();
  const { margin, padding } = determineMarginAndPadding(width);
  const isAlt = (alt !== "") ? alt : 'image';
  const details: React.CSSProperties = {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  }
  return (
    <Box
      sx={{
        px: padding,
        mx: margin,
      }}
    >
      <img
        src={src}
        alt={isAlt}
        style={details}
        loading="lazy"
      />
    </Box>
  );
}

const FeedTile: React.FC<FeedPostTypeInterface> = ({
  imageUrl, uid, username, pid, numberLikes, numberComments, comments
}): JSX.Element => {
  console.log(pid, numberLikes, numberComments, comments);
  return (
    <Box
      sx={{
        width: 'inherit',
      }}
    >
      <ImageItem
        key={`${uid}-${username}`}
        src={imageUrl}
      />
      {/* <MetaDataBar
        uid={uid}
        pid={pid}
        numberLikes={numberLikes}
        numberComments={numberComments}
        username={username}
        postText={postText}
        imageUrl={imageUrl}
        comments={comments}
      /> */}
    </Box>
  );
}

export {
  FeedTile,
  ImageItem
}
