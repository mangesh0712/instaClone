import { POST_ACTION } from "./postActionTypes";

export const showPostUploadModal = (val) => {
  return {
    type: POST_ACTION.SHOW_POST_UPLOAD_MODAL,
    payload: val,
  };
};
