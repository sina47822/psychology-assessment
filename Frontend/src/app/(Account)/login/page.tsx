// src/app/(Account)/login/page.tsx - نسخه اصلاح شده
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { identifyLoginType, formatIranianPhone } from '@/lib/utils';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { Shield, Home, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import LoginContent from './LoginContent';

// کامپوننت اصلی که در Suspense قرار می‌گیرد
function LoginPageContent() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}

// کامپوننت loading
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-sky-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        <p className="text-gray-600">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}