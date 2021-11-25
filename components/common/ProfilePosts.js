import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import ProfilePost from "../profile/ProfilePost";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { setUsersPosts } from "../redux/posts/postActions";

function ProfilePosts({ uid, postId }) {
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      const unsubscribe = onSnapshot(
        query(collection(db, "posts"), where("auther", "==", uid)),
        (snapshot) => {
          const posts = postId
            ? snapshot.docs.filter((post) => post.id !== postId)
            : // .filter((item, idx) => idx < 3)
              snapshot.docs;
          setPosts(posts);
          console.log(posts[0].data(), "posts");
          dispatch(setUsersPosts(snapshot.docs));
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [db, uid]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {posts?.map((post) => (
          <ProfilePost key={post.id} postId={post.id} img={post.data().image} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePosts;
