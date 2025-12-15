// src/app/(Account)/verify-account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { Shield, Mail, Phone, CheckCircle, AlertCircle, ArrowLeft, Home, RefreshCw, UserCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyAccountPage() {
  const router = useRouter();
  const { user, is_authenticated, isLoading, checkSession } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone' | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      if (!isLoading) {
        // اگر کاربر احراز هویت نشده، به لاگین هدایت کن
        if (!is_authenticated || !user) {
          console.log('➡️ Redirecting to login - not authenticated');
          toast.error('لطفاً ابتدا وارد حساب کاربری خود شوید');
          setTimeout(() => {
            router.push('/login');
          }, 1500);
          return;
        }

        // بررسی سشن در سرور
        try {
          const sessionValid = await checkSession();
          if (!sessionValid) {
            console.log('➡️ Session invalid, redirecting to login');
            toast.error('سشن شما منقضی شده است');
            setTimeout(() => {
              router.push('/login?session=expired');
            }, 1500);
            return;
          }
        } catch (error) {
          console.error('Session check error:', error);
        }

        // اگر کاربر قبلاً تأیید شده، به داشبورد هدایت کن
        if (user.is_verified) {
          console.log('✅ User already verified, redirecting to dashboard');
          toast.success('حساب کاربری شما قبلاً تأیید شده است');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
          return;
        }

        // تعیین روش تأیید (ترجیح با ایمیل، سپس موبایل)
        if (user.email) {
          setVerificationMethod('email');
        } else if (user.phone) {
          setVerificationMethod('phone');
        }

        setIsChecking(false);
      }
    };

    verifyAccess();
  }, [user, is_authenticated, isLoading, router, checkSession]);

  // تایمر برای ارسال مجدد کد
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // ارسال کد تأیید
  const handleSendVerification = async () => {
    if (!canResend) return;

    toast.loading('در حال ارسال کد تأیید...');
    try {
      // API call for sending verification code
      // در اینجا باید API مربوطه را فراخوانی کنید
      await new Promise(resolve => setTimeout(resolve, 1000)); // شبیه‌سازی API call
      
      toast.dismiss();
      toast.success('کد تأیید با موفقیت ارسال شد');
      
      // ریست تایمر
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      toast.dismiss();
      toast.error('خطا در ارسال کد تأیید');
      console.error('Send verification error:', error);
    }
  };

  // تأیید کد
  const handleVerifyCode = async () => {
    toast.loading('در حال تأیید کد...');
    try {
      // API call for verifying code
      // در اینجا باید API مربوطه را فراخوانی کنید
      await new Promise(resolve => setTimeout(resolve, 1000)); // شبیه‌سازی API call
      
      toast.dismiss();
      toast.success('حساب کاربری شما با موفقیت تأیید شد!');
      
      // تأخیر برای نمایش پیام موفقیت
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      toast.dismiss();
      toast.error('کد تأیید نامعتبر است');
      console.error('Verification error:', error);
    }
  };

  // اگر در حال بررسی است
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-sky-50 p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
          <p className="text-gray-600">در حال بررسی وضعیت حساب...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            fontFamily: 'Vazirmatn, system-ui, -apple-system, sans-serif',
            textAlign: 'right',
          },
          success: {
            style: {
              border: '1px solid #10b981',
              background: '#f0fdf4',
              color: '#065f46',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#f0fdf4',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              background: '#fef2f2',
              color: '#991b1b',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },
        }}
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-sky-50">
        {/* هدر */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">تأیید حساب کاربری</h1>
                  <p className="text-xs text-gray-500">مرحله نهایی ثبت‌نام</p>
                </div>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="text-sm font-medium hidden md:inline">صفحه اصلی</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-sky-500 hover:text-sky-800 font-medium"
                >
                  <span className="text-sm">داشبورد</span>
                  <ArrowLeft className="h-4 w-4" />
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
              <div className="bg-gradient-to-r from-amber-50 to-amber-50 p-6 border-b border-amber-100">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg text-amber-600 border border-amber-100">
                    <UserCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-800 mb-2">
                      تأیید حساب کاربری
                    </h1>
                    <p className="text-gray-600 text-sm">
                      برای تکمیل ثبت‌نام، لطفاً حساب خود را تأیید کنید
                    </p>
                  </div>
                </div>
              </div>

              {/* بدنه کارت */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* پیام خوش‌آمدگویی */}
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      خوش آمدید، {user?.first_name} عزیز!
                    </h2>
                    <p className="text-gray-600 text-sm">
                      ثبت‌نام شما با موفقیت انجام شد. برای فعال‌سازی کامل حساب، لطفاً یکی از روش‌های زیر را انتخاب کنید.
                    </p>
                  </div>

                  {/* انتخاب روش تأیید */}
                  <div className="space-y-4">
                    {/* تأیید از طریق ایمیل */}
                    {verificationMethod === 'email' && user?.email && (
                      <div className="border border-sky-200 rounded-xl overflow-hidden">
                        <div className="bg-sky-50 p-4 flex items-center">
                          <Mail className="h-5 w-5 text-sky-500 ml-3" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">تأیید از طریق ایمیل</h3>
                            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                          </div>
                          <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <p className="text-sm text-gray-600">
                            لینک تأیید به ایمیل شما ارسال شده است. لطفاً صندوق ایمیل خود را بررسی کنید و روی لینک تأیید کلیک کنید.
                          </p>
                          
                          <div className="space-y-3">
                            <button
                              onClick={handleSendVerification}
                              disabled={!canResend}
                              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center space-x-2 ${
                                canResend 
                                  ? 'bg-sky-100 text-sky-700 hover:bg-sky-200' 
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span>
                                {canResend ? 'ارسال مجدد کد تأیید' : `ارسال مجدد پس از ${countdown} ثانیه`}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* تأیید از طریق پیامک */}
                    {verificationMethod === 'phone' && user?.phone && (
                      <div className="border border-sky-200 rounded-xl overflow-hidden">
                        <div className="bg-sky-50 p-4 flex items-center">
                          <Phone className="h-5 w-5 text-sky-500 ml-3" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">تأیید از طریق پیامک</h3>
                            <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
                          </div>
                          <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <p className="text-sm text-gray-600">
                            کد تأیید ۶ رقمی به شماره موبایل شما ارسال شده است.
                          </p>
                          
                          <div className="space-y-3">
                            {/* فیلدهای ورود کد */}
                            <div className="grid grid-cols-6 gap-2">
                              {[...Array(6)].map((_, index) => (
                                <input
                                  key={index}
                                  type="text"
                                  maxLength={1}
                                  className="w-full h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                                  dir="ltr"
                                />
                              ))}
                            </div>
                            
                            <button
                              onClick={handleVerifyCode}
                              className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition-colors"
                            >
                              تأیید کد
                            </button>
                            
                            <button
                              onClick={handleSendVerification}
                              disabled={!canResend}
                              className={`w-full py-2 text-sm flex items-center justify-center space-x-2 ${
                                canResend 
                                  ? 'text-sky-500 hover:text-sky-800' 
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <RefreshCw className="h-3 w-3" />
                              <span>
                                {canResend ? 'ارسال مجدد کد' : `ارسال مجدد پس از ${countdown} ثانیه`}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* هشدار مهم */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-600 ml-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">توجه مهم</p>
                        <p className="text-sm text-amber-700 mt-1">
                          تا زمانی که حساب خود را تأیید نکنید، برخی امکانات سیستم برای شما غیرفعال خواهد بود.
                          شما می‌توانید تأیید حساب را برای بعد موکول کنید.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* دکمه‌های اقدام */}
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="w-full bg-gradient-to-r from-sky-500 to-sky-500 text-white py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>ادامه به داشبورد</span>
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    
                    <Link
                      href="/"
                      className="block w-full text-center text-gray-600 hover:text-sky-500 py-2 transition-colors"
                    >
                      بازگشت به صفحه اصلی
                    </Link>
                  </div>

                  {/* اطلاعات کاربر */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 text-center">
                      نام کاربری: <span className="font-mono text-gray-700">{user?.username}</span>
                      {user?.email && ` • ایمیل: ${user.email}`}
                      {user?.phone && ` • موبایل: ${user.phone}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* پیوندهای کمکی */}
            <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
              <p>
                مشکلی در تأیید حساب دارید؟{' '}
                <Link href="/contact" className="text-sky-500 hover:text-sky-800 font-medium">
                  با پشتیبانی تماس بگیرید
                </Link>
              </p>
              <p className="text-gray-400">
                سیستم نسخه 1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}