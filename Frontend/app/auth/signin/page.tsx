"use client";

import { Button } from "@/components/ui/button";
import { useSigninMutation } from "@/store/auth/page";
import { userLoginReturnObjectType } from "@/types/user/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent, ChangeEvent } from "react";
import querystring from 'querystring';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const query = querystring.stringify({
    email: credentials.email,
    source: "signin",
  });
  const router = useRouter();
  const [signin, { isLoading, isError, data }] = useSigninMutation();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    console.log("Sign-in form submitted");

    signin(credentials)
      .unwrap()
      .then((response: userLoginReturnObjectType) => {
        console.log("Sign-in successful");
        // console.log("Response:", response);

        router.push("/TravelHistory/userpage");

        localStorage.setItem("user", JSON.stringify(response.token));
      })
      .catch((error) => {
        console.log("Sign-in error:", error.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  // value={password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="text-right">
              {" "}
              {/* Add text-right class here */}
              <Link
                href={{
                  pathname: "/auth/forgot-password-email",
                query: query
              }}
                className="text-xs text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
            <Button className="w-full" type="submit">Login</Button>
          </form>
          <div className="mt-6">
            <div className="relative mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 ">
                  Don't have an account?
                </span>
              </div>
            </div>
            <Button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><Link href="/auth/signup">Sign up</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;