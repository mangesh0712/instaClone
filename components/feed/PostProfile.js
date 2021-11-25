import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";
import Link from "next/link";

function PostProfile({ selectedPost }) {
  console.log(selectedPost, "dkfjldskj");
  return (
    <div className="flex items-center px-3 py-3 border-b border-gray-300">
      <img
        src={selectedPost?.userImage}
        alt="img"
        className="h-8 w-8 object-cover hover:cursor-pointer rounded-full mr-3 "
      />
      <div className="flex-grow flex">
        <div className="text-sm font-semibold cursor-pointer hover:underline">
          <Link href={`/${selectedPost?.uid}`}>{selectedPost.username}</Link>
        </div>
        <div className="flex-grow" />
      </div>
      <DotsHorizontalIcon className="h-5 cursor-pointer" />
    </div>
  );
}

export default PostProfile;
