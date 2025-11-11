import React from 'react'
import ForgotPasswordForm from '@/components/forms/auth/ForgotPasswordForm';
import { images } from '@/constants/images';
import Container from '@/components/common/Container';

export default function ForgotPassword() {

  return (
     <div className="flex  min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Container className="absolute top-0 left-0 py-5 flex">
        <img
          src={images.logo_landscape}
          alt="logo"
          className="w-[100px] md:w-[130px] mb-2 "
        />

      </Container>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}


