import React from "react";
import { storySize } from "../../constants";
import Story from "../common/Story";
import ProfilePosts from "../common/ProfilePosts";
import Details from "./Details";
import Footer from "../common/Footer";
import Skeleton from "react-loading-skeleton";

function Profile({ userDetails, stories }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex mt-2 md:mt-8">
        <div className="w-1/3  flex justify-center">
          {!userDetails.userImage ? (
            <Skeleton circle={true} height={160} width={160} />
          ) : (
            <img
              className={`rounded-full cursor-pointer w-40 h-40 object-cover`}
              src={`${userDetails?.userImage}`}
              alt="xyz"
            />
          )}
        </div>
        <div className="w-2/3 lg:w-3/3">
          <Details {...userDetails} />
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

      <hr className="mt-6 mb-8 text"></hr>
      {/* posts */}
      <ProfilePosts uid={userDetails.uid} detailedPostView={false} />
      {/* Footer */}
      <Footer
        containerClass="ml-7 mt-8  w-full text-gray-400 opacity-70"
        itemClass="cursor-pointer flex flex-wrap justify-center space-x-3 text-sm"
        bottomClass="text-xs mt-2 font-mono flex justify-center"
      />
    </div>
  );
}

export default Profile;
