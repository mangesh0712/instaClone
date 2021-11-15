import { useSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";
import { storySize } from "../../constants";
import Story from "../common/Story";
import ProfilePosts from "../common/ProfilePosts";
import Details from "./Details";

function ProfileDetails() {
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
        <div className="w-2/3 lg:w-3/3">
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
