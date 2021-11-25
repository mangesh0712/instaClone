import { collection, getDocs, query } from "@firebase/firestore";
import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useVisibility } from "../../Hooks/useVisibility";

function ProfilePost({ postId, img }) {
  const [show, toggle, close, open] = useVisibility();
  const [likesCount, setLikesCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);

  useEffect(async () => {
    const q = query(collection(db, "posts", postId, "likes"));
    ///get likes array for perticular post
    const likes = await getDocs(q);
    setLikesCount(likes.docs.length);
  }, [db, postId]);

  useEffect(async () => {
    const q = query(collection(db, "posts", postId, "comments"));
    ///get comments array for perticular post
    const comments = await getDocs(q);
    setCommentsCount(comments.docs.length);
  }, [db, postId]);

  return (
    <>
      <div className=" relative z-10" onMouseOver={open} onMouseLeave={close}>
        <div className="filter hover:brightness-50 hover:bg-black hover:bg-opacity-20">
          <img src={img} alt="p" className="lg:w-78 lg:h-72 object-cover" />
        </div>
        {show && (
          <div className="absolute flex items-center justify-center top-32 left-28 z-20">
            <div className="flex items-center">
              <ChatIcon className="h-5 text-white" />
              <span className="text-white ml-1">{commentsCount}</span>
            </div>
            <div className="flex items-center ml-8">
              <HeartIcon className="h-5 text-white" />
              <span className="text-white ml-1"> {likesCount}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePost;
