import React from "react";
import {
  BookmarkIcon,
  CogIcon,
  SwitchHorizontalIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeUser } from "./redux/auth/actions";
import { useSelector } from "react-redux";

function ProfileDropdown() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.user.uid);
  const onSignOut = () => {
    dispatch(removeUser());
    signOut({
      callbackUrl: "http://localhost:3000/auth/signin",
    });
  };

  return (
    <div className="relative  z-50 h-[203px] w-60 bg-white rounded-md shadow">
      <div className="flex flex-col justify-center text-gray-800">
        <ProfIcon title="Profile" Icon={UserCircleIcon} path={`/${uid}`} />
        <ProfIcon title="Saved" Icon={BookmarkIcon} />
        <ProfIcon title="Settings" Icon={CogIcon} />
        <ProfIcon title="Switch Accounts" Icon={SwitchHorizontalIcon} />
        <span className=" border-b-2 border-gray-300"></span>
        <div
          onClick={onSignOut}
          className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50">
          <p className="ml-3">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;

function ProfIcon({ title, Icon, path }) {
  return (
    <Link href={path ? path : ""}>
      <div className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-50">
        {Icon && <Icon className="profileIcon" />}
        <p className="ml-3">{title}</p>
      </div>
    </Link>
  );
}
