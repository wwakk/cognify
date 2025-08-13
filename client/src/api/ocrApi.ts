import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ocrApi = createApi({
  reducerPath: "ocrApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  endpoints: (builder) => ({
    getParsedImage: builder.mutation<{ ParsedResults: any[] }, FormData>({
      query: (formData) => ({
        url: "ocr",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetParsedImageMutation } = ocrApi;
