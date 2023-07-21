import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nextgen-one.vercel.app/api/v1/",
  }),
  tagTypes: ["posts", "message"],
  endpoints: () => ({}),
});
// https://nextgen-one.vercel.app/api/v1/
