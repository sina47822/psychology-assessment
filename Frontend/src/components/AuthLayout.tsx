'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Lock, 
  UserPlus, 
  Smartphone, 
  Key, 
  Home,
  ArrowRight,
  Shield,
  Mail,
  User,
  Info,
  Phone,
  Clock
} from 'lucide-react';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backLink?: string;
  backText?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
  backLink = '/',
  backText = 'بازگشت به صفحه اصلی'
}: AuthLayoutProps) {
  const pathname = usePathname();

  const getPageInfo = () => {
    switch (pathname) {
      case '/login':
        return {
          title: title || 'ورود به سامانه',
          subtitle: subtitle || 'برای دسترسی به امکانات سامانه وارد شوید',
          icon: <Lock className="h-8 w-8" />,
          bgColor: 'bg-gradient-to-r from-sky-100 to-sky-50',
          iconColor: 'text-sky-500',
          borderColor: 'border-sky-200'
        };
      case '/register':
        return {
          title: title || 'ثبت‌نام کاربر جدید',
          subtitle: subtitle || 'برای ایجاد حساب کاربری فرم زیر را تکمیل کنید',
          icon: <UserPlus className="h-8 w-8" />,
          bgColor: 'bg-gradient-to-r from-sky-100 to-sky-50',
          iconColor: 'text-sky-500',
          borderColor: 'border-sky-200'
        };
      case '/forgot-password':
        return {
          title: title || 'بازیابی رمز عبور',
          subtitle: subtitle || 'اطلاعات حساب خود را وارد کنید',
          icon: <Key className="h-8 w-8" />,
          bgColor: 'bg-gradient-to-r from-amber-100 to-amber-50',
          iconColor: 'text-amber-600',
          borderColor: 'border-amber-200'
        };
      case '/verify-phone':
        return {
          title: title || 'تأیید شماره همراه',
          subtitle: subtitle || 'کد تأیید ارسال شده به موبایل را وارد کنید',
          icon: <Smartphone className="h-8 w-8" />,
          bgColor: 'bg-gradient-to-r from-sky-100 to-sky-50',
          iconColor: 'text-sky-500',
          borderColor: 'border-sky-200'
        };
      case '/verify-email':
        return {
          title: title || 'تأیید ایمیل',
          subtitle: subtitle || 'کد تأیید ارسال شده به ایمیل را وارد کنید',
          icon: <Mail className="h-8 w-8" />,
          bgColor: 'bg-gradient-to-r from-sky-100 to-sky-50',
          iconColor: 'text-sky-500',
          borderColor: 'border-sky-200'
        };
      default:
        return {
          title: title || 'احراز هویت',
          subtitle: subtitle || 'به سامانه ارزیابی نوجوانان خوش آمدید',
          icon: <Shield className="h-8 w-8" />,
          bgColor: 'bg-gradient-to-r from-gray-100 to-gray-50',
          iconColor: 'text-gray-600',
          borderColor: 'border-gray-200'
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50">
      {/* هدر */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">آ</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">سامانه ارزیابی</h1>
                <p className="text-xs text-gray-500">نوجوانان و والدین</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <a 
                href={`tel:${CONTACT_INFO.supportPhone.replace(/-/g, '')}`}
                className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">{CONTACT_INFO.supportPhone}</span>
              </a>
              <Link
                href="/about"
                className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
              >
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">درباره سامانه</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* مسیر ناوبری */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center text-sm text-gray-600">
          <Link 
            href="/" 
            className="flex items-center hover:text-gray-900 transition-colors"
          >
            <Home className="h-4 w-4 ml-1" />
            خانه
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <Link 
            href="/login" 
            className="hover:text-gray-900 transition-colors"
          >
            ورود به سیستم
          </Link>
          {pathname !== '/login' && (
            <>
              <ArrowRight className="h-4 w-4 mx-2" />
              <span className="font-medium text-gray-900">
                {pageInfo.title}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* محتوای اصلی */}
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <div className="w-full max-w-md">
          {/* کارت اصلی */}
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border ${pageInfo.borderColor}`}>
            {/* هدر کارت */}
            <div className={`${pageInfo.bgColor} p-8 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                {pageInfo.icon}
              </div>
              <div className="relative flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${pageInfo.iconColor} bg-white`}>
                  <div className="scale-125">
                    {pageInfo.icon}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {pageInfo.title}
                  </h1>
                  <p className="text-gray-600 max-w-sm">
                    {pageInfo.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* بدنه کارت */}
            <div className="p-8">
              {children}

              {/* لینک‌های راهنما */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                {pathname === '/login' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-gray-600 text-sm">حساب کاربری ندارید؟ </span>
                      <Link
                        href="/register"
                        className="text-sm font-semibold text-sky-500 hover:text-sky-800 hover:underline transition-colors"
                      >
                        ثبت‌نام کنید
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-sky-500 hover:text-sky-800 hover:underline transition-colors"
                      >
                        رمز عبور خود را فراموش کرده‌اید؟
                      </Link>
                    </div>
                  </div>
                )}

                {pathname === '/register' && (
                  <div className="text-center">
                    <span className="text-gray-600 text-sm">قبلاً حساب دارید؟ </span>
                    <Link
                      href="/login"
                      className="text-sm font-semibold text-sky-500 hover:text-sky-800 hover:underline transition-colors"
                    >
                      وارد شوید
                    </Link>
                  </div>
                )}

                {['/forgot-password', '/verify-phone', '/verify-email'].includes(pathname) && (
                  <div className="text-center">
                    <Link
                      href="/login"
                      className="text-sm font-semibold text-sky-500 hover:text-sky-800 hover:underline transition-colors"
                    >
                      بازگشت به صفحه ورود
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* دکمه بازگشت */}
          {showBackButton && (
            <div className="mt-8 text-center">
              <Link
                href={backLink}
                className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">{backText}</span>
              </Link>
            </div>
          )}

          {/* اطلاعات پشتیبانی */}
          <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-sky-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">نیاز به راهنمایی دارید؟</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 ml-2" />
                    <span className="font-medium">{CONTACT_INFO.supportPhone}</span>
                    <span className="mr-4 text-gray-500">-</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{CONTACT_INFO.supportHours}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {CONTACT_INFO.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* اطلاعات نسخه */}
          <div className="mt-6 text-center">
            <div className="text-gray-400 text-sm space-y-1">
              <p>نسخه {APP_INFO.version} • آخرین بروزرسانی: {APP_INFO.lastUpdate}</p>
              <p>© {APP_INFO.currentYear} - تمامی حقوق محفوظ است</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}