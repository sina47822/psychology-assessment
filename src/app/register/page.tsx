'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import RegisterForm from '@/components/RegisterForm';
import { registerUser, sendOTP } from '@/lib/auth';
import { APP_INFO } from '@/data/constants';
import { UserPlus, Smartphone, Mail, User as UserIcon } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [otp, setOtp] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // اگر کاربر قبلاً لاگین کرده، به dashboard هدایت شود
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // تایمر برای ارسال مجدد OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await registerUser(data);
      
      if (result.success && result.user) {
        setRegisteredUser(result.user);
        
        // اگر با موبایل ثبت‌نام کرد، OTP بفرست
        if (data.phone) {
          setIsSendingOTP(true);
          const otpResult = await sendOTP(data.phone);
          
          if (otpResult.success) {
            setShowOTP(true);
            setTimeLeft(120); // 2 دقیقه
            setSuccess('کد تایید به شماره موبایل شما ارسال شد');
          } else {
            setError('خطا در ارسال کد تایید');
          }
          setIsSendingOTP(false);
        } else {
          // اگر با ایمیل ثبت‌نام کرد، مستقیم لاگین کن
          login(result.user);
          setSuccess('ثبت‌نام با موفقیت انجام شد! در حال هدایت...');
          setTimeout(() => router.push('/'), 2000);
        }
      } else {
        setError(result.message || 'خطا در ثبت‌نام');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // در محیط واقعی، باید OTP تأیید شود
      if (otp === '123456') { // OTP ثابت برای توسعه
        if (registeredUser) {
          const verifiedUser = { ...registeredUser, isVerified: true };
          login(verifiedUser);
          setSuccess('شماره موبایل شما با موفقیت تأیید شد! در حال هدایت...');
          setTimeout(() => router.push('/'), 2000);
        }
      } else {
        setError('کد تایید نامعتبر است');
      }
    } catch (error) {
      setError('خطا در تأیید کد');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) {
      setError(`لطفاً ${timeLeft} ثانیه دیگر تلاش کنید`);
      return;
    }

    setIsSendingOTP(true);
    setError('');
    
    try {
      if (registeredUser?.phone) {
        const result = await sendOTP(registeredUser.phone);
        if (result.success) {
          setTimeLeft(120); // 2 دقیقه
          setSuccess('کد تایید مجدداً ارسال شد');
        } else {
          setError('خطا در ارسال مجدد کد تایید');
        }
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <UserPlus className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ایجاد حساب کاربری</h1>
          <p className="text-gray-600">
            لطفاً اطلاعات خود را برای ثبت‌نام وارد کنید
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          {!showOTP ? (
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isLoading}
              error={error}
              success={success}
            />
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">تأیید شماره موبایل</h3>
                <p className="text-gray-600 text-sm mt-2">
                  کد تأیید به شماره {registeredUser?.phone} ارسال شد
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
                  <br />
                  کد تست: <span className="font-bold">123456</span>
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isSendingOTP || timeLeft > 0}
                  className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  {isSendingOTP 
                    ? 'در حال ارسال...' 
                    : timeLeft > 0 
                    ? `ارسال مجدد (${timeLeft}ثانیه)` 
                    : 'ارسال مجدد کد'}
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
                  'تأیید و تکمیل ثبت‌نام'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              قبلاً حساب کاربری دارید؟{' '}
              <Link 
                href="/login" 
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              >
                وارد شوید
              </Link>
            </p>
            <p className="text-xs text-gray-500 text-center mt-4">
              با ثبت‌نام، شما با{' '}
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