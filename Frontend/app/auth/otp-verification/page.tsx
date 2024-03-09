"use client";

import {Button} from "@/components/ui/button";
import {
  useOtpVerificationMutation,
  useResendOtpMutation,
} from "@/store/auth/page";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useRef,
} from "react";
import Link from "next/link";

const OTPVerificationPage: React.FC = () => {
  const [otp, setOTP] = useState<string[]>(Array(4).fill(""));
  const [countdown, setCountdown] = useState<number>(180);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const source  = searchParams.get("source");
  const emailString = Array.isArray(email) ? email[0] : email || "";
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [verifyOTP, { isLoading, isError, isSuccess, data }] =
    useOtpVerificationMutation();
  const [resendOTP, { isLoading: resendLoading }] = useResendOtpMutation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOTPChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);

    if (e.target.value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.target.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackspace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.keyCode === 8 && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async (): Promise<void> => {
    try {
      await resendOTP({ email: emailString });
      setCountdown(180);
    } catch (error) {
      console.error("Error resending OTP:", error);
      
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const enteredOTP = otp.join("");
      const response = await verifyOTP({ email: emailString, otp: enteredOTP });
      if (isSuccess) {
        if (source === "signup") {
          router.push("/TravelHistory/userpage");
        } else
        router.push("/auth/reset-password");
      } else {
        console.error("OTP verification failed");
        
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          OTP Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="appearance-none block w-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg text-center"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </div>

            {countdown > 0 ? (
              <p className="text-center text-gray-500">
                Resend OTP in {countdown} seconds
              </p>
            ) : (
              <p className="text-center">
                <a
                  className={`text-indigo-500 cursor-pointer ${
                    resendLoading ? "pointer-events-none" : ""
                  }`}
                  onClick={handleResend}
                >
                  Resend OTP
                </a>
              </p>
            )}

            
              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Verifying..." : "Verify OTP"} </Button>
              
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;