// src\app\dashboard\profile\page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import UserProfile from '@/components/UserProfile';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // اگر کاربر لاگین نکرده، به لاگین هدایت شود
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-50">

      {/* محتوای اصلی */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserProfile />
      </div>

      {/* فوتر */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>تمامی حقوق این سامانه محفوظ است © {new Date().getFullYear()}</p>
            <p className="mt-2">
              <Link href="/privacy" className="hover:text-gray-700 mx-2">حریم خصوصی</Link>
              •
              <Link href="/terms" className="hover:text-gray-700 mx-2">قوانین استفاده</Link>
              •
              <Link href="/contact" className="hover:text-gray-700 mx-2">تماس با ما</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}