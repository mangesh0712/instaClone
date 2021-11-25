import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/solid";
import router from "next/router";
import { db } from "../../firebase";
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
  where,
} from "@firebase/firestore";
import { useSelector } from "react-redux";

function PostIcons({ postId, uid, caption, userName, showCaption }) {
  const [likes, setLikes] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, postId]
  );

  useEffect(() => {
    if (uid) {
      return onSnapshot(
        collection(db, "users", loggedInUser.uid, "saved"),
        (snapshot) => {
          setSaved(snapshot.docs);
        }
      );
    }
  }, [db, loggedInUser.uid]);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.data().author === loggedInUser.uid) !==
          -1
      ),
    [likes]
  );

  useEffect(
    () =>
      setHasSaved(
        saved.findIndex((savedPost) => savedPost.data().postId === postId) !==
          -1
      ),
    [saved, postId]
  );

  /// Like Post
  const likePost = async () => {
    if (hasLiked) {
      const q = query(
        collection(db, "posts", postId, "likes"),
        where("author", "==", loggedInUser?.uid)
      );
      ///find the doc with userssUId
      const snapShot = await getDocs(q);
      /// delete the doc with id
      await deleteDoc(doc(db, "posts", postId, "likes", snapShot.docs[0].id));
    } else {
      await addDoc(collection(db, "posts", postId, "likes"), {
        timestamp: serverTimestamp(),
        username: loggedInUser?.username,
        author: loggedInUser?.uid,
      });
    }
  };

  /// Save Post
  const savePost = async () => {
    if (hasSaved) {
      const q = query(
        collection(db, "users", loggedInUser.uid, "saved"),
        where("postId", "==", postId)
      );
      ///find the doc with postId
      const snapShot = await getDocs(q);
      /// delete the doc with id
      await deleteDoc(
        doc(db, "users", loggedInUser.uid, "saved", snapShot.docs[0].id)
      );
    } else {
      await addDoc(collection(db, "users", loggedInUser?.uid, "saved"), {
        postId: postId,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <>
      <div className="flex justify-between pt-4 px-4">
        <div className="flex items-center space-x-2">
          {hasLiked ? (
            <HeartIconFilled className="btn text-red-500" onClick={likePost} />
          ) : (
            <HeartIcon onClick={() => likePost()} className="btn" />
          )}
          <ChatIcon
            className="btn"
            onClick={() => router.push(`/post/${postId}`)}
          />
          <PaperAirplaneIcon className="btn" />
        </div>
        {hasSaved ? (
          <BookmarkIconFilled className="btn text-black" onClick={savePost} />
        ) : (
          <BookmarkIcon className="btn" onClick={() => savePost()} />
        )}
      </div>

      {/* captions */}
      {showCaption ? (
        <p className="px-5 pt-2 pb-4 truncate text-sm">
          {likes.length > 0 && (
            <p className="font-semibold mb-1">{likes.length} likes</p>
          )}
          <>
            <span
              className="font-semibold mr-1 cursor-pointer"
              onClick={() => router.push(`/${uid}`)}>
              {userName}
            </span>
            {caption}
          </>
        </p>
      ) : (
        <>
          <p className="px-5 truncate text-sm">
            {likes.length > 0 && (
              <p className="font-semibold mb-1">{likes.length} likes</p>
            )}
          </p>
        </>
      )}
    </>
  );
}

export default PostIcons;
