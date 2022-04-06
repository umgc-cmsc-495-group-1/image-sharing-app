import React from 'react'
import ImageListItem from '@mui/material/ImageListItem';
import { FeedPostTypeInterface } from '../../tests/test_data';
import useWindowDimensions from '../../hooks/useWindowDimensions';
// import { MetaDataBar } from './MetaDataBar';

// import { FeedPostType } from '../../tests/test_data';

type ImageItemProps = {
  src: string | undefined;
  alt?: string;
  loading?: "lazy" | "eager" | undefined;
  maxWidth?: string | undefined;
}

const ImageItem: React.FC<ImageItemProps> = ({ src, alt, maxWidth }): JSX.Element => {
  const isAlt = alt ? alt : 'image';
  return (
    <>
      <img src={src} alt={isAlt} sizes={maxWidth} />
    </>
  );
}

const FeedTile: React.FC<FeedPostTypeInterface> = ({
  imageUrl, uid, username, pid, postText, numberLikes, numberComments, comments
}): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const currentHeight = (height / 3);
  const currentWidth = (width - (width / 3) + "px");
  console.log(pid, numberLikes, numberComments, comments);
  return (
    <ImageListItem
      sx={{
        width: '80%',
        height: currentHeight,
      }}
    >
      <ImageItem
        key={`${uid}-${username}`}
        src={imageUrl}
        alt={postText}
        maxWidth={currentWidth}
        loading="lazy"
      />
    </ImageListItem>

  );
}

export {
  FeedTile
}