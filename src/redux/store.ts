import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSclice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./features/post/postSlice";
import authReducer from "./features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    post: postReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
