// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/services/api";
import uploadReducer from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firebase Auth non-serializable values
        ignoredActions: ["auth/updateUser"],
        ignoredPaths: ["firebase.user"],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
