import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { rtkApi } from "../services/rtkApi";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "./storage";

// Persist config ONLY for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"], // only these fields
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(rtkApi.middleware),
});

export const persistor = persistStore(store);

export default store;
