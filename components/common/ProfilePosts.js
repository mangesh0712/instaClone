import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ProfilePosts() {
  const posts = useSelector((state) => state.posts.allPosts);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const unsubscribe = onSnapshot(
  //       query(
  //         collection(db, "posts"),
  //         where("capital", "==", true),
  //         orderBy("timestamp", "desc")
  //       ),
  //       (snapshot) => {
  //         setPosts(snapshot.docs);
  //         dispatch(setUsersPosts(snapshot.docs));
  //       }
  //     );
  //     return () => {
  //       unsubscribe();
  //     };
  //   }, [input]);

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

function ProfilePost({ id, img }) {
  return (
    <div>
      <img src={img} alt="p" className="w-78 h-72 object-cover" />
    </div>
  );
}

// export default ProfilePost
