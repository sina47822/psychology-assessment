// src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import DashboardPage from '@/components/DashboardPage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading, is_authenticated } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // فقط یک بار چک کن
    if (hasChecked) return;

    if (!isLoading) {
      if (!is_authenticated || !user) {
        console.log('➡️ User not authenticated, redirecting to login');
        router.push('/login');
        setHasChecked(true);
      } else {
        console.log('✅ User is authenticated, showing dashboard');
        setHasChecked(true);
      }
    }
  }, [user, is_authenticated, isLoading, router, hasChecked]);

  // نمایش loading در حال بررسی
  if (isLoading || !hasChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // اگر کاربر لاگین نکرده، چیزی نمایش نده (در حال redirect است)
  if (!is_authenticated || !user) {
    return null;
  }

  return <DashboardPage />;
}