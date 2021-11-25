import { POST_ACTION } from "./postActionTypes";

export const showPostUploadModal = (val) => {
  return {
    type: POST_ACTION.SHOW_POST_UPLOAD_MODAL,
    payload: val,
  };
};

export const getStories = (stories) => {
  return {
    type: POST_ACTION.GET_STORIES,
    payload: stories,
  };
};

export const setAllPosts = (posts) => {
  return {
    type: POST_ACTION.SET_ALL_POSTS,
    payload: posts,
  };
};
export const setUsersPosts = (posts) => {
  return {
    type: POST_ACTION.SET_USERS_POSTS,
    payload: posts,
  };
};
export const setSelectedPost = (post) => {
  return {
    type: POST_ACTION.SET_SELECTED_POST,
    payload: post,
  };
};
