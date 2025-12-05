import React from "react";
import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm";
import { images } from "@/constants/images";
import Container from "@/components/common/Container";
import { useSearchParams } from "react-router";
import OtpForm from "@/components/forms/auth/OtpForm";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="flex  min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Container className="absolute top-0 left-0 py-5 flex">
        <img
          src={images.logo_w_cn}
          alt="logo"
          className="w-[100px] md:w-[130px] mb-2 "
        />
      </Container>
      <div className="w-full max-w-sm">
        {token ? <OtpForm token={token} /> : <ForgotPasswordForm />}
      </div>
    </div>
  );
}
