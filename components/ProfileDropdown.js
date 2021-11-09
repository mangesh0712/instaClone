import React from "react";
import {
  BookmarkIcon,
  CogIcon,
  SwitchHorizontalIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function ProfileDropdown() {
  return (
    <div className="relative  z-50 h-[203    px] w-60 bg-white rounded-md shadow-md">
      <div className="flex flex-col justify-center text-gray-600">
        <ProfIcon title="Profile" Icon={UserCircleIcon} path="auth/signin" />
        <ProfIcon title="Saved" Icon={BookmarkIcon} />
        <ProfIcon title="Settings" Icon={CogIcon} />
        <ProfIcon title="Switch Accounts" Icon={SwitchHorizontalIcon} />
        <span className=" border-b-2 border-gray-300"></span>
        <ProfIcon title="Log Out" />
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
