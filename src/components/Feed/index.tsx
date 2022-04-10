import React from 'react'
import { Box } from '@mui/material';
import { FeedTile } from './FeedTile';
import { totalFeedPosts, FeedPostType } from '../../tests/test_data';

const Feed: React.FC = (): JSX.Element => {
  console.log(totalFeedPosts.length)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {totalFeedPosts.map((item: FeedPostType) => (
        <FeedTile
          key={`${item.username}-${item.uid}`}
          imageUrl={item.imageUrl}
          uid={item.uid}
          username={item.username}
          pid={item.pid}
          postText={item.postText}
          numberLikes={item.numberLikes}
          numberComments={item.numberComments}
          comments={item.comments}
        />
      ))}
    </Box>
  );
}

export default Feed;
