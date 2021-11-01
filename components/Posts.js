import { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <div className="">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.data().userName}
          userImage={post.data().profileImg}
          caption={post.data().caption}
          img={post.data().image}
        />
      ))}
    </div>
  );
}

export default Posts;
