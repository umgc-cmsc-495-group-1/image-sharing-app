import userEvent from '@testing-library/user-event';
import React from 'react';
import { auth } from '../../firebaseSetup';
import { Box, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { getUserProfileByUserID, updateUser } from '../../data/userData';
import { ProfileInterface } from '../../types/appTypes';

export default function FriendsList() {
  console.log('FriendsList happened')
  const user = auth.currentUser ? auth.currentUser.uid : 'no user'
  console.log(user)
  console.log(userEvent)

  type ButtonProps = {
    text: string
    onClick: React.MouseEventHandler
  }

  type FriendProps = {
    uid: Promise<string | undefined>
    profilePicURL: Promise<string | undefined>
    // "../assets/logo/png/simple-72x72.png"
    name: Promise<string | undefined>
    profile: Promise<ProfileInterface | undefined>
    index: number
    remove: (index: number) => Promise<boolean> // eslint-disable-line no-unused-vars
  }

  type FriendState = {
    currentUser: string | null
    friends: FriendProps[] | null
  }

  class Friends extends React.Component<any, FriendState> {
    constructor(props: any) {
      super(props);
      const friendArray: FriendProps[] = []

      if (auth.currentUser !== null) {
        getUserProfileByUserID(auth.currentUser.uid).then(user => {
          const friends = user?.friends
          if (friends !== undefined) {
            let i = 0
            for (const frd of friends) {
              console.log("friend ", i, ": ", frd)
              const currentFrd = getUserProfileByUserID(frd)
              friendArray.push({
                uid: currentFrd.then(user => { return user?.uid }),
                profilePicURL: currentFrd.then(user => { return user?.imageUrl }),
                name: currentFrd.then(user => { console.log(user?.displayName); return user?.displayName }),
                profile: currentFrd,
                index: i,
                remove: this.remove,
              })
              i++
            }
          }
        });
        this.setState({
          currentUser: auth.currentUser.uid,
          friends: friendArray,
        })
      } else {
        this.setState({
          currentUser: null,
          friends: null,
        })
      }
    }

    async remove(index: number) {
      if (this.state.friends !== null) {
        const uid = await this.state.friends[index].uid
        if (uid !== undefined) {
          const profile = await this.state.friends[index].profile
          if (profile !== undefined) {
            updateUser(uid, profile)
            return true
          }
        }
      }
      return false
    }

    render() {
      if (this.state) {
        if (this.state.friends) {
          const friends = this.state.friends
          if (friends !== null) {
            const friendElements = friends.map((theProps: FriendProps) => Friend(theProps))
            return (
              <List>
                {friendElements}
              </List>
            )
          }
        }
      }
      return (
        <Typography>
          No friends found.
        </Typography>
      )
    }

  }

  function Friend(props: FriendProps) {
    const pageURL = "/" + props.uid
    let picURL = ""
    props.profilePicURL.then((pic) => {
      if (pic !== undefined) {
        picURL = pic
      }
    })
    return (
      <ListItem>
        <Link href={pageURL}>
          <ListItemAvatar>
            <img src={picURL} />
          </ListItemAvatar>
        </Link>
        <ListItemText primary={props.name} />
        <RemoveButton
          onClick={() => props.remove(props.index)}
          text={'Remove'}
        />
      </ListItem>
    )
  }

  function RemoveButton(props: ButtonProps) {
    return (
      <ListItemButton onClick={props.onClick}>
        <ListItemText primary={props.text} />
      </ListItemButton>
    )
  }

  return (
    <Box>
      <h2>Friends</h2>
      <Friends />
    </Box>
  );
}
