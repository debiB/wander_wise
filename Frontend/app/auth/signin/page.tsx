"use client";

import { PasswordInput } from "@/components/passwordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSigninMutation } from "@/store/auth/page";
import { userLoginReturnObjectType } from "@/types/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import querystring from "querystring";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";


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
  const { toast } = useToast();
  const [signin, { isLoading, isError, data, isSuccess }] = useSigninMutation();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const formSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email format" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must contain at least 8 characters" }),
  });

  type FormType = z.infer<typeof formSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    try {
      const response = await signin(data);
      if (isSuccess) {
        toast({
          description: "Sign successful!.",
        });
        router.push("/TravelHistory/userpage");
      } else if (isError) {
        toast({
          variant: "destructive",
          description: "Sign in failed. Invalid credentials.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Sign in failed.",
      });
    }
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
          <Form {...form}>
            <form
              className="space-y-6"
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="font-semibold text-primary"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                     
                        className="font-semibold text-primary"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                {" "}
                {/* Add text-right class here */}
                <Link
                  href={{
                    pathname: "/auth/forgot-password-email",
                    query: query,
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
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
            <Button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;