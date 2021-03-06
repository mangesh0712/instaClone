import { AUTH_ACTION_TYPES } from "./actionTypes";

export const addUser = (user) => {
  return {
    type: AUTH_ACTION_TYPES.ADD_USER,
    payload: user,
  };
};
export const removeUser = () => {
  return {
    type: AUTH_ACTION_TYPES.REMOVE_USER,
  };
};
export const setUserAddedToDb = (val) => {
  return {
    type: AUTH_ACTION_TYPES.SET_USER_ADDED_TO_DB,
    payload: val,
  };
};
export const setUsersUid = (val) => {
  return {
    type: AUTH_ACTION_TYPES.SET_USERS_UID,
    payload: val,
  };
};
