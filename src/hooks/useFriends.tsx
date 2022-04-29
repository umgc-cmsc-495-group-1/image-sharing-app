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
    // let usersPosts: FeedPostType[] = [];
    const user: AppUserInterface = useCurrentUser();
    // const id: string = user.uid;
    // Load user's photo collection from Firestore db
    useEffect(() => {
        async function getFriendList() {
            let friendList: AppUserInterface[];
            try {
                friendList = await getFriends(user.friends);
            }
            catch (e) {
                friendList = [];
                console.log(e);
            }
            setFriends(friendList);
        }
        getFriendList();
    }, [user]);

    return friends;
}

