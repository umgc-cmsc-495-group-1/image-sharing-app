import React from 'react'
import { FeedPostInterface, ImageItemProps } from '../../types/appTypes';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Box } from '@mui/material';
import { MetaDataBar } from './MetaDataBar';

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


const ImageItem: React.FC<ImageItemProps> = ({ src, alt, margin, padding }): JSX.Element => {
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

const FeedTile: React.FC<FeedPostInterface> = ({
  imageUrl, uid, username, pid, postText, numberLikes, numberComments, comments
}): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const { margin, padding } = determineMarginAndPadding(width);
  return (
    <Box
      sx={{
        width: 'inherit',
      }}
    >
      <ImageItem
        key={`${uid}-${username}`}
        src={imageUrl}
        margin={margin}
        padding={padding}
      />
      <MetaDataBar
        uid={uid}
        pid={pid}
        numberLikes={numberLikes}
        numberComments={numberComments}
        username={username}
        postText={postText}
        imageUrl={imageUrl}
        comments={comments}
        margin={margin}
        padding={padding}
        screenWidth={width}
        screenHeight={height}
      />
    </Box>
  );
}

export {
  FeedTile,
  ImageItem,
  determineMarginAndPadding
}
