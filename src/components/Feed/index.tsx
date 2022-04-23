import React from 'react'
import { Box } from '@mui/material';
import { FeedTile } from './FeedTile';
import { generateRandomFeedProps } from '../../tests/test_data';
import { FeedPostType } from '../../types/appTypes';
import { UploadFab } from '../UploadFab';

const Feed: React.FC = (): JSX.Element => {
  const totalFeedPosts = generateRandomFeedProps()
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
          classification={item.classification}
          timestamp={item.timestamp}
          comments={item.comments}
        />
      ))}
      <Box>
        <UploadFab />
      </Box>
    </Box>
  );
}

export default Feed;
