import React, { useState } from 'react';
import { registerRandomUsers, demoFeedImages, getProfileData } from '../../tests/test_data'
import { useParams, Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { UserMetaData } from './UserMetaData';

const TestUpload: React.FC = () => {

  const [profile, setProfile] = useState<File[]>()
  const [feed, setFeed] = useState<File[]>()

  const handleProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    console.log(fileList)
    const result: File[] = [];
    for (const key in fileList) {
      if (Object.prototype.hasOwnProperty.call(fileList, key)) {
        const element = fileList[key];
        result.push(element);
      }
    }
    setProfile(result)
  }

  const handleFeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    console.log(fileList)
    const result: File[] = [];
    for (const key in fileList) {
      if (Object.prototype.hasOwnProperty.call(fileList, key)) {
        const element = fileList[key];
        result.push(element);
      }
    }
    setFeed(result)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (profile !== undefined && feed !== undefined) {
      // add test data to databasa
      registerRandomUsers(profile, feed)
    }
  }



  return (
    <Box>
      <div>
        <label htmlFor="add-profile">Add Profile</label>
        <input
          id='add-profile' name='add-profile' type="file"
          accept='.jpg, .jpeg, .png' multiple onChange={handleProfile}
        />
        <label htmlFor="add-feed">Add Feed</label>
        <input
          id='add-feed' name='add-feed' type="file"
          accept='.jpg, .jpeg, .png' multiple onChange={handleFeed}
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
        >Submit</button>
      </div>
    </Box>
  )
}

const Profile: React.FC = () => {
  const { uid } = useParams();
  const profileData = getProfileData(uid);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 10
        }}
      >
        <UserMetaData
          uid={profileData.uid}
          username={profileData.username}
          posts={profileData.posts}
          displayName={profileData.displayName}
          friends={profileData.friends}
          likes={profileData.likes}
          email={profileData.email}
          bio={profileData.bio}
          imageUrl={profileData.imageUrl}
          testImages={demoFeedImages}
        />
      </Box>
      <Outlet />
    </Container>
  )
}

export {
  Profile,
  TestUpload
}