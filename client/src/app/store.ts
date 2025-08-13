import { configureStore } from "@reduxjs/toolkit";
import { ocrApi } from "@/api/ocrApi";

export const store = configureStore({
  reducer: {
    [ocrApi.reducerPath]: ocrApi.reducer,
    // your other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ocrApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
