import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProfileImageInterface, TestProfileInterface } from '../../types/appTypes';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { determineMarginAndPadding } from '../../utils/marginPadding';
import { ProfileImageList } from './ProfileImageList';

const BioInfo = (
  { friends, posts, bio }: { friends: [], posts: number, bio: string }
) => {
  let totalFriends = 0;
  if (friends.length < 1) {
    totalFriends = 50;
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography
          role="profile-posts"
        >
          <strong>{posts}</strong>
          <br />
          <strong>Posts</strong>
        </Typography>
        <Typography
          role="profile-friends"
          sx={{
            marginBottom: 3
          }}
        >
          <strong>{totalFriends}</strong>
          <br />
          <strong>Friends</strong>
        </Typography>
      </Box>
      <Box
        sx={{
          px: 5,
          width: '15rem'
        }}
      >
        {bio}
      </Box>
    </Box>

  )
}

const ProfileImage: React.FC<ProfileImageInterface> = ({ src, username, alt }) => {
  const isAlt = (alt !== "") ? alt : 'image';
  const details: React.CSSProperties = {
    height: "100%",
    width: "150%",
    borderRadius: "50%",
    objectFit: "contain",
    flexBasis: 2
  }
  const usernameStyles: React.CSSProperties = {
    textAlign: 'center',
    paddingLeft: 50
  }
  return (
    <Box
      sx={{
        marginRight: 10
      }}
    >
      <img
        src={src}
        alt={isAlt}
        style={details}
        loading="lazy"
      />
      <p role="username" style={usernameStyles}><strong>{username}</strong></p>
    </Box>
  )
}

const UserMetaData: React.FC<TestProfileInterface> = ({
  uid, posts, displayName, friends, bio, imageUrl, testImages
}) => {
  const { width } = useWindowDimensions();
  const { margin, padding } = determineMarginAndPadding(width);

  return (
    <Box
      sx={{

      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <ProfileImage
          margin={margin}
          padding={padding}
          src={imageUrl}
          username={displayName}
        />
        <BioInfo
          friends={friends}
          posts={posts}
          bio={bio}
        />
      </Box>
      <Box>
        <ProfileImageList
          uid={uid}
          images={testImages}
        />
      </Box>
    </Box>
  )
}

export {
  UserMetaData
}
