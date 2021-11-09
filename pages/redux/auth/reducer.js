import { AUTH_ACTION_TYPES } from "./actionTypes";

const initialState = {
  isAuth: false,
  user: {},
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
      return { ...state, user: payload };

    default:
      return state;
  }
};
