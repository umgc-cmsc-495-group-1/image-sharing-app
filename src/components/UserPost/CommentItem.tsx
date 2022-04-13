import React from 'react';
import { CommentInterface } from '../../tests/test_data';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const CommentItem: React.FC<CommentInterface> = ({ uid, username, comment }): JSX.Element => {
  const address = `/user/${uid}/profile`;
  const marginTops = '1.5rem';
  const marginSides = '4rem';
  return (
    <Box
      sx={{
        marginLeft: '1.25rem',
        mx: marginSides,
        my: marginTops,
      }}
    >
      <Link to={address}>
        {username}
      </Link>
      <br />
      {comment}
    </Box>
  );
}

export default CommentItem;