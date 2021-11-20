import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "../common/Modal";
import { EmojiHappyIcon, XIcon } from "@heroicons/react/outline";
import MiniProfile from "../feed/MiniProfile";

// import SearchLocationInput from "./common/SearchLocattionInput";

function EditPostModal({
  show,
  close,
  userDetails,
  updatePost,
  postId,
  caption,
}) {
  const captionRef = useRef(null);

  return (
    <Modal showModal={show} onClose={close} bgColor="bg-black">
      <div className="modalContainer">
        <div className="flex items-center py-4 px-2 border-b border-gray-200">
          <Dialog.Title className="title text-center font-semibold text-lg flex-grow">
            Edit Post
          </Dialog.Title>
          <XIcon
            className="h-6 hover:bg-gray-100 cursor-pointer"
            onClick={close}
          />
        </div>
        <MiniProfile
          userDetails={userDetails}
          shoLogOut={false}
          containerClass="ml-2 my-3"
        />
        <div className="flex">
          <div className="w-11/12 relative">
            <textarea
              ref={captionRef}
              rows="3"
              defaultValue={caption}
              className="border-none focus:ring-0 w-full text-lg font-mono text-left scrollbar-hide"
              placeholder="Please enter  caption..."></textarea>
          </div>
          <div className="mt-2 w-1/12 r">
            {/* /// FIXME: add emoji cart here  */}
            <EmojiHappyIcon
              className="h-6"
              //   onClick={(e) => {
              //     toggleEmojiMart(e);
              //   }}
            />
            {/* 
                  {emojiMart && (
                    <PopUp className="commentInput absolute z-50">
                      <EmojiMart handleEmoji={handleEmoji} />
                    </PopUp>
                  )} */}
          </div>
        </div>
        <div className="mt-3 mx-3 sm:mx-0 sm:mt-4 p-2">
          <button
            onClick={() => {
              updatePost(postId, {
                caption: captionRef.current.value,
              });
              close();
            }}
            // disabled={!selectedFile}
            className="modalActionButton">
            {/* {!loading ? " Upload Post" : "Uploading..."} */}
            Edit Post
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditPostModal;
