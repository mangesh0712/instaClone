import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Moment from "react-moment";
import router from "next/router";
import PopUp from "../common/PopUp";
import EmojiMart from "../common/EmojiMart";
import { useVisibility } from "../../Hooks/useVisibility";
import PostHead from "./PostHead";
import { addUser } from "../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import PostIcons from "../common/PostIcons";

function Post({
  id,
  img,
  userName,
  userImage,
  caption,
  usersUid,
  ownPost,
  author,
  acivatedPostId,
  setAcivatedPostId,
  postedTime,
}) {
  // const usersUid = useSelector((state) => state.auth.user.uid);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();
  const loggedInUser = useSelector((state) => state.auth.user);
  const [emojiMart, toggleEmojiMart] = useVisibility();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db, id]);

  /// add comment
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: loggedInUser.username,
      userImage: loggedInUser.userImage,
      timestamp: serverTimestamp(),
      author: loggedInUser.uid,
    });
  };

  const handleEmoji = (emoji) => {
    setComment(comment + emoji.native);
  };

  const changeProfilePic = async (img_url) => {
    await updateDoc(doc(db, "users", usersUid), "userImage", img_url);
    // / pp updated users posts
    const posts = await getDocs(
      query(collection(db, "posts"), where("auther", "==", author))
    );

    // TODO: add promise all here
    posts.docs.map(async (post) => {
      await updateDoc(doc(db, "posts", post.id), "profileImg", img_url);
    });
    dispatch(addUser({ userImage: img_url }));
  };

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const updatePost = async (postId, updatedObject) => {
    await updateDoc(doc(db, "posts", postId), updatedObject);
  };

  return (
    <div className="postContainer relative">
      {/* Header */}
      <PostHead
        userImage={userImage}
        userName={userName}
        usersUid={usersUid}
        Icon={DotsHorizontalIcon}
        ownPost={ownPost}
        changeProfilePic={changeProfilePic}
        deletePost={deletePost}
        updatePost={updatePost}
        image={img}
        postId={id}
        setAcivatedPostId={setAcivatedPostId}
        caption={caption}
        author={author}
        postedTime={postedTime}
      />
      {/* Img */}
      <img
        src={img}
        className="h-[680px] w-[611px] sm:h-[680px] sm:w-[611px] object-cover"
        alt=""
      />

      {/* buttons */}
      {session && (
        <PostIcons
          postId={id}
          uid={usersUid}
          userName={userName}
          caption={caption}
          loggedInUser={loggedInUser}
          showCaption={true}
        />
      )}

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-5 h-16 overflow-y-scroll  scrollbar-track-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-1">
              {/* <img
                src={comment.data().userImage}
                alt="img"
                className="h-7 w-7 rounded-full"
              /> */}
              <div className="flex-1 text-sm">
                <span className="font-semibold">{comment.data().username}</span>
                {"   "}
                <span className="">{comment.data().comment}</span>
              </div>
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* //timeStamp */}
      <Moment className="pl-5 text-xs font-thin uppercase" fromNow>
        {postedTime?.toDate()}
      </Moment>
      {/* In box */}
      {session && (
        <>
          <hr className="mt-2" />
          <form className="flex items-center px-4 py-2">
            <EmojiHappyIcon
              className="h-6"
              onClick={(e) => {
                toggleEmojiMart(e);
                setAcivatedPostId(id);
              }}
            />

            {acivatedPostId === id && emojiMart && (
              <>
                <PopUp className="commentInput shadow bottom-12 left-1 z-20 bg-white">
                  <div className="w-4 h-4 absolute z-0 bg-white bottom-[-8px] left-5 rotate-45  border-r border-b border-gray-300"></div>
                  <EmojiMart handleEmoji={handleEmoji} />
                </PopUp>
              </>
            )}
            <input
              value={comment}
              type="text"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment ..."
              className="border-none focus:ring-0 text-sm outline-none flex-1"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-sm text-blue-400 disabled:opacity-60">
              Post
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Post;
