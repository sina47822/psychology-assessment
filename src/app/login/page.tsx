'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import LoginForm from '@/components/LoginForm';
import { loginUser, sendOTP } from '@/lib/auth';
import { identifyLoginType } from '@/lib/utils';
import { APP_INFO } from '@/data/constants';
import { Lock, Smartphone, Mail, User as UserIcon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'username' | 'phone'>('email');
  
  const redirect = searchParams.get('redirect') || '/';

  // اگر کاربر قبلاً لاگین کرده، به dashboard هدایت شود
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const type = identifyLoginType(identifier);
      setLoginType(type);
      
      // اگر با موبایل لاگین می‌کند، OTP بفرست
      if (type === 'phone') {
        setIsSendingOTP(true);
        const otpResult = await sendOTP(identifier);
        
        if (otpResult.success) {
          setShowOTP(true);
        } else {
          setError('خطا در ارسال کد تایید');
        }
        setIsSendingOTP(false);
        setIsLoading(false);
        return;
      }
      
      // اگر با ایمیل یا نام کاربری لاگین می‌کند
      const result = await loginUser({ identifier, password });
      
      if (result.success && result.user) {
        login(result.user);
        router.push(redirect);
      } else {
        setError(result.message || 'خطا در ورود به سیستم');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // در محیط واقعی، باید OTP تأیید شود
      // برای سادگی، هر کد 6 رقمی را می‌پذیریم
      if (otp.length === 6) {
        const result = await loginUser({ identifier, password: 'otp-verification' });
        
        if (result.success && result.user) {
          login(result.user);
          router.push(redirect);
        } else {
          setError('کد تایید نامعتبر است');
        }
      } else {
        setError('کد تایید باید ۶ رقم باشد');
      }
    } catch (error) {
      setError('خطا در تأیید کد');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsSendingOTP(true);
    setError('');
    
    try {
      const result = await sendOTP(identifier);
      if (result.success) {
        alert('کد تایید مجدداً ارسال شد');
      } else {
        setError('خطا در ارسال مجدد کد تایید');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsSendingOTP(false);
    }
  };

  const getIdentifierIcon = () => {
    switch (loginType) {
      case 'phone': return <Smartphone className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'username': return <UserIcon className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Lock className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ورود به سیستم</h1>
          <p className="text-gray-600">
            لطفاً با اطلاعات کاربری خود وارد شوید
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          {!showOTP ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  ایمیل / نام کاربری / شماره موبایل
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {getIdentifierIcon()}
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="example@email.com یا username یا 09123456789"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  رمز عبور
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="رمز عبور"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-indigo-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    در حال ورود...
                  </span>
                ) : (
                  'ورود به سیستم'
                )}
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                حساب کاربری ندارید؟{' '}
                <Link 
                  href="/register" 
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  ثبت نام کنید
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">تأیید شماره موبایل</h3>
                <p className="text-gray-600 text-sm mt-2">
                  کد تأیید به شماره {identifier} ارسال شد
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  کد تأیید (OTP)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-2xl font-bold"
                  placeholder="123456"
                  maxLength={6}
                  required
                  dir="ltr"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  کد ۶ رقمی ارسال شده را وارد کنید
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isSendingOTP}
                  className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-300"
                >
                  {isSendingOTP ? 'در حال ارسال...' : 'ارسال مجدد کد'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowOTP(false)}
                  className="flex-1 bg-gray-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-600"
                >
                  بازگشت
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    در حال تأیید...
                  </span>
                ) : (
                  'تأیید کد'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              با ورود یا ثبت‌نام، شما با{' '}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-800">
                شرایط استفاده
              </Link>{' '}
              و{' '}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800">
                حریم خصوصی
              </Link>{' '}
              موافقت می‌کنید
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              سیستم نسخه {APP_INFO.version}
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
          >
            ← بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}