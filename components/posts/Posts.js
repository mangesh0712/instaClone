import { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { setAllPosts } from "../../pages/redux/posts/postActions";
import { useDispatch } from "react-redux";

function Posts() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
        dispatch(setAllPosts(snapshot.docs));
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
