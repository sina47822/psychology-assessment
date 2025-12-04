// src/app/(Account)/login/page.tsx - نسخه کامل اصلاح شده
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { identifyLoginType, formatIranianPhone } from '@/lib/utils';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { Lock, Smartphone, Mail, User as UserIcon, Shield, Home, AlertCircle, CheckCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login, isLoading: authLoading } = useAuth();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginType, setLoginType] = useState<'email' | 'username' | 'phone'>('username');
  const [showPassword, setShowPassword] = useState(false);
  
  const redirect = searchParams.get('redirect') || '/dashboard';
  const message = searchParams.get('message');

  // شناسایی نوع لاگین بر اساس مقدار اولیه
  useEffect(() => {
    if (identifier) {
      const type = identifyLoginType(identifier);
      setLoginType(type);
    }
  }, [identifier]);

  // ریدایرکت اگر کاربر لاگین باشد
  useEffect(() => {
    if (user && !authLoading) {
      router.replace(redirect);
    }
  }, [user, authLoading, router, redirect]);

  // نمایش پیام خطا از URL
  useEffect(() => {
    if (message) {
      setError(decodeURIComponent(message));
      // پاک کردن پیام از URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('message');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [message]);

  // پاکسازی localStorage هنگام بارگذاری صفحه (اگر کاربر لاگین نیست)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        // فقط اگر توکن یا کاربر وجود ندارد، پاکسازی کن
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_expires_at');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // اعتبارسنجی اولیه
    if (!identifier.trim()) {
      setError('لطفاً ایمیل، نام کاربری یا شماره موبایل خود را وارد کنید');
      return;
    }
    
    if (!password.trim()) {
      setError('لطفاً رمز عبور خود را وارد کنید');
      return;
    }

    const type = identifyLoginType(identifier);
    setLoginType(type);
    
    // اگر با موبایل لاگین می‌کند، به صفحه OTP هدایت کن
    if (type === 'phone') {
      const cleanPhone = identifier.trim().replace(/\D/g, '');
      
      // بررسی شماره موبایل
      if (cleanPhone.length !== 11 || !cleanPhone.startsWith('09')) {
        setError('شماره موبایل باید 11 رقمی و با 09 شروع شود');
        return;
      }
      
      console.log(`📱 Phone login detected: ${cleanPhone}`);
      
      // ذخیره شماره موبایل در sessionStorage برای استفاده در صفحه OTP
      sessionStorage.setItem('otp_phone', cleanPhone);
      sessionStorage.setItem('otp_purpose', 'login');
      
      // هدایت به صفحه OTP
      router.push(`/verify-otp?identifier=${encodeURIComponent(cleanPhone)}&purpose=login&redirect=${encodeURIComponent(redirect)}`);
      return;
    }
    
    // لاگین با ایمیل یا نام کاربری
    setIsLoading(true);
    
    try {
      console.log('🔄 Login attempt:', { 
        identifier: identifier.trim(), 
        type,
        passwordLength: password.length 
      });
      
      const result = await login(identifier.trim(), password.trim());
      
      if (result.success) {
        console.log('✅ Login successful');
        setSuccess('ورود موفقیت‌آمیز! در حال هدایت...');
        
        // تأخیر کوتاه برای نمایش پیام موفقیت
        setTimeout(() => {
          router.replace(redirect);
        }, 1500);
      } else {
        setError(result.error || 'خطا در ورود به سیستم');
        console.error('❌ Login failed:', result.error);
      }
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setError('خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, password, login, router, redirect]);

  const getIdentifierIcon = () => {
    switch (loginType) {
      case 'phone': return <Smartphone className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'username': return <UserIcon className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  const getIdentifierPlaceholder = () => {
    switch (loginType) {
      case 'phone': return '09123456789';
      case 'email': return 'example@email.com';
      case 'username': return 'نام کاربری خود را وارد کنید';
      default: return 'ایمیل، نام کاربری یا شماره موبایل';
    }
  };

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
    const type = identifyLoginType(value);
    setLoginType(type);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // یا یک loading component
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-sky-50">
      {/* هدر */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{CONTACT_INFO.appName}</h1>
                <p className="text-xs text-gray-500">{CONTACT_INFO.organization}</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-sky-600 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium hidden md:inline">صفحه اصلی</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* محتوای اصلی */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* هدر کارت */}
            <div className="bg-gradient-to-r from-sky-50 to-sky-50 p-6 border-b border-sky-100">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg text-sky-600 border border-sky-100">
                  <Lock className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    ورود به حساب کاربری
                  </h1>
                  <p className="text-gray-600 text-sm">
                    لطفاً با اطلاعات کاربری خود وارد شوید
                  </p>
                </div>
              </div>
            </div>

            {/* بدنه کارت */}
            <div className="p-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    ایمیل / نام کاربری / شماره موبایل
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {getIdentifierIcon()}
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => handleIdentifierChange(e.target.value)}
                      className="w-full p-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left"
                      placeholder={getIdentifierPlaceholder()}
                      required
                      autoComplete="username"
                      autoFocus
                      dir="auto"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {loginType === 'phone' && 'با شماره موبایل، کد تأیید برای شما ارسال می‌شود'}
                    {loginType === 'email' && 'با ایمیل، رمز عبور خود را وارد کنید'}
                    {loginType === 'username' && 'با نام کاربری، رمز عبور خود را وارد کنید'}
                  </p>
                </div>

                {loginType !== 'phone' && (
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      رمز عبور
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 pr-12 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left"
                        placeholder="رمز عبور"
                        required
                        autoComplete="current-password"
                        dir="auto"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {loginType === 'phone' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Smartphone className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-right">
                        <p className="text-sm text-blue-800">
                          با شماره موبایل <span className="font-bold">{formatIranianPhone(identifier)}</span> لاگین می‌کنید.
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          کد تأیید به شماره شما ارسال خواهد شد.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* نمایش خطا */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-right">
                        <p className="font-medium">خطا</p>
                        <p className="text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* نمایش موفقیت */}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-right">
                        <p className="font-medium">موفقیت‌آمیز</p>
                        <p className="text-sm mt-1">{success}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-sky-600 hover:text-sky-800 transition-colors font-medium"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                  
                  {loginType !== 'phone' && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${
                    loginType === 'phone' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 focus:ring-blue-500' 
                      : 'bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 focus:ring-sky-500'
                  } text-white py-3 px-4 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>در حال پردازش...</span>
                    </>
                  ) : (
                    <>
                      <span>{loginType === 'phone' ? 'دریافت کد تأیید' : 'ورود به سیستم'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  حساب کاربری ندارید؟{' '}
                  <Link 
                    href="/register" 
                    className="text-sky-600 font-semibold hover:text-sky-800 transition-colors"
                  >
                    ثبت نام کنید
                  </Link>
                </div>
              </form>

              {/* روش‌های دیگر لاگین */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-center text-sm text-gray-600 mb-4">
                  یا ورود با
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('');
                      setPassword('');
                      setLoginType('phone');
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                      if (input) input.focus();
                    }}
                    className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>شماره موبایل</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('');
                      setPassword('');
                      setLoginType('email');
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                      if (input) input.focus();
                    }}
                    className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>ایمیل</span>
                  </button>
                </div>
              </div>

              {/* اطلاعات */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="space-y-2 text-xs text-gray-500 text-center">
                  <p>
                    با ورود یا ثبت‌نام، شما با{' '}
                    <Link href="/terms" className="text-sky-600 hover:text-sky-800 font-medium">
                      شرایط استفاده
                    </Link>{' '}
                    و{' '}
                    <Link href="/privacy" className="text-sky-600 hover:text-sky-800 font-medium">
                      حریم خصوصی
                    </Link>{' '}
                    موافقت می‌کنید
                  </p>
                  <p className="text-gray-400">
                    سیستم نسخه {APP_INFO.version}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}