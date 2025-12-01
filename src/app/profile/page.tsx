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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* ناوبری */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                سامانه ارزیابی
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                داشبورد
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                ارزیابی
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user.fullName}</span>
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium text-sm">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            خانه
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <Link href="/dashboard" className="hover:text-gray-900">
            داشبورد
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">پروفایل کاربری</span>
        </div>
      </div>

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