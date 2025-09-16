import { configureStore } from "@reduxjs/toolkit";
import { ocrApi } from "@/api/ocrApi";
import { chatgptApi } from "@/api/chatgptApi";
import { authApi } from "@/api/authApi";
import { userUploadsApi } from "@/api/uploadsApi";

export const store = configureStore({
  reducer: {
    [ocrApi.reducerPath]: ocrApi.reducer,
    [chatgptApi.reducerPath]: chatgptApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // ✅ add authApi
    [userUploadsApi.reducerPath]: userUploadsApi.reducer, // ✅ add uploadsApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ocrApi.middleware)
      .concat(chatgptApi.middleware)
      .concat(authApi.middleware) // ✅ add authApi middleware
      .concat(userUploadsApi.middleware), // ✅ add uploadsApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
