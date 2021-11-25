import React from "react";
import Footer from "../common/Footer";
import ProfilePosts from "../common/ProfilePosts";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

function DetailedPost({ selectedPost }) {
  console.log(selectedPost, "sep");
  const router = useRouter();
  return (
    <div className="max-w-5xl min-w\ mx-auto">
      {/* // Selected Post */}
      <div className="py-7">
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-white border border-gray-300 h-[590px]  sm:max-w-2xl md:max-w-[610px] lg:max-w-[920px] mx-auto px-2 sm:px-0">
          <section className="col-span-2">
            {/* image */}
            <div className="">
              <img
                src={selectedPost?.image}
                alt=""
                className="h-[589px] w-[611px] sm:h-[589px] sm:w-[611px] object-cover"
              />
            </div>
          </section>
          <section className="hidden md:inline-grid col-span-1">
            {/* sideBar*/}
            <Sidebar selectedPost={selectedPost} />
          </section>
        </main>
      </div>

      <div className="border-b border-gray-300 mb-10"></div>

      <p className="mb-5 flex">
        <span className="font-semibold text-sm text-gray-400 mr-1">
          More posts from
        </span>
        {"  "}
        <p
          className="font-semibold text-sm cursor-pointer hover:underlines"
          onClick={() => router.push(`/${selectedPost.uid}`)}>
          {selectedPost.username}
        </p>
      </p>
      {/* posts */}
      <ProfilePosts
        uid={selectedPost.uid}
        postId={selectedPost.postId}
        detailedPostView={true}
      />
      {/* Footer */}
      <Footer
        containerClass="ml-7 mt-8  w-full text-gray-400 opacity-70"
        itemClass="cursor-pointer flex flex-wrap justify-center space-x-3 text-sm"
        bottomClass="text-xs mt-2 font-mono flex justify-center"
      />
    </div>
  );
}

export default DetailedPost;
