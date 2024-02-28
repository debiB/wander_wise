import { userLogin, userLoginReturnObjectType } from "@/types/user/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    // for investing/deposit money

    signin: builder.mutation<userLoginReturnObjectType, userLogin>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useSigninMutation } = userAPI;