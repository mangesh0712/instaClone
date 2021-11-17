import React from "react";
import { useVisibility } from "../../Hooks/useVisibility";
import PostModal from "./PostModal";

function PostHead({
  userImage,
  userName,
  Icon,
  ownPost,
  image,
  handleChangeProfilePic,
}) {
  const [show, toggle, close, open] = useVisibility();

  return (
    <>
      <div className="flex items-center px-5 py-3">
        <img
          src={userImage}
          alt="imge"
          className="h-8 object-cover hover:cursor-pointer rounded-full w-8 border mr-3 p-[1.5px]"
        />
        <div className="flex-grow flex">
          <div className="text-sm font-semibold cursor-pointer hover:underline">
            {userName}
          </div>
          <div className="flex-grow" />
        </div>
        <Icon className="h-5 cursor-pointer" onClick={open} />
      </div>
      <PostModal
        showModal={show}
        onClose={close}
        ownPost={ownPost}
        handleChangeProfilePic={handleChangeProfilePic}
        image={image}
      />
    </>
  );
}

export default PostHead;
