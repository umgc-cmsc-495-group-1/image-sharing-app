import { useState, useEffect } from 'react'
import { getFriends } from '../data/userData';
import { AppUserInterface } from '../types/authentication';
import { useCurrentUser } from './useCurrentUser';

/**
 * @description React Hook to get all friends of the current user
 * @param userId
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useFriends = () => {

    const [friends, setFriends] = useState<AppUserInterface[] | []>([]);
    const user: AppUserInterface = useCurrentUser();
    // const id: string = user.uid;

    useEffect(() => {
        async function getFriendList() {
            // let friendList: AppUserInterface[];
            try {
                await getFriends(user.friends, setFriends);
            }
            catch (e) {
                //friendList = [];
                console.log(e);
            }
            // setFriends(friendList);
        }
        getFriendList();
    }, [user]);

    return friends;
}

