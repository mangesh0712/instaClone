import React from "react";
import Modal from "../common/Modal";

function PostModal({
  showModal,
  onClose,
  ownPost,
  handleChangeProfilePic,
  image,
}) {
  const handleSetPP = () => {
    onClose();
    handleChangeProfilePic(image);
  };

  return (
    <Modal showModal={showModal} onClose={onClose} bgColor="bg-black">
      <div className="modalContainer">
        <div className="flex flex-col justify-center">
          {ownPost && (
            <>
              <div className="modalItemContainer text-red-500 font-bold">
                <p>Delete</p>
              </div>

              <div className="modalItemContainer">
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
          <div className="modalItemContainer">
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostModal;
