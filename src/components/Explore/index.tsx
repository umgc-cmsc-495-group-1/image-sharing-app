import React from "react";
import { Box, Container } from "@mui/material";
import { FeedPostType } from "../../types/appTypes";
import { UploadFab } from "../UploadFab";
import Post from "../Profile/Post";
// import { useExplore } from "../../hooks/useExplore";
import {useExploreAlt} from "../../hooks/useExploreAlt";
import useWindowDimensions from "../../hooks/useWindowDimensions";
// import {InfiniteScrollExplore} from "./InfiniteScrollExplore";

// const getPostsByIndex = (array: FeedPostType[], from: number, to: number) => {
//    return array.slice(from, to);
// }

const Explore: React.FC = (): JSX.Element => {
  const posts = useExploreAlt();
  const {height} = useWindowDimensions();
  // const [nextIndex, setNextIndex] = useState(2);
  // const [currentPosts, setCurrentPosts] = useState<FeedPostType[]>(getPostsByIndex(posts, 0, 2));

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const {scrollTop, scrollHeight, clientHeight} = event.currentTarget;
    console.log(scrollTop, scrollHeight, clientHeight);
    console.log(height);
  }


  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
        role="feed-container"
      >
        <Box maxWidth="sm">
          <div onScroll={scrollHandler}>
            {posts.map((item: FeedPostType) => {
              return (
                <div key={item.pid}>
                  <Post pid={item.pid} />
                </div>
              )
              // if (totalPosts.length === index + 1) {
              //   return (
              //     <div key={item.pid} ref={lastPostElement}>
              //       <Post pid={item.pid} />
              //     </div>
              //   )
              // } else {
              //   return (
              //     <div key={item.pid}>
              //       <Post pid={item.pid} />
              //     </div>
              //   )
              // }
            })}
          </div>
        </Box>
        <Box>
          <UploadFab />
        </Box>
      </Box>
    </Container>
  );
};

export default Explore;

// console.log(currentPosts);
// console.log(posts);
// const hasMore = currentPosts.length < posts.length;
// const observer = useRef<IntersectionObserver>();
// const lastPostElement = useCallback((node: HTMLDivElement) => {
//     // if (loading) return
//     console.log("I am getting run")
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         console.log(currentPosts)
//         console.log("I am getting run")
//         setCurrentPosts(getPostsByIndex(posts, nextIndex, nextIndex + 2));
//         setNextIndex(nextIndex + 2);
//       }
//     });
//     if (node) observer.current.observe(node);
//   }, [hasMore, nextIndex, posts]);

//   const loadMorePosts = () => {
//     setPage((page) => page + 1);
//     setIsLoading(true);
//     setTimeout(() => {
//       const newNumbers = new Array(NUMBERS_PER_PAGE)
//         .fill(1)
//         .map((_, i) => page * NUMBERS_PER_PAGE + i);
//       setNumbers((nums) => [...nums, ...newNumbers]);
//       setIsLoading(false);
//     }, 300);
//   }

// <InfiniteScrollExplore
//             hasMoreData={hasMorePosts}
//             isLoading={isLoading}
//             onBottomHit={loadMorePosts}
//             loadOnMount={true}
//           >
//             <ul>
//               {numbers.map((number) => (
//                 <li key={number}>{number}</li>
//               ))}
//             </ul>
//
//           </InfiniteScrollExplore>

// <div key={item.pid} ref={lastPostRef}>
//                 <Post pid={item.pid} />
//               </div>

// const lastPostRef = useCallback(
//   (node: HTMLDivElement) => {
//     if (loading) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setNextIndex(currentIndex);
//       }
//     }, { rootMargin: "0px 0px 100px 0px" });
//     if (node) observer.current.observe(node);
//   },
//   [loading, currentIndex]
// );

// if (posts.length == index + 1) {
//   return (
//     <div key={item.pid} ref={lastPostRef}>
//       <Post pid={item.pid} />
//     </div>
//   );
// } else {
//   return (
//     <div key={item.pid}>
//       <Post pid={item.pid} />
//     </div>
//   );
// }
