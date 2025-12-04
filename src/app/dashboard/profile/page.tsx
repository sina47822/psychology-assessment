// src/app/dashboard/profile/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import UserProfile from '@/components/UserProfile';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, checkSession } = useAuth();

  // بررسی session هنگام بارگذاری صفحه
  useEffect(() => {
    const verifySession = async () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          // اگر احراز هویت نشده، به صفحه login هدایت کن
          router.push('/login?redirect=/dashboard/profile');
          return;
        }

        // بررسی سشن در سرور
        const isSessionValid = await checkSession();
        if (!isSessionValid) {
          // اگر سشن معتبر نیست
          router.push('/login?session=expired&redirect=/dashboard/profile');
          return;
        }
      }
    };

    verifySession();
  }, [isAuthenticated, isLoading, router, checkSession]);

  // نمایش loading در حال بررسی
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-sky-600 mx-auto" />
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // اگر کاربر لاگین نکرده، چیزی نمایش نده
  if (!user || !isAuthenticated) {
    return null;
  }

  return (
      <UserProfile />
  );
}