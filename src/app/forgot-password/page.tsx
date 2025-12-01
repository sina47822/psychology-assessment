'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { sendOTP, resetPassword } from '@/lib/auth';
import { identifyLoginType } from '@/lib/utils';
import { APP_INFO } from '@/data/constants';
import { Lock, Smartphone, Mail, User as UserIcon, Key } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(1); // 1: شناسه، 2: OTP، 3: رمز جدید
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [loginType, setLoginType] = useState<'email' | 'username' | 'phone'>('email');

  // اگر کاربر لاگین کرده، به dashboard هدایت شود
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

  const handleSubmitIdentifier = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const type = identifyLoginType(identifier);
      setLoginType(type);
      
      const result = await sendOTP(identifier);
      
      if (result.success) {
        setStep(2);
        setTimeLeft(120); // 2 دقیقه
        setSuccess(`کد تأیید به ${type === 'phone' ? 'شماره موبایل' : 'ایمیل'} شما ارسال شد`);
      } else {
        setError('خطا در ارسال کد تأیید');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // در محیط واقعی، باید OTP تأیید شود
      if (otp === '123456') { // OTP ثابت برای توسعه
        setStep(3);
        setSuccess('کد تأیید صحیح است. لطفاً رمز عبور جدید را وارد کنید');
      } else {
        setError('کد تأیید نامعتبر است');
      }
    } catch (error) {
      setError('خطا در تأیید کد');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('رمز عبور و تأیید رمز عبور مطابقت ندارند');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await resetPassword(identifier, newPassword, otp);
      
      if (result.success) {
        setSuccess('رمز عبور با موفقیت تغییر کرد! در حال هدایت به صفحه ورود...');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setError(result.message || 'خطا در تغییر رمز عبور');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) {
      setError(`لطفاً ${timeLeft} ثانیه دیگر تلاش کنید`);
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await sendOTP(identifier);
      if (result.success) {
        setTimeLeft(120);
        setSuccess('کد تأیید مجدداً ارسال شد');
      } else {
        setError('خطا در ارسال مجدد کد تأیید');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
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
            <Key className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {step === 1 && 'بازیابی رمز عبور'}
            {step === 2 && 'تأیید کد'}
            {step === 3 && 'رمز عبور جدید'}
          </h1>
          <p className="text-gray-600">
            {step === 1 && 'لطفاً ایمیل، نام کاربری یا شماره موبایل خود را وارد کنید'}
            {step === 2 && 'کد تأیید ارسال شده را وارد کنید'}
            {step === 3 && 'لطفاً رمز عبور جدید خود را وارد کنید'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          {/* Step 1: شناسه */}
          {step === 1 && (
            <form onSubmit={handleSubmitIdentifier} className="space-y-6">
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
                    در حال ارسال کد...
                  </span>
                ) : (
                  'ارسال کد تأیید'
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                <Link 
                  href="/login" 
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  ← بازگشت به صفحه ورود
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleSubmitOTP} className="space-y-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">تأیید کد</h3>
                <p className="text-gray-600 text-sm mt-2">
                  کد تأیید به {identifier} ارسال شد
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
                  disabled={isLoading || timeLeft > 0}
                  className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  {timeLeft > 0 
                    ? `ارسال مجدد (${timeLeft}ثانیه)` 
                    : 'ارسال مجدد کد'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
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

          {/* Step 3: رمز جدید */}
          {step === 3 && (
            <form onSubmit={handleSubmitNewPassword} className="space-y-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">رمز عبور جدید</h3>
                <p className="text-gray-600 text-sm mt-2">
                  لطفاً رمز عبور جدید خود را انتخاب کنید
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  رمز عبور جدید
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="رمز عبور جدید"
                    required
                    dir="ltr"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک، عدد و نماد
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  تأیید رمز عبور جدید
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="تکرار رمز عبور جدید"
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

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-600"
                >
                  بازگشت
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-green-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    در حال ذخیره...
                  </span>
                ) : (
                  'ذخیره رمز عبور جدید'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center">
              سیستم نسخه {APP_INFO.version}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}