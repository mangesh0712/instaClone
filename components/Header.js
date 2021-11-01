import Image from "next/image";

import {
  SearchIcon,
  HeartIcon,
  MenuIcon,
  UserGroupIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { showPostUploadModal } from "../pages/redux/posts/postActions";
import { useDispatch } from "react-redux";

function Header() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  // inbuild next router
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm z-50 sticky inset-0 ">
      {/* Left  */}
      <div className="flex items-center justify-between max-w-6xl xl:mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid h-10 w-24 cursor-pointer"
        >
          <Image
            className="h-24 w-24"
            layout="fill"
            objectFit="contain"
            src="https://links.papareact.com/ocw"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-10 h-10  lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            layout="fill"
            objectFit="contain"
            src="https://links.papareact.com/jjm"
          />
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="block  w-full  pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black  rounded-md "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right  */}
        <div className="flex items-center space-x-4 justify-end">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45 z-50" />
                <div className="absolute text-xs -top-1 -right-2 bg-red-400 rounded-full animate-bounce w-5 h-5 flex items-center  justify-center text-white">
                  3
                </div>
              </div>
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <PlusCircleIcon
                onClick={() => dispatch(showPostUploadModal(true))}
                className="navBtn"
              />
              <img
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                alt="profile pic"
                src={session?.user?.image}
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button className="f" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
