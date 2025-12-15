// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // فقط اگر کاربر لاگین کرده است، به داشبورد هدایت شود
    if (!isLoading && user) {
      console.log('User is authenticated, redirecting to dashboard');
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
        <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
      </div>
    );
  }

  // اگر کاربر لاگین کرده بود، این بخش نمایش داده نمی‌شود (به دشبورد ریدایرکت شده)
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
      </div>
    );
  }

  // صفحه اصلی فقط برای کاربران لاگین نکرده
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            سامانه ارزیابی نوجوانان
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            سیستم تخصصی ارزیابی و تحلیل ویژگی‌های رفتاری نوجوانان
          </p>
          <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              خوش آمدید
            </h2>
            <p className="text-gray-700 mb-6">
              برای شروع ارزیابی، لطفاً وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push('/login')}
                className="bg-sky-500 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ورود به سیستم
              </button>
              <button
                onClick={() => router.push('/register')}
                className="bg-white hover:bg-gray-50 text-sky-500 border border-sky-500 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ثبت‌نام
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}