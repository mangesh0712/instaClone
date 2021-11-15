import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { db, storage } from "../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { showPostUploadModal } from "../pages/redux/posts/postActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./common/Modal";

function UploadPostModal() {
  const { data: session } = useSession();
  const uid = useSelector((state) => state.auth.user.uid);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.posts.showModal);

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
      profileImg: session.user.image,
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

  return (
    <Modal showModal={showModal} onClose={onClose} bgColor="bg-black">
      <div className="inline-block  pt5 pb-4  sm:my-8 overflow-hidden text-left align-bottom sm:align-middle transition-all transform bg-white shadow-xl rounded-lg sm:p-6 sm:max-w-sm sm:w-full">
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
              onClick={() => filePickerRef.current.click()}
            >
              <CameraIcon className="h-6 w-6 text-red-600" />
            </div>
          )}

          <div>
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

              <div className="mt-2">
                <input
                  ref={captionRef}
                  type="text"
                  className="border-none focus:ring-0 w-full text-center"
                  placeholder="Please enter a caption..."
                />
              </div>
            </div>
          </div>
          <div className="mt-5 mx-3 sm:mx-0 sm:mt-6">
            <button
              disabled={!selectedFile}
              className="inline-flex justify-center bg-red-600 px-4 py-2 text-base font-medium w-full rounded-md text-white shadow-sm border-transparent border focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-300"
              onClick={uploadPost}
            >
              {!loading ? " Upload Post" : "Uploading..."}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UploadPostModal;
