import { configureStore } from "@reduxjs/toolkit";
import { ocrApi } from "@/api/ocrApi";
import { chatgptApi } from "@/api/chatgptApi";

export const store = configureStore({
  reducer: {
    [ocrApi.reducerPath]: ocrApi.reducer,
    [chatgptApi.reducerPath]: chatgptApi.reducer,
    // other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ocrApi.middleware, chatgptApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
