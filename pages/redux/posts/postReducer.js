import { POST_ACTION } from "./postActionTypes";

const initialState = {
  showModal: false,
};

export const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ACTION.SHOW_POST_UPLOAD_MODAL:
      return { ...state, showModal: payload };

    default:
      return state;
  }
};
