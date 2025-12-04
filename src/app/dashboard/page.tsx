'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import DashboardPage from '@/components/DashboardPage';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // اگر لاگین نکرده‌است، به لاگین هدایت شود
    if (!isLoading && !user) {
      console.log('➡️ Redirecting to login from dashboard page');
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // اگر در حال لودینگ است، چیزی نمایش نده
  if (isLoading) {
    return null;
  }

  // اگر کاربر لاگین نکرده، چیزی نمایش نده
  if (!user) {
    return null;
  }

  return <DashboardPage />;
}