import React from "react";
import {PostDetailProps} from "../../types/appTypes";
import {Box} from "@mui/material";


const PostDetails: React.FC<PostDetailProps> = ({
  username, postText, metaDataProps
}): JSX.Element => {
  const metaDataStyles = {
    userStyle: {
      justifyContent: 'flex-start',
    },
    postStyle: {
      justifyContent: 'flex-end',
    }
  }

  const userStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.35rem',
    color: '#bfa760',
    marginLeft: '1.25rem',
  }
  const postStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#000',
    marginLeft: '1.25rem',
  }

  if (metaDataProps) {
    userStyle.justifyContent = metaDataStyles.userStyle.justifyContent;
    postStyle.justifyContent = metaDataStyles.postStyle.justifyContent;
  }
  return (
    <Box
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <p role='username' style={userStyle}>{username}</p>
      <p role='description' style={postStyle}>{postText}</p>
    </Box>
  );
};

export {
  PostDetails
}
