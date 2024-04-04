"use client";

import google from "@/asset/Google-Logo.png";
import { PasswordInput } from "@/components/passwordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSignupMutation } from "@/store/auth/page";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import querystring from "querystring";
import { useState, FormEvent, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email format" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must contain at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
type FormType = z.infer<typeof formSchema>;

const Page: React.FC = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const { toast } = useToast();

  const [signup, { isLoading, isError, isSuccess, data }] = useSignupMutation();

  const onSubmit: SubmitHandler<{
    name: string;
    email: string;
    password: string;
  }> = async (data) => {
    const query = querystring.stringify({
      email: data.email,
      source: "signup",
    });
    try {
      const response = await signup(data);
      if (isSuccess) {
        toast({
          description: "Sign up successful!.",
        });
        router.push(`/auth/otp-verification?${query}`);
      } else if (isError){
        toast({
          variant: "destructive",
          description: "Sign in failed.",
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
          Sign Up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="font-semibold text-primary"
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        className="font-semibold text-primary"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Sign up
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
                  Already have an account?
                </span>
              </div>
            </div>
            <Button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/auth/signin">
                {isLoading? "Signing up..." : "Sign up"}
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
