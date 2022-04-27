import {
  CommentInterface,
  FeedPostInterface,
  FeedPostType,
  ProfileInterface
} from '../types/appTypes'
// import { UserInterface } from '../types/authentication'
// import { signup } from '../data/authFunctions'
// import { createNewPost, updateProfileImg } from '../data/photoData'
import profileImage1 from '../assets/static/profile/aiony-haust-3TLl_97HNJo-unsplash.jpg'
import profileImage2 from '../assets/static/profile/ali-morshedlou-WMD64tMfc4k-unsplash.jpg'
import profileImage3 from '../assets/static/profile/almos-bechtold-3402kvtHhOo-unsplash.jpg'
import profileImage4 from '../assets/static/profile/austin-wade-X6Uj51n5CE8-unsplash.jpg'
import profileImage5 from '../assets/static/profile/bailey-burton-qVGRXceFz10-unsplash.jpg'
import profileImage6 from '../assets/static/profile/gabriel-silverio-u3WmDyKGsrY-unsplash.jpg'
import profileImage7 from '../assets/static/profile/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg'
import profileImage8 from '../assets/static/profile/imansyah-muhamad-putera-n4KewLKFOZw-unsplash.jpg'
import profileImage9 from '../assets/static/profile/jack-finnigan-rriAI0nhcbc-unsplash.jpg'
import profileImage10 from '../assets/static/profile/jimmy-fermin-bqe0J0b26RQ-unsplash.jpg'
import profileImage11 from '../assets/static/profile/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg'
import profileImage12 from '../assets/static/profile/julian-wan-WNoLnJo7tS8-unsplash.jpg'
import profileImage13 from '../assets/static/profile/michael-dam-mEZ3PoFGs_k-unsplash.jpg'
import profileImage14 from '../assets/static/profile/toa-heftiba-O3ymvT7Wf9U-unsplash.jpg'
import feedImage1 from '../assets/static/images/abhinav-arya-0r5zivchDyE-unsplash.jpg'
import feedImage2 from '../assets/static/images/alex-rybin-Ne5nShVl6NM-unsplash.jpg'
import feedImage3 from '../assets/static/images/axel-blanchard-YVKotYBAUko-unsplash.jpg'
import feedImage4 from '../assets/static/images/brian-lawson-abiq3vnHjnk-unsplash.jpg'
import feedImage5 from '../assets/static/images/brynn-thorn-RIIMd1r-n_M-unsplash.jpg'
import feedImage6 from '../assets/static/images/eugene-tkachenko-XHDP42n5Yu0-unsplash.jpg'
import feedImage7 from '../assets/static/images/freysteinn-g-jonsson-IkZClStWLT4-unsplash.jpg'
import feedImage8 from '../assets/static/images/giorgio-manenti-MNlKblRC98k-unsplash.jpg'
import feedImage9 from '../assets/static/images/hana-4mpn4AWt7SM-unsplash.jpg'
import feedImage10 from '../assets/static/images/lina-a-3Gacb2IYrAk-unsplash.jpg'
import feedImage11 from '../assets/static/images/max-lissenden-0MHf_nafpaw-unsplash.jpg'
import feedImage12 from '../assets/static/images/melanie-weidmann-hgxZEH6RjKc-unsplash.jpg'
import feedImage13 from '../assets/static/images/mounir-abdi-wYPG-eyGal0-unsplash.jpg'
import feedImage14 from '../assets/static/images/philipp-deus-pUoQ07FB2wY-unsplash.jpg'
import feedImage15 from '../assets/static/images/sour-moha-fFEX3kFoe00-unsplash.jpg'
import feedImage16 from '../assets/static/images/svitlana-w7dlfv2BWvs-unsplash.jpg'
import feedImage17 from '../assets/static/images/theaminahmadi-T0WB-E2hcYU-unsplash.jpg'
import feedImage18 from '../assets/static/images/tommy-bond-UVKEa1foFnA-unsplash.jpg'
import feedImage19 from '../assets/static/images/yusuf-sabqi-0CPGThabpy8-unsplash.jpg'
import {serverTimestamp} from "firebase/firestore";

/**
 * Array of test user names to be used in the feed and profile
 */
const demoDisplayNames = [
  'abhinav', 'alex', 'axel', 'brian', 'brynn', 'eugene', 'freysteinn', 'giorgio', 'hana',
  'lina', 'max', 'melanie', 'mounir', 'philipp', 'sour', 'svitlana', 'theaminahmadi', 'tommy', 'yusuf'
]

const demoUsernames = ['Angel Egotrip', 'Made Savage', 'Binary Bark', 'The Deal', 'Fiddle Pie', 'Raid Brigade', 'Geez God', 'Mindhack Diva', 'Sugar Lump', 'K For Kun', 'Armor of Odd', 'Loop Hole Mindset', 'Asterism Zeevine', 'Droolbug', 'Starry Divinity', 'Zig Wagon', 'Blu Zoo', 'Lens Patriot', 'Doll Throne', 'Sweetielicious', 'Krazy Encounter', 'Strife Life', 'Ice Minister', 'Twinkle Doll', 'Meat Mojo', 'Evil Rage', 'Apogee Point', 'Cluster of Hope', 'Angel Berry', 'Mind Pixell', 'It Was Me', 'Marker Dee', 'Ahem Girl', 'Emoster Pink', 'Diva Comet', 'Prep Station', 'Whack Stack', 'Cutefest Fizzle', 'Him Again', 'Dread Monster', 'Exit Hound', 'Mind Trick Poodle', 'Prom Doll', 'Rainbow Passion', 'Cislunar Doll', 'Bright Nut', 'Fruit Loop Diva', 'Grimster', 'Cynic Poet', 'Illustrious Doom'
]
/**
 * Array of test profile pictures to be used in the feed and profile
 */
const demoProfilePictures = [
  profileImage1,
  profileImage2,
  profileImage3,
  profileImage4,
  profileImage5,
  profileImage6,
  profileImage7,
  profileImage8,
  profileImage9,
  profileImage10,
  profileImage11,
  profileImage12,
  profileImage13,
  profileImage14
]
/**
 * Array of test feed posts to be used in the feed
 */
const demoFeedImages = [
  feedImage1,
  feedImage2,
  feedImage3,
  feedImage4,
  feedImage5,
  feedImage6,
  feedImage7,
  feedImage8,
  feedImage9,
  feedImage10,
  feedImage11,
  feedImage12,
  feedImage13,
  feedImage14,
  feedImage15,
  feedImage16,
  feedImage17,
  feedImage18,
  feedImage19
]
/**
 * Object of test users and images to be used in the feed and profile
 */
const demoContent = {
  profile: demoProfilePictures,
  images: demoFeedImages
}

/**
 * @description - Generate a random test user to be used in the feed and profile
 * @returns {ProfileInterface[]}
 */
function generateRandomUsers(): ProfileInterface[] {
  const users: ProfileInterface[] = []
  for (let i = 0; i < demoProfilePictures.length; i++) {
    const user: ProfileInterface = {
      uid: `${i + 1}`,
      username: `${demoUsernames[i]}`,
      posts: Math.floor(Math.random() * 100),
      displayName: `${demoDisplayNames[i]}`,
      friends: [],
      likes: [],
      email: `${demoDisplayNames[i]}@test.com`,
      // friends: Math.floor(Math.random() * 30),
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: demoContent.images[Math.floor(Math.random() * demoContent.profile.length)]
    }
    users.push(user)
  }

  return users
}

// export async function registerRandomUsers(profilePhotos: File[], feedPhotos: File[]) {
//   const totalUsers = generateRandomUsers();
//   for (let i = 0; i < totalUsers.length; i++) {
//     const currentUser: UserInterface = {
//       displayName: totalUsers[i].displayName,
//       username: totalUsers[i].username,
//       email: totalUsers[i].email,
//       password: 'Password18!',
//       verifyPassword: 'Password18!'
//     }
//     // add user info to db
//     await signup(currentUser)
//       .then(res => {
//         if (res.status == 201) {
//           console.log(res.user)
//         }
//       })
//       .catch(err => {
//         if (err.status === 400) {
//           console.log(err.message)
//         }
//       })
//     // add user image info to db
//     // let currentFile: File = createFileFromPath(totalUsers[i].imageUrl)
//     await updateProfileImg(totalUsers[i].uid, profilePhotos[i])
//     await createNewPost(totalUsers[i].uid,
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//       feedPhotos[i])
//   }
// }

/**
 * @description - Generate random comments for the feed
 * @returns {Array<CommentInterface>}
 */
function generateRandomComments(): Array<CommentInterface> {
  // const comments: AltCommentType[] = []
  const comments: Array<CommentInterface> = []
  for (let i = 0; i < Math.floor(Math.random() * demoContent.profile.length) + 1; i++) {
    const comment: CommentInterface = {
      uid: `${i + 1}`,
      username: `${demoUsernames[i]}`,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
    comments.push(comment)
  }
  return comments;
}

/**
 * @description - Generate random posts for the feed
 * @returns {FeedPostType[]}
 */
function generateRandomFeedProps(): FeedPostType[] {
  const posts: FeedPostType[] = [];
  for (let i = 0; i < demoContent.images.length; i++) {
    const post: FeedPostType = {
      uid: `${i + 1}`,
      username: `${demoUsernames[i]}`,
      pid: `${i + 1}`,
      postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      likes: [`${i + 1}`],
      isPrivate: false,
      // numberLikes: Math.floor(Math.random() * 100),
      // numberComments: Math.floor(Math.random() * 10),
      comments: generateRandomComments(),
      classification: {
        classifications: [
          {
            className: "asdadsas, adsasdasd, asdasdasd",
            probability: 0.32,
          }
        ],
        viewCount: 0,
        isLiked: true,
        isCommentedOn: true
      },
      timestamp: serverTimestamp(),
      imageUrl: demoContent.images[Math.floor(Math.random() * demoContent.profile.length)]
    }
    posts.push(post)
  }
  return posts
}

/**
 * @description - Get the post data by user id and post id from the feed
 * @param {string|undefined} userId - The user id of the user
 * @param {string|undefined} postId  - The post id of the post
 * @returns {FeedPostType}
 */
function getPostData(userId: string | undefined, postId: string | undefined): FeedPostType {
  if (userId === undefined || postId === undefined) {
    userId = '1';
    postId = '1';
  }
  return totalFeedPosts.filter(post => post.uid === userId && post.pid === postId)[0]
}

function getProfileData(userId: string | undefined): ProfileInterface {
  if (userId === undefined) {
    userId = '1'
  }
  return totalDemoUsers.filter(profile => profile.uid === userId)[0];
}

const totalDemoUsers: ProfileInterface[] = generateRandomUsers();
const totalFeedPosts: FeedPostInterface[] = generateRandomFeedProps();

export {
  totalDemoUsers,
  totalFeedPosts,
  demoFeedImages,
  generateRandomFeedProps,
  generateRandomUsers,
  getPostData,
  getProfileData
}
