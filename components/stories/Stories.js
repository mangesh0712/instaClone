import { useEffect, useState } from "react";
import faker from "faker";
import Story from "../common/Story";
import { useSession } from "next-auth/react";
import { storySize } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../redux/posts/postActions";
import StoriesSkeleton from "./skeleton/StoriesSkeleton";

function Stories({ userDetails }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const stories = useSelector((state) => state.posts.stories);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    dispatch(getStories(suggestions ? suggestions : []));
  }, []);

  return (
    <>
      {!userDetails.userImage ? (
        <StoriesSkeleton />
      ) : (
        <div className="storyContainer overflow-x-scroll scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          {session && (
            <Story
              img={userDetails.userImage}
              key={userDetails.uid}
              size={storySize.LARGE}
              username={userDetails.username}
              titleStyle="text-xs text-center"
              storyStyle="rounded-full border-2 border-red-400 p-[1.5px] cursor-pointer hover:scale-110 transition-all ease-out object-contain"
            />
          )}
          {stories?.map((profile) => (
            <Story
              size={storySize.LARGE}
              key={profile.id}
              img={profile.avatar}
              username={profile.username}
              titleStyle="text-xs text-center"
              storyStyle="rounded-full border-2 border-red-400 p-[1.5px] cursor-pointer hover:scale-110 transition-all ease-out object-contain"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Stories;
