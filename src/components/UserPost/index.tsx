import React from 'react';
import {
  PostDetails,
} from '../Feed/MetaDataBar';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getPostData, CommentInterface } from '../../tests/test_data';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ImageItem, determineMarginAndPadding } from '../Feed/FeedTile';
import CommentItem from './CommentItem';

export default function UserPost() {
  const { uid, pid } = useParams();
  const postData = getPostData(uid, pid);
  const { width } = useWindowDimensions();
  const { margin, padding } = determineMarginAndPadding(width);
  const marginTops = '1.5rem';
  const marginSides = '4rem';
  const paddingTop = '1.5rem';
  const paddingSides = '2rem';
  return (
    <Box
      sx={{
        px: padding,
        mx: margin,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: '80%'
      }}
    >
      <Box
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <ImageItem
          src={postData.imageUrl}
          margin={margin}
          padding={padding}
        />
      </Box>
      <Box
        sx={{
          justifyContent: 'space-between',
          mx: marginSides,
          my: marginTops,
          px: paddingSides,
          py: paddingTop,
        }}
      >
        <PostDetails
          username={postData.username}
          postText={postData.postText}
          margin={margin}
          padding={padding}
        />
      </Box>
      <Box
        sx={{
          justifyContent: 'space-between',
          px: paddingSides,
          mb: '4rem',
          mx: '1.25rem'
        }}
      >
        {postData.comments.map((item: CommentInterface) => (
          <CommentItem
            key={`${item.uid}-${item.username}`}
            uid={item.uid}
            username={item.username}
            comment={item.comment}
          />
        ))}
      </Box>
    </Box>
  );
}
