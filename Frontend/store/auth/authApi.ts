import { userLogin, userLoginReturnObjectType, OtpVerificationPayload, userSignUp } from "@/types/user/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<userLoginReturnObjectType, userLogin>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<userLoginReturnObjectType, userSignUp>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    otpVerification: builder.mutation<
      { message: String },
      OtpVerificationPayload
    >({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation<{ message: String }, { email: string }>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    modifyPassword: builder.mutation<{ message: String }, { email:string, password: string }>({
      query: (data) => ({
        url: "/auth/modify-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useOtpVerificationMutation,
  useResendOtpMutation,
  useModifyPasswordMutation
  
} = userAPI;