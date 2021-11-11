import { CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";
import { storySize } from "../../constants";
import Story from "../common/Story";
import ProfilePosts from "../common/ProfilePosts";

function ProfileDetails() {
  const { data: session } = useSession();
  const stories = useSelector((state) => state.posts.stories);
  return (
    <div className="g">
      <div className="flex mt-2 md:mt-8">
        <div className="w-1/3  flex justify-center">
          <img
            className={`rounded-full cursor-pointer w-40 h-40 object-cover`}
            src="/images/ney.jpg"
            alt="xyz"
          />
        </div>
        <div className="w-2/3 lg:w-1/3">
          <Details />
        </div>
      </div>
      {/* stories */}
      <div className="flex p-6 space-x-8 mx-7 overflow-x-auto scrollbar-hide">
        {stories
          ?.filter((item, idx) => idx < 10)
          .map((profile) => (
            <Story
              size={storySize.XL}
              key={profile.id}
              img={profile.avatar}
              username={profile.username}
              titleStyle="text-center mt-3 font-semibold text-sm"
              storyStyle="rounded-full border border-gray-300 p-[2.5px] cursor-pointer object-contain"
            />
          ))}
      </div>

      <hr className="mt-6 mb-8"></hr>
      {/* posts */}
      <ProfilePosts />
    </div>
  );
}

export default ProfileDetails;

function Details() {
  const { data: session } = useSession();
  return (
    <>
      <div className="g">
        <div className="flex items-center">
          <p className="text-2xl font-thin">{session?.user?.username}</p>
          <button className="text-sm ml-4 mr-2 font-semibold px-2 py-1 border border-gray-400 rounded-sm">
            Edit Profile
          </button>
          <CogIcon className="h-8 cursor-pointer" />
        </div>
        <div className="flex justify-between my-3">
          <p className="">
            <span className="font-bold">89</span> posts
          </p>
          <p className="">
            <span className="font-bold">89</span> followers
          </p>
          <p className="">
            <span className="font-bold">89</span> following
          </p>
        </div>

        {/* bio */}
        <div className="flex flex-col mb-14">
          <p className="font-semibold">{session?.user?.username}</p>
          <p className="text-gray-600">asfdlidsifhds</p>
          <p className="text-gray-600">asfdlidsifhds</p>
          <p className="text-gray-600">asfdlidsifhds</p>
        </div>
      </div>
    </>
  );
}

// export default Details
