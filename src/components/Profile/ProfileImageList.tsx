import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

const ProfileImageList = ({ images, uid }: { images: string[], uid: string }) => {
  const details: React.CSSProperties = {
    objectFit: 'contain',
  }

  function generatePath(index: number) {
    const pid = (index + 1).toString();
    console.log(pid)
    return `/user/${uid}/profile/${pid}`
  }

  return (
    <ImageList
      sx={{
        width: 500,
        height: 450,
        marginTop: 4
      }}
      cols={3}
      rowHeight={164}
    >
      {images.map((item, index) => (
        <a
          href={generatePath(index)}
          key={`${uid}-${index}-link`}
        >
          <ImageListItem
            key={`${uid}-${index}`}
          >
            <img
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
              style={details}
            />
          </ImageListItem>
        </a>
      ))}
    </ImageList>
  )
}

export {
  ProfileImageList
}