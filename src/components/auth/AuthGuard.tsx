// components/auth/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'parent';
  requireVerified?: boolean;
}

export default function AuthGuard({ 
  children, 
  requiredRole = 'user',
  requireVerified = true 
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading, checkSession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      if (!isLoading) {
        // اگر در حال بارگذاری نیستیم
        if (!isAuthenticated || !user) {
          // اگر احراز هویت نشده، به صفحه login هدایت کن
          router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
          return;
        }

        // بررسی سشن در سرور
        const isSessionValid = await checkSession();
        if (!isSessionValid) {
          // اگر سشن معتبر نیست
          router.push('/login?session=expired');
          return;
        }

        // بررسی verified بودن حساب
        if (requireVerified && !user.is_verified) {
          router.push('/dashboard');
          return;
        }

        // بررسی نقش کاربر
        if (requiredRole === 'admin' && !user.is_staff) {
          router.push('/dashboard?error=unauthorized');
          return;
        }

        if (requiredRole === 'parent' && !user.is_parent) {
          router.push('/dashboard?error=not_parent');
          return;
        }
      }
    };

    verifyAccess();
  }, [isAuthenticated, isLoading, router, checkSession, user, requiredRole, requireVerified]);

  // نمایش loading در حال بررسی
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
        <p className="mt-4 text-gray-600">در حال بررسی دسترسی...</p>
      </div>
    );
  }

  // اگر همه چیز درست است، محتوا را نمایش بده
  return isAuthenticated ? <>{children}</> : null;
}