import {useState, useEffect} from "react";
import { FeedPostType } from "../types/appTypes";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";
import { getExplore } from "../data/photoData";
// import { FieldValue } from "firebase/firestore";
// import {comparator, Graph} from "../engine/Engine";

/**
 * React Hook to get all photos in a collection
 * using the user's ID and friend list
 * @returns photos: DocumentData
 */

async function getPhotos(user: AppUserInterface) {
  const {totalPosts, size} = await getExplore(user)
  return {totalPosts, size}
}


// Sets as photoData
// export const useExplore = (nextTimestamp: FieldValue | undefined) => {
export const useExplore = (nextIndex: number) => {
  // const [totalSize, setTotalSize] = useState(0);
  const [totalPosts, setTotalPosts] = useState<FeedPostType[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<{ error: boolean; message: string; }>(
    {error: false, message: ""});
  // const [posts, setPosts] = useState<FeedPostType[]>([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const user: AppUserInterface = useCurrentUser();

  // const getPostsByIndex = useCallback((from: number, to: number) => {
  //       return totalPosts.slice(from, to);
  //     }, [totalPosts]);

  // useEffect(() => {
  //   setTotalPosts([]);
  // }, [totalPosts]);

  useEffect(() => {
    console.log(nextIndex);
    setLoading(true);
    setError({error: false, message: ""});
    getPhotos(user).then(photos => {
      setTotalSize(photos.size);
      if (nextIndex > 2){
        // setTotalSize(photos.size);
        setTotalPosts(prevPosts => {
          return [...prevPosts, ...photos.totalPosts.slice(currentIndex, nextIndex)];
        });
        setCurrentIndex(nextIndex);
        setHasMore(photos.totalPosts.length > totalSize);
        // setCurrentIndex(nextIndex);
        // setHasMore(photos.totalPosts.length > totalSize);
        // setLoading(false);
      } else {
        setTotalPosts(() => {
          return [...photos.totalPosts.slice(currentIndex, nextIndex)];
        });
        setCurrentIndex(nextIndex);
        setHasMore(photos.totalPosts.length > totalSize);
      }

      // setHasMore(photos.totalPosts.length > totalSize);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setError({error: true, message: err.message});
    })
  }, [user, currentIndex, nextIndex, totalSize]);

  return {loading, hasMore, totalPosts, error};
};




// Load user's photo collection from Firestore db
// useEffect(() => {
//   const fetch = async () => {
//     // console.log("next index", nextIndex)
//     const {currentPosts} = await getPhotos(user);
//     setTotalPosts(currentPosts);
//     // setTotalSize(currentPosts.length);
//     // if (nextIndex < totalSize) {
//     //   setCurrentIndex(nextIndex + 2);
//     //   // const {currentPosts, totalPosts} = await getPostsByIndex(nextIndex, nextIndex + 2);
//     //   let pieces: FeedPostType[] = [];
//     //   if (nextIndex === 2) {
//     //     pieces = getPostsByIndex(0, 2);
//     //     console.log("pieces top", pieces)
//     //   } else {
//     //     pieces = getPostsByIndex(nextIndex, nextIndex + 2);
//     //     console.log("pieces bottom", pieces)
//     //   }
//     //   setPosts((prevPosts) => [...prevPosts, ...pieces]);
//     // }
//     // else {
//     //   console.log("not two")
//     //   const {currentPosts, totalPosts} = await getPostsByIndex(nextIndex - 2, nextIndex);
//     //   setTotalSize(totalPosts);
//     //   setPosts(currentPosts);
//     // }
//   }
//   fetch();
//   // (async () => {
//   //   await fetch();
//   // })();
// }, [user]);
// console.log(posts);
// return totalPosts;
// return { loading, posts, lastTimestamp };

//   if (nextIndex > currentIndex) {
//     await getExplore(user).then((res) => {
//       setPosts((prevPosts) => {
//         return [...prevPosts, ...res.posts.slice(currentIndex, nextIndex)];
//       });
//       // setLastTimestamp(res.lastTimestamp);
//       setCurrentIndex(nextIndex);
//       // setCurrentIndex((currentIndex === (currentIndex - 2)) ? currentIndex + 2 : currentIndex);
//       setLoading(false);
//     });
//   } else {
//     await getExplore(user).then((res) => {
//       console.log(res);
//       setPosts(() => {
//         return [...res.posts.slice(currentIndex, 2)];
//       });
//       // setLastTimestamp(res.lastTimestamp);
//       setCurrentIndex(nextIndex);
//       // setCurrentIndex((currentIndex === 0) ? currentIndex + 2 : currentIndex);
//       setLoading(false);
//     });
//   }
// };
