import React from "react";
import { useVisibility } from "../../Hooks/useVisibility";
import PostModal from "./PostModal";
import Link from "next/link";

function PostHead({
  userImage,
  userName,
  Icon,
  ownPost,
  image,
  changeProfilePic,
  deletePost,
  caption,
  updatePost,
  postId,
  usersUid,
  setAcivatedPostId,
  author,
  postedTime,
}) {
  const [show, toggle, close, open] = useVisibility();
  console.log(postedTime, "postedTime");

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
            <Link href={`/${author}`}>{userName}</Link>
          </div>
          <div className="flex-grow" />
        </div>
        <Icon className="h-5 cursor-pointer" onClick={open} />
      </div>
      <PostModal
        showModal={show}
        onClose={close}
        toggleModal1={toggle}
        ownPost={ownPost}
        changeProfilePic={changeProfilePic}
        deletePost={deletePost}
        updatePost={updatePost}
        image={image}
        setAcivatedPostId={setAcivatedPostId}
        caption={caption}
        postId={postId}
        userDetails={{
          username: userName,
          uid: author,
          userImage,
          postId,
          timestamp: postedTime,
        }}
      />
    </>
  );
}

export default PostHead;
