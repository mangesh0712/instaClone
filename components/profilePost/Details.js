import { CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

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
        <div className="flex  my-3">
          <p className="mr-12">
            <span className="font-bold">89</span> posts
          </p>
          <p className="mr-12">
            <span className="font-bold">89</span> followers
          </p>
          <p className="">
            <span className="font-bold">89</span> following
          </p>
        </div>

        {/* bio */}
        <div className="flex flex-col mb-14">
          <p className="font-semibold">{session?.user?.username}</p>
          <p className="text-gray-600">
            asfdlidsifhds fdslkdfjdksfjldskjf djfdslfkjdskf dshflkdsjlfkjsd
          </p>
          <p className="text-gray-600">asfdlidsifhds</p>
          <p className="text-gray-600">asfdlidsifhds</p>
        </div>
      </div>
    </>
  );
}

export default Details;
