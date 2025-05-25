'use client';

import React, { Suspense } from 'react';
import OTPVerificationForm from '@/components/auth/otp-verification/OtpVerificationFrom';
import { useSearchParams } from 'next/navigation';

// A small client component that actually uses the hook:
function OTPVerificationWithParams() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  return <OTPVerificationForm email={email} />;
}

export default function OtpVerificationPage() {
  return (
    // This ensures the page doesn’t fully bail to CSR
    <Suspense fallback={<div>Loading…</div>}>
      <OTPVerificationWithParams />
    </Suspense>
  );
}
