// import { EmojiHappyIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import PostProfile from "../feed/PostProfile";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import PostIcons from "../common/PostIcons";
import Moment from "react-moment";
import Link from "next/link";
import router from "next/router";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { useVisibility } from "../../Hooks/useVisibility";
import PopUp from "../common/PopUp";
import EmojiMart from "../common/EmojiMart";
import { useSelector } from "react-redux";

function Sidebar({ selectedPost }) {
  const [emojiMart, toggleEmojiMart] = useVisibility();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", selectedPost.postId, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        console.log(snapshot.docs, "docs");
        setComments(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db, selectedPost.postId]);

  /// add comment
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", selectedPost.postId, "comments"), {
      comment: commentToSend,
      username: loggedInUser.username,
      userImage: loggedInUser.userImage,
      timestamp: serverTimestamp(),
    });
  };

  const handleEmoji = (emoji) => {
    setComment(comment + emoji.native);
  };

  return (
    <div className="flex flex-col">
      <PostProfile selectedPost={selectedPost} />

      {/* /// comments and caption */}
      <div className="flex-grow max-h-[380px] overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* caption */}
        {selectedPost?.caption && (
          <Comment
            userImage={selectedPost?.userImage}
            username={selectedPost.username}
            uid={selectedPost?.uid}
            timestamp={selectedPost?.timestamp}
            comment={selectedPost?.caption}
          />
        )}
        {/* comments */}
        {comments?.length > 0 &&
          comments?.map((comment) => (
            <Comment
              userImage={comment?.data().userImage}
              username={comment.data().username}
              uid={comment?.data().uid}
              timestamp={comment?.data().timestamp}
              comment={comment?.data().comment}
            />
          ))}
      </div>
      <hr />

      {/* Buttons  */}
      <PostIcons
        postId={selectedPost.postId}
        uid={selectedPost.uid}
        userName={selectedPost.username}
        caption={selectedPost.caption}
        showCaption={false}
        loggedInUser={loggedInUser}
      />
      {/* ///FIXME: reload bug */}
      {selectedPost?.timestamp ? (
        <Moment
          className="pl-5 text-gray-400 my-2 text-xs font-thin uppercase"
          fromNow>
          {selectedPost?.timestamp.toDate()}
        </Moment>
      ) : (
        ""
      )}

      {/* /// add comment input  */}
      <hr />
      <form className="flex items-center px-4 py-2 relative">
        <EmojiHappyIcon
          className="h-6"
          onClick={(e) => {
            toggleEmojiMart(e);
          }}
        />

        {emojiMart && (
          <>
            <PopUp className="commentInput shadow bottom-12 left-1 z-20 bg-white">
              <div className="w-4 h-4 absolute z-0 bg-white bottom-[-9px] left-4 rotate-45  border-r border-b border-gray-300"></div>
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
    </div>
  );
}

export default Sidebar;

function Comment({ userImage, uid, username, comment, timestamp }) {
  return (
    <>
      <div className="flex px-3 pt-3 pb-1">
        <img
          src={userImage}
          alt="imge"
          className="h-8 w-8 object-cover hover:cursor-pointer rounded-full mr-3"
        />
        <div className="flex-grow flex ">
          <div className="">
            <span
              className="text-sm font-semibold cursor-pointer hover:underline"
              onClick={() => router.push(`/${uid}`)}>
              {username}
            </span>
            <span className="ml-1 text-gray-500 text-sm">{comment}</span>
          </div>
        </div>
      </div>
      {/* ///FIXME: reload bug */}
      <Moment
        className="pl-14 self-start text-gray-400 text-xs font-thin uppercase"
        style={{ fontSize: "10px" }}
        fromNow>
        {timestamp?.toDate()}
      </Moment>
    </>
  );
}
