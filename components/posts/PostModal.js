import React from "react";
import Modal from "../common/Modal";
import { useVisibility } from "../../Hooks/useVisibility";
import { Dialog } from "@headlessui/react";
import EditPostModal from "./EditPostModal";

function PostModal({
  showModal,
  onClose,
  ownPost,
  deletePost,
  updatePost,
  changeProfilePic,
  toggleModal1,
  image,
  setAcivatedPostId,
  userDetails,
  caption,
  postId,
}) {
  const [showDelete, toggleDelete, closeDelete, openDelete] = useVisibility();
  const [showEdit, toggleEdit, closeEdit, openEdit] = useVisibility();

  const handleSetPP = () => {
    onClose();
    changeProfilePic(image);
  };

  const handleDeleteOption = () => {
    //close first modal
    toggleModal1();
    ///open delete comfermation modal
    openDelete();
  };

  return (
    <>
      <Modal showModal={showModal} onClose={onClose} bgColor="bg-black">
        <div className="modalContainer">
          <div className="flex flex-col justify-center">
            {ownPost && (
              <>
                <div
                  className="modalItemContainer text-red-500 font-bold"
                  onClick={handleDeleteOption}>
                  <p>Delete</p>
                </div>

                <div
                  className="modalItemContainer"
                  onClick={() => {
                    setAcivatedPostId(userDetails.postId),
                      onClose(),
                      openEdit();
                  }}>
                  <p>Edit</p>
                </div>
                <div className="modalItemContainer" onClick={handleSetPP}>
                  <p>Set as Profile Pic</p>
                </div>
              </>
            )}
            {!ownPost && (
              <div className="modalItemContainer text-red-500 font-bold">
                <p>Follow</p>
              </div>
            )}
            <div className="modalItemContainer">
              <p>Go To Post</p>
            </div>
            <div className="modalItemContainer">
              <p>Share To</p>
            </div>
            <div className="modalItemContainer" onClick={onClose}>
              <p>Cancel</p>
            </div>
          </div>
        </div>
      </Modal>
      {/* /// Delete comfirmation modal  */}
      <Modal showModal={showDelete} onClose={closeDelete} bgColor="bg-black">
        <div className="modalContainer">
          <div className="flex flex-col items-center pb-7 border-b border-gray-200">
            <Dialog.Title className="title mt-5 font-semibold text-lg">
              Delete Post?
            </Dialog.Title>

            <p className="text-sm text-gray-400">
              Are you sure you want to delete this post
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div
              className="modalItemContainer text-red-500 font-bold "
              onClick={() => {
                deletePost(userDetails.postId), close();
              }}>
              <p>Delete</p>
            </div>
            <div className="modalItemContainer" onClick={close}>
              <p>Cancel</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* /// Edit modal  */}
      <EditPostModal
        show={showEdit}
        close={closeEdit}
        userDetails={userDetails}
        postId={postId}
        caption={caption}
        updatePost={updatePost}
      />
    </>
  );
}

export default PostModal;
