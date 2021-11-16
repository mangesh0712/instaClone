import React from "react";

function PostHead({ userImage, userName, Icon }) {
  return (
    <>
      <div className="flex items-center px-5 py-3">
        <img
          src={userImage}
          alt="imge"
          className="h-8 object-cover rounded-full w-8 border mr-3 p-[1.5px]"
        />
        <p className="flex-grow  text-sm font-semibold">{userName}</p>
        <Icon className="h-5 cursor-pointer" />
      </div>
    </>
  );
}

export default PostHead;
