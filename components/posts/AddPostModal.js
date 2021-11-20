import React, { Fragment, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { CameraIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { db, storage } from "../../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { showPostUploadModal } from "../../pages/redux/posts/postActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import { useVisibility } from "../../Hooks/useVisibility";
import PopUp from "../common/PopUp";
import EmojiMart from "../common/EmojiMart";
// import SearchLocationInput from "./common/SearchLocattionInput";

function UploadPostModal() {
  const { data: session } = useSession();
  const uid = useSelector((state) => state.auth.user.uid);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.posts.showModal);
  const userImage = useSelector((state) => state.auth.user.userImage);
  const [emojiMart, toggleEmojiMart] = useVisibility();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    //   1. Create a post and add to firestore 'posts' collectios
    const docRef = await addDoc(collection(db, "posts"), {
      userName: session.user.username,
      caption: captionRef.current.value,
      profileImg: userImage,
      timestamp: serverTimestamp(),
      auther: uid,
    });

    // 2. get the post id from newly created post
    console.log("new doc added by id", docRef.id);

    // 3. upload the image to firebase storage with the post Id
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        // 4. get a download URL from the fb storage and update the orignal post with the image
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    dispatch(showPostUploadModal(false));
    setLoading(false);
    setSelectedFile(null);
  };

  const onClose = (val) => {
    dispatch(showPostUploadModal(val));
  };

  const handleEmoji = (val) => {
    alert(val);
  };

  return (
    <div className="relative">
      <Modal showModal={showModal} onClose={onClose} bgColor="bg-black">
        <div className="modalContainer relative z-20  pt-5 pb-4  sm:my-8 sm:p-6 ">
          <div className="">
            {selectedFile ? (
              <img
                src={selectedFile}
                alt=""
                className=" mx-auto object-contain h-44 w-full"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <div
                className="flex justify-center items-center mx-auto w-16 h-16 bg-red-100 rounded-full cursor-pointer"
                onClick={() => filePickerRef.current.click()}>
                <CameraIcon className="h-6 w-6 text-red-600" />
              </div>
            )}

            <div className="mt-3 text-center sm:mt-6">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
                Upload a photo
              </Dialog.Title>
              <div className="f">
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>
              <div className="flex">
                <div className="mt-2  w-11/12 relative">
                  <textarea
                    ref={captionRef}
                    rows="3"
                    className="border-none focus:ring-0 w-full text-center scrollbar-hide"
                    placeholder="Please enter a caption..."></textarea>
                </div>
                <div className="mt-2 w-1/12 r">
                  <EmojiHappyIcon
                    className="h-6"
                    onClick={(e) => {
                      toggleEmojiMart(e);
                    }}
                  />
                  {/* 
                  {emojiMart && (
                    <PopUp className="commentInput absolute z-50">
                      <EmojiMart handleEmoji={handleEmoji} />
                    </PopUp>
                  )} */}
                </div>
              </div>
              {/* <SearchLocationInput />; */}
            </div>
          </div>
          <div className="mt-5 mx-3 sm:mx-0 sm:mt-6">
            <button
              disabled={!selectedFile}
              className="modalActionButton"
              onClick={uploadPost}>
              {!loading ? " Upload Post" : "Uploading..."}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UploadPostModal;
