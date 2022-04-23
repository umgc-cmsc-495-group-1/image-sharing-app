import React from 'react'
import { FeedPostInterface, ImageItemProps } from '../../types/appTypes';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Box } from '@mui/material';
import { MetaDataBar } from './MetaDataBar';
import { determineMarginAndPadding } from '../../utils/marginPadding';

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
  imageUrl, uid, username, pid,
  postText, numberLikes, numberComments, comments,
  classification, timestamp
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
        classification={classification}
        timestamp={timestamp}
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
  ImageItem
}
