import React from 'react'
import { ImageList, Box } from '@mui/material';
import { FeedTile } from './FeedTile';
import { totalFeedPosts, FeedPostType } from '../../tests/test_data';

const Feed: React.FC = (): JSX.Element => {

  return (
    <Box>
      <ImageList
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
        cols={1}
        rowHeight={1000}
      >
        {totalFeedPosts.map((item: FeedPostType) => {
          return (
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
          );
        })}
      </ImageList>
    </Box>
  );
}

export default Feed;