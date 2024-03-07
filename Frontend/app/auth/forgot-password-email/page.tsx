"use client";

import { Button } from "@/components/ui/button";
import { useResendOtpMutation } from "@/store/auth/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import querystring from 'querystring';
import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";



const page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [resendOtp, { isLoading, isError, isSuccess, data }] =
    useResendOtpMutation();
    const query = querystring.stringify({ email: email });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try{
        const response = await resendOtp({email: email});
        if(isSuccess){
            router.push(`/auth/otp-verification?${query}`);
        }else{
            console.error("Forgot password failed:");
        }
    }
    catch(error){
        console.error("Forgot password error:", error);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    // value={email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <Button className="w-full" type= "submit">
                Send otp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;