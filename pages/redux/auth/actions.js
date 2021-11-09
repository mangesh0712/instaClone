import { AUTH_ACTION_TYPES } from "./actionTypes";

export const addUser = (users) => {
  return {
    type: AUTH_ACTION_TYPES.ADD_USER,
    payload: users,
  };
};
