import React, { useState } from "react";
import { VerificationIcon } from "~/assets/icons"; // Replace with correct icon
import Heading from "~/components/typography/heading";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { useVerifyOtp } from "../hooks/use-verify-otp";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const VerificationCode = () => {
  const verifyOtp = useVerifyOtp()
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const handleComplete = async (value: string) => {
    try {
      const token = Cookies.get("mfa_token");
      if (!token) {
        toast.error("MFA token not found. Please login again.");
        return;
      }
      interface MFATokenPayload {
        email: string;
      }
    
      const decoded = jwtDecode<MFATokenPayload>(token);

      const res = await verifyOtp.mutateAsync({
        email: decoded?.email,
        otp: value
      });

      if (res.jwt) {  
        Cookies.set("auth_token", res.jwt ?? "");
        Cookies.remove('mfa_token')
      }

      toast.success("Login Successfully");
      navigate('/admin/user-management')

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 shadow-[0_0_0_14px_#F7F7F7] mb-4 ml-4">
          <VerificationIcon />
        </div>

        <Heading variant="h2">Enter Verification Code</Heading>
        <p className="text-[20px] text-gray">
          We’ve sent a code to <span className="text-red">james@gmail.com</span>
        </p>
      </div>
      {/* Input fields */}
      <div className="my-6 flex justify-start ">
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={setOtp}
          onComplete={handleComplete}
        >
          <InputOTPGroup className="gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-32 h-16 text-[24px] font-medium rounded-[10px] border border-gray-200 focus-visible:ring-yellow-600 focus-visible:border-yellow-600"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button className="w-full cursor-pointer">Confirm</Button>

      {/* Resend */}
      <p className="mt-6 text-sm text-gray-500 text-center flex flex-col">
        Experiencing issues receiving the code?
        <button className="text-red font-medium hover:underline mt-1 cursor-pointer">
          Resend code
        </button>
      </p>
    </div>
  );
};

export default VerificationCode;
