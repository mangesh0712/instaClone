import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import ProfilePost from "../profilePost/ProfilePost";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { setUsersPosts } from "../../pages/redux/posts/postActions";

function ProfilePosts() {
  const usersUid = useSelector((state) => state.auth.user.uid);
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersUid) {
      const unsubscribe = onSnapshot(
        query(collection(db, "posts"), where("auther", "==", usersUid)),
        (snapshot) => {
          setPosts(snapshot.docs);
          dispatch(setUsersPosts(snapshot.docs));
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [db, usersUid]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {posts?.map((post) => (
          <ProfilePost key={post.id} id={post.id} img={post.data().image} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePosts;
