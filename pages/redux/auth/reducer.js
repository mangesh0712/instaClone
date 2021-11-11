import { AUTH_ACTION_TYPES } from "./actionTypes";

const initialState = {
  isAuth: false,
  user: {},
  userAddedToDb: false,
  followRequests: [],
  followers: [],
  following: [],
  notifications: [],
  saved: [],
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_ACTION_TYPES.ADD_USER:
      return { ...state, user: payload, isAuth: true };

    case AUTH_ACTION_TYPES.REMOVE_USER:
      return { ...state, user: {}, isAuth: false, userAddedToDb: false };

    case AUTH_ACTION_TYPES.SET_USER_ADDED_TO_DB:
      return { ...state, user: {}, userAddedToDb: payload };

    default:
      return state;
  }
};
