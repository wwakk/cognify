import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatgptApi = createApi({
  reducerPath: "chatgptApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  endpoints: (builder) => ({
    getChatGPTResponse: builder.mutation<{ content: string }, { text: string }>(
      {
        query: (body) => ({
          url: "chat", // your chat endpoint
          method: "POST",
          body,
        }),
      }
    ),
  }),
});

export const { useGetChatGPTResponseMutation } = chatgptApi;
