"use client";

import { PasswordInput } from "@/components/passwordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useModifyPasswordMutation } from "@/store/auth/page";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import querystring from "querystring";
import React from "react";
import { useState, ChangeEvent } from "react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must contain at least 8 characters" }),
  confirmPassword: z.string({ required_error: "Password is required" }).min(8, { message: "Password must contain at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match"
});

const page = () => {
   const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { toast } = useToast();
  const router = useRouter();
  const [modifyPassword, { isLoading, isError, isSuccess, data }] =
    useModifyPasswordMutation();
  const onSubmit: SubmitHandler<{ password: string }> = async (
    data
  ) => {
    data.password??= ""
    const response_object = { email: email, password: data.password};
    try {
      const response = await modifyPassword(response_object);
      if (isSuccess) {
        toast({
          description: "Password changed successfully.",
        });
        router.push(`/auth/signin`);
      } else if (isError) {
        toast({
          variant: "destructive",
          description: "Password change failed.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Password change error.",
      });
    }
  };
 
  type FormType = z.infer<typeof formSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
              <Link href="/auth/signin">
                {isLoading ? "Changing Password..." : "Reset Password"}
              </Link>
            </Button>
          </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;