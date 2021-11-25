import { POST_ACTION } from "./postActionTypes";

const initialState = {
  allPosts: [],
  usersPosts: [],
  showModal: false,
  stories: [],
  selectedPost: null,
};

export const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ACTION.SHOW_POST_UPLOAD_MODAL:
      return { ...state, showModal: payload };

    case POST_ACTION.GET_STORIES:
      return { ...state, stories: payload };

    case POST_ACTION.SET_ALL_POSTS:
      return { ...state, allPosts: payload };

    case POST_ACTION.SET_USERS_POSTS:
      return { ...state, usersPosts: payload };

    case POST_ACTION.SET_SELECTED_POST:
      return { ...state, selectedPost: payload };

    default:
      return state;
  }
};
