import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { postsReducer } from "./posts/postReducer";
import { authReducer } from "./auth/reducer";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth", "posts"],
};

// const middlewares = [logger, thunk];
const middlewares = [logger];

const reducers = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
