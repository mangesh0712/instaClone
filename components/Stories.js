import { useEffect, useState } from "react";
import faker from "faker";
import Story from "./common/Story";
import { useSession } from "next-auth/react";
import { storySize } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../pages/redux/posts/postActions";

function Stories() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.posts.stories);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    dispatch(getStories(suggestions ? suggestions : []));
  }, []);

  return (
    <div className="flex p-6 bg-white mt-8 border border-gray-200 rounded-sm space-x-4 overflow-x-scroll scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      {session && (
        <Story
          img={session?.user?.image}
          key={session?.user?.uid}
          size={storySize.LARGE}
          username={session.user.username}
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
  );
}

export default Stories;
