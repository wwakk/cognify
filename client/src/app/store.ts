// ----------------------
// Imports
// ----------------------
// Import the function to create a Redux store
import { configureStore } from "@reduxjs/toolkit";

// Import API slices for OCR and ChatGPT features
import { ocrApi } from "@/api/ocrApi";
import { chatgptApi } from "@/api/chatgptApi";

// ----------------------
// Store Setup
// ----------------------
// Create the Redux store and connect all the reducers and middleware
export const store = configureStore({
  // Combine reducers from all features and API slices
  reducer: {
    [ocrApi.reducerPath]: ocrApi.reducer, // OCR API state
    [chatgptApi.reducerPath]: chatgptApi.reducer, // ChatGPT API state
    // Add other reducers here if needed
  },

  // Add middleware needed by the API slices for caching, fetching, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ocrApi.middleware, chatgptApi.middleware),
});

// ----------------------
// TypeScript Types
// ----------------------
// Type for the entire state of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function (to send actions)
export type AppDispatch = typeof store.dispatch;
