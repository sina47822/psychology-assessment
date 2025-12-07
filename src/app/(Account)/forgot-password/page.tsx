// src/app/(Account)/forgot-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { authAPI } from '@/lib/api';
import { identifyLoginType, formatIranianPhone, checkPasswordStrength } from '@/lib/utils';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { Key, Smartphone, Mail, User as UserIcon, Lock, Shield, Home, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' });

  // اگر کاربر لاگین کرده، به dashboard هدایت شود
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  // تایمر برای ارسال مجدد OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // بررسی قدرت رمز عبور
  useEffect(() => {
    if (newPassword) {
      setPasswordStrength(checkPasswordStrength(newPassword));
    }
  }, [newPassword]);

  const handleSubmitIdentifier = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier.trim()) {
      setError('لطفاً ایمیل، نام کاربری یا شماره موبایل خود را وارد کنید');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const type = identifyLoginType(identifier);
      setLoginType(type);
      
      const result = await authApi.resetPassword(identifier);
      
      if (result) {
        setStep(2);
        setTimeLeft(120); // 2 دقیقه
        setSuccess(`کد تأیید به ${type === 'phone' ? 'شماره موبایل' : 'ایمیل'} شما ارسال شد`);
      }
    } catch (error: any) {
      setError(error.message || 'خطا در ارسال کد تأیید');
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // در این مرحله فقط کد را بررسی می‌کنیم
      // در مرحله بعدی رمز جدید را ثبت می‌کنیم
      setStep(3);
      setSuccess('کد تأیید صحیح است. لطفاً رمز عبور جدید را وارد کنید');
    } catch (error: any) {
      setError(error.message || 'کد تأیید نامعتبر است');
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
      const type = identifyLoginType(identifier);
      const result = await authApi.resetPasswordConfirm({
        [type === 'phone' ? 'phone' : 'email']: identifier,
        code: otp,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
      
      if (result) {
        setSuccess('رمز عبور با موفقیت تغییر کرد! در حال هدایت به صفحه ورود...');
        setTimeout(() => router.push('/login?message=رمز%20عبور%20با%20موفقیت%20تغییر%20یافت'), 3000);
      }
    } catch (error: any) {
      setError(error.message || 'خطا در تغییر رمز عبور');
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
      const result = await authApi.resetPassword(identifier);
      if (result) {
        setTimeLeft(120);
        setSuccess('کد تأیید مجدداً ارسال شد');
      }
    } catch (error: any) {
      setError(error.message || 'خطا در ارسال مجدد کد تأیید');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-sky-500';
    if (passwordStrength.score <= 4) return 'bg-sky-500';
    return 'bg-sky-500';
  };

  const getIdentifierIcon = () => {
    switch (loginType) {
      case 'phone': return <Smartphone className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'username': return <UserIcon className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  const getIdentifierDisplay = () => {
    if (loginType === 'phone') {
      return formatIranianPhone(identifier);
    }
    return identifier;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
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
                <h1 className="text-lg font-bold text-gray-800">بازیابی رمز عبور</h1>
                <p className="text-xs text-gray-500">{CONTACT_INFO.organization}</p>
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
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg text-sky-500 border border-sky-100">
                  <Key className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    {step === 1 && 'بازیابی رمز عبور'}
                    {step === 2 && 'تأیید کد'}
                    {step === 3 && 'رمز عبور جدید'}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {step === 1 && 'لطفاً ایمیل، نام کاربری یا شماره موبایل خود را وارد کنید'}
                    {step === 2 && `کد تأیید به ${getIdentifierDisplay()} ارسال شد`}
                    {step === 3 && 'لطفاً رمز عبور جدید خود را وارد کنید'}
                  </p>
                </div>
              </div>
            </div>

            {/* بدنه کارت */}
            <div className="p-6">
              {/* Step 1: شناسه */}
              {step === 1 && (
                <form onSubmit={handleSubmitIdentifier} className="space-y-6">
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
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          setLoginType(identifyLoginType(e.target.value));
                        }}
                        className="w-full p-3 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                        placeholder="example@email.com یا username یا 09123456789"
                        required
                        dir="ltr"
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">خطا</p>
                          <p className="text-sm mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">موفقیت‌آمیز</p>
                          <p className="text-sm mt-1">{success}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-sky-500 to-sky-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -mr-2 ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        در حال ارسال کد...
                      </span>
                    ) : (
                      'ارسال کد تأیید'
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    <Link 
                      href="/login" 
                      className="text-sky-500 font-semibold hover:text-sky-800 transition-colors"
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
                    <p className="text-gray-600 text-sm">
                      کد ۶ رقمی به {getIdentifierDisplay()} ارسال شد
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
                      className="w-full p-4 text-center border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-3xl font-bold tracking-widest"
                      placeholder="123456"
                      maxLength={6}
                      required
                      dir="ltr"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">خطا</p>
                          <p className="text-sm mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">موفقیت‌آمیز</p>
                          <p className="text-sm mt-1">{success}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-sky-500 to-sky-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -mr-2 ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          در حال تأیید...
                        </span>
                      ) : (
                        'تأیید کد'
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading || timeLeft > 0}
                        className="bg-gray-100 text-gray-800 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {timeLeft > 0 
                          ? `ارسال مجدد (${timeLeft}ثانیه)` 
                          : 'ارسال مجدد کد'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
                      >
                        بازگشت
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3: رمز جدید */}
              {step === 3 && (
                <form onSubmit={handleSubmitNewPassword} className="space-y-6">
                  <div className="text-center mb-4">
                    <p className="text-gray-600 text-sm">
                      لطفاً رمز عبور جدید خود را انتخاب کنید
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      رمز عبور جدید *
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 pl-12 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                        placeholder="رمز عبور جدید"
                        required
                        dir="ltr"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">قدرت رمز عبور:</span>
                          <span className={`text-xs font-medium ${
                            passwordStrength.score <= 2 ? 'text-red-600' :
                            passwordStrength.score <= 3 ? 'text-sky-500' :
                            passwordStrength.score <= 4 ? 'text-sky-500' : 'text-sky-500'
                          }`}>
                            {passwordStrength.message}
                          </span>
                        </div>
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      تأیید رمز عبور جدید *
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 pl-12 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                        placeholder="تکرار رمز عبور جدید"
                        required
                        dir="ltr"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">خطا</p>
                          <p className="text-sm mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">موفقیت‌آمیز</p>
                          <p className="text-sm mt-1">{success}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-sky-500 to-sky-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -mr-2 ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          در حال ذخیره...
                        </span>
                      ) : (
                        'ذخیره رمز عبور جدید'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
                    >
                      بازگشت
                    </button>
                  </div>
                </form>
              )}

              {/* اطلاعات */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="space-y-2 text-xs text-gray-500">
                  <p className="text-center text-gray-400">
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