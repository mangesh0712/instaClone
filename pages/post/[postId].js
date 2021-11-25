import React from "react";
import { useSelector } from "react-redux";
import DetailedPost from "../../components/detailedPost/detailedpost";

function detailedPost() {
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  return (
    <div>
      <DetailedPost selectedPost={selectedPost} />
    </div>
  );
}

export default detailedPost;
