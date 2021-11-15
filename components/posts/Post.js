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
  setDoc,
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
import { useSelector } from "react-redux";

function Post({ id, img, userName, userImage, caption, usersUid }) {
  // const usersUid = useSelector((state) => state.auth.user.uid);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const { data: session } = useSession();
  const [emojiMart, toggleEmojiMart] = useVisibility();

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

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(() => {
    if (usersUid) {
      return onSnapshot(
        collection(db, "users", usersUid, "saved"),
        (snapshot) => {
          setSaved(snapshot.docs);
        }
      );
    }
  }, [db, usersUid]);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.data().author === usersUid) !== -1
      ),
    [likes]
  );

  useEffect(
    () =>
      setHasSaved(
        saved.findIndex((savedPost) => savedPost.data().postId === id) !== -1
      ),
    [saved, id]
  );

  /// Like Post
  const likePost = async () => {
    if (hasLiked) {
      const q = query(
        collection(db, "posts", id, "likes"),
        where("author", "==", usersUid)
      );
      ///find the doc with userssUId
      const snapShot = await getDocs(q);
      /// delete the doc with id
      await deleteDoc(doc(db, "posts", id, "likes", snapShot.docs[0].id));
    } else {
      await addDoc(collection(db, "posts", id, "likes"), {
        timeStamp: serverTimestamp(),
        username: session.user.username,
        author: usersUid,
      });
    }
  };

  /// Save Post
  const savePost = async () => {
    if (hasSaved) {
      const q = query(
        collection(db, "users", usersUid, "saved"),
        where("postId", "==", id)
      );
      ///find the doc with postId
      const snapShot = await getDocs(q);
      /// delete the doc with id
      await deleteDoc(doc(db, "users", usersUid, "saved", snapShot.docs[0].id));
    } else {
      await addDoc(collection(db, "users", usersUid, "saved"), {
        postId: id,
        timeStamp: serverTimestamp(),
      });
    }
  };

  /// add comment
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const handleEmoji = (emoji) => {
    setComment(comment + emoji.native);
  };

  return (
    <div className="my-7 bg-white border border-gray-200 shadow-sm rounded-sm relative">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImage}
          alt="imge"
          className="h-10 object-cover rounded-full w-10 border mr-3 p-[1.5px]"
        />
        <p className="flex-grow font-bold">{userName}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Img */}
      <img src={img} className="object-cover w-full" alt="" />

      {/* buttons */}
      {session && (
        <div className="flex justify-between pt-4 px-4">
          <div className="flex items-center space-x-2">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon onClick={() => likePost()} className="btn" />
            )}
            <ChatIcon className="btn" onClick={() => router.push("/")} />
            <PaperAirplaneIcon className="btn" />
          </div>
          {hasSaved ? (
            <BookmarkIconFilled className="btn text-black" onClick={savePost} />
          ) : (
            <BookmarkIcon className="btn" onClick={() => savePost()} />
          )}
        </div>
      )}

      {/* captions */}
      <p className="px-5 pt-2 pb-4 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{userName}</span>
        {caption}
      </p>

      {/* comments */}

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-track-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt="img"
                className="h-7 rounded-full"
              />
              <div className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username}</span>
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

      {/* In box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" onClick={toggleEmojiMart} />
          {/* {activePostId === postId && emojiMart && ( */}
          {emojiMart && (
            <PopUp className="commentInput">
              <EmojiMart handleEmoji={handleEmoji} />
            </PopUp>
          )}
          <input
            value={comment}
            type="text"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment ..."
            className="border-none focus:ring-0 outline-none flex-1"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
