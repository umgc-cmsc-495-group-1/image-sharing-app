import {useState, useEffect} from "react";
import {FeedPostType} from "../types/appTypes";
import { getPublicFeedData } from "../data/photoData";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";
import { mapUserPhotos } from "../utils/middleware";
// import {comparator, Graph} from "../engine/Engine";

/**
 * React Hook to get all photos in a collection
 * using the user's ID and friend list
 * @returns photos: DocumentData
 */

async function getPhotos(user: AppUserInterface) {
  if (user.uid !== "") {
    try {
      const userPhotos: FeedPostType[] = await getPublicFeedData();
      mapUserPhotos(userPhotos);
      return userPhotos;
    } catch (e) {
      const emptyArray: FeedPostType[] = [];
      return emptyArray;
    }
  }
}


// Sets as photoData
export const useExplore = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  // const [formattedPosts, setFormattedPosts] = useState<FeedPostInterface[]>([]);
  // const [graph, setGraph] = useState<Graph<{ user: AppUserInterface; post: FeedPostInterface }>>(
  //   new Graph(comparator)
  // );
  // const [unsortedPosts, setUnsortedPosts] = useState<FeedPostType[]>([]);
  // const [size, setSize] = useState<number>(0);
  // const [sortedPosts, setSortedPosts] = useState<FeedPostType[]>([]);
  const user: AppUserInterface = useCurrentUser();
  // const userPhotos: FeedPostType[] = [];
  // const formattedPosts: FeedPostType[] = [];
  // const graph: Graph<{ user: AppUserInterface; post: FeedPostInterface }> = new Graph(comparator);
  // Load user's photo collection from Firestore db

  // const getSortedPosts = useMemo(() => async function sortedPosts() {
  //   const photos = await getPhotos(user);
  //   let currentPosts: FeedPostInterface[] = [];
  //   if (photos !== undefined) {
  //     // setUnsortedPosts(photos);
  //     // setSize(photos.length);
  //     photos.forEach((post, index) => {
  //       graph.addNode({user: user, post: photos[index]})
  //     })
  //     graph.sort();
  //     graph.nodes.forEach(node => currentPosts.push(node.data.post))
  //     setFormattedPosts(currentPosts);
  //     console.log(currentPosts);
  //     currentPosts = [];
  //     setGraph(new Graph(comparator));
  //   }
  //   setPosts(formattedPosts);
  // }, [user]);

  useEffect(() => {
    (async () => {
      const photos = await getPhotos(user);
      if (photos !== undefined) {
        setPosts(photos);
      }
    })();
    // (async () => {
    //   const photos = await getPhotos(user);
    //   if (photos !== undefined) {
    //     // setUnsortedPosts(photos);
    //     // setSize(photos.length);
    //     photos.forEach((post, index) => {
    //       graph.addNode({user: user, post: photos[index]})
    //     })
    //     graph.sort();
    //     graph.nodes.forEach(node => formattedPosts.push(node.data.post))
    //   }
    //   setPosts(formattedPosts);
    // })();
  }, [user]);
  // if (unsortedPosts.length > 0) {
  //   unsortedPosts.forEach((post) => graph.addNode({user: user, post: post}))
  // }
  // unsortedPosts.forEach((post, index) => {
  //   // if (unsortedPosts.length - 1 >= index) {
  //   if (index < unsortedPosts.length) {
  //     graph.addNode({user: user, post: unsortedPosts[index]})
  //   }
  // })
  // console.log(graph.nodes);
  // graph.sort();
  // graph.nodes.forEach((node, index) => {
  //   if (graph.nodes.length - 1 >= index) {
  //     formattedPosts.push(node.data.post)
  //   }
  // })
  // console.log(formattedPosts)
  return posts;

  // const getSortedPosts = useCallback(() => {
  //   const formattedPosts: FeedPostType[] = [];
  //   if (unsortedPosts.length > 0) {
  //     unsortedPosts.forEach((post) => graph.addNode({user: user, post: post}))
  //   }
  //   graph.sort();
  //   graph.nodes.forEach(node => formattedPosts.push(node.data.post))
  //   setSortedPosts(formattedPosts);
  //   return sortedPosts;
  // }, [unsortedPosts, user]);

};
