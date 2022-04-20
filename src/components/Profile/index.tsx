import React, { useState } from 'react';
import { Box } from '@mui/system';
import { registerRandomUsers } from '../../tests/test_data'

const Profile: React.FC = () => {

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
    // console.log(profile)
    // console.log(feed)
    if (profile !== undefined && feed !== undefined) {
      // add test data to databasa
      registerRandomUsers(profile, feed)
      // console.log(profile)
      // console.log(feed)
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

export {
  Profile
}