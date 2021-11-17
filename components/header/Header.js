import Image from "next/image";

import {
  SearchIcon,
  HeartIcon,
  MenuIcon,
  UserGroupIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import Skeleton from "react-loading-skeleton";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { showPostUploadModal } from "../../pages/redux/posts/postActions";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "../ProfileDropdown";
import { useVisibility } from "../../Hooks/useVisibility";
import IconWrapper from "../common/IconWrapper";

function Header() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  // inbuild next router
  const router = useRouter();
  const [show, toggleShow, close] = useVisibility();
  const userImage = useSelector((state) => state.auth.user.userImage);

  return (
    <div className="bg-white shadow-sm z-10 sticky inset-0 ">
      {/* Left  */}
      <div className="flex items-center justify-between sm:max-w-xl md:max-w-[610px] lg:max-w-[920px] mx-auto px-2 sm:px-0">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid h-10 w-24 cursor-pointer">
          <Image
            className="h-24 w-24"
            layout="fill"
            objectFit="contain"
            src="https://links.papareact.com/ocw"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-10 h-10  lg:hidden flex-shrink-0 cursor-pointer">
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
        <div className="flex items-center space-x-1 md:space-x-4 justify-end relative">
          <IconWrapper path="/" label="Home" showTootlip={false}>
            <HomeIcon className="navBtn" />
          </IconWrapper>
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
              <IconWrapper
                path="/profile"
                label=""
                showTootlip={false}
                notifications={true}>
                <PaperAirplaneIcon className="navBtn rotate-45" />
              </IconWrapper>

              <IconWrapper path="/u" label="" showTootlip={false}>
                <UserGroupIcon className="navBtn" />
              </IconWrapper>

              <IconWrapper path="/h" label="" showTootlip={false}>
                <HeartIcon className="navBtn" />
              </IconWrapper>

              <PlusCircleIcon
                onClick={() => dispatch(showPostUploadModal(true))}
                className="navBtn"
              />
              {!userImage ? (
                <Skeleton height={40} width={40} circle={true} />
              ) : (
                <img
                  // onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  onClick={toggleShow}
                  alt="profile pic"
                  src={userImage}
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
              )}
            </>
          ) : (
            <button className="f" onClick={signIn}>
              Sign In
            </button>
          )}
          <div
            className="absolute top-[52px] border-t border-gray-200 -right-10"
            hidden={!show}>
            <div className="h-4 w-4 absolute z-0 shadow-md border-t border-gray-200 bg-white rotate-45  -top-2 right-12"></div>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
