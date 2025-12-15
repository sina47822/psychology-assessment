// src/app/(Account)/verify-otp/page.tsx
'use client';

import { Suspense } from 'react';
import VerifyOTPContent from './VerifyOTPContent';

// کامپوننت loading
function VerifyOTPLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-sky-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        <p className="text-gray-600">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<VerifyOTPLoading />}>
      <VerifyOTPContent />
    </Suspense>
  );
}