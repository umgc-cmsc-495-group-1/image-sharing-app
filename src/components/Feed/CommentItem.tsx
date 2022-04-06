import React from 'react';
import { CommentInterface } from '../../tests/test_data';

const CommentItem: React.FC<CommentInterface> = ({ username, comment }): JSX.Element => {
  return (
    <>
      {username}
      <br />
      {comment}
    </>
  );
}

export default CommentItem;