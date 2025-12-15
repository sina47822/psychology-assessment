'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, RotateCcw, CheckCircle, XCircle, Lock } from 'lucide-react';

interface OTPVerificationProps {
  phoneNumber: string;
  email?: string;
  onVerify: (otp: string) => Promise<{ success: boolean; message?: string }>;
  onResend: () => Promise<{ success: boolean; message?: string }>;
  verificationType: 'phone' | 'email';
  redirectTo?: string;
  title?: string;
  subtitle?: string;
}

export default function OTPVerification({
  phoneNumber,
  email,
  onVerify,
  onResend,
  verificationType = 'phone',
  redirectTo = '/',
  title,
  subtitle
}: OTPVerificationProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 دقیقه
  const [isVerified, setIsVerified] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // تایمر برای ارسال مجدد
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // فوکوس روی اولین input هنگام لود
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // فقط اعداد مجاز هستند
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    // اگر کاربر پاک کرد
    if (value === '') {
      newOtp[index] = '';
      setOtp(newOtp);
      
      // به input قبلی برو
      if (index > 0) {
        setActiveInput(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    // فقط یک رقم مجاز است
    const digit = value.charAt(value.length - 1);
    newOtp[index] = digit;
    setOtp(newOtp);

    // به input بعدی برو
    if (index < 5 && digit) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // پاک کردن با Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    
    // رفتن به چپ
    if (e.key === 'ArrowLeft' && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    
    // رفتن به راست
    if (e.key === 'ArrowRight' && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('').slice(0, 6);
      setOtp(digits);
      setActiveInput(5);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await onVerify(otpCode);
      
      if (result.success) {
        setIsVerified(true);
        setSuccess(result.message || 'کد تأیید صحیح است!');
        
        // ریدایرکت بعد از 2 ثانیه
        setTimeout(() => {
          router.push(redirectTo);
        }, 2000);
      } else {
        setError(result.message || 'کد تأیید نامعتبر است');
        // پاک کردن OTP در صورت خطا
        setOtp(Array(6).fill(''));
        setActiveInput(0);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError('خطا در تأیید کد. لطفاً مجدداً تلاش کنید');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) {
      setError(`لطفاً ${timeLeft} ثانیه دیگر تلاش کنید`);
      return;
    }

    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const result = await onResend();
      
      if (result.success) {
        setTimeLeft(120); // ریست تایمر
        setSuccess(result.message || 'کد تأیید مجدداً ارسال شد');
        setOtp(Array(6).fill(''));
        setActiveInput(0);
        inputRefs.current[0]?.focus();
      } else {
        setError(result.message || 'خطا در ارسال مجدد کد');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getIdentifier = () => {
    if (verificationType === 'phone') {
      return phoneNumber.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return email;
  };

  const defaultTitle = title || `تأیید ${verificationType === 'phone' ? 'شماره موبایل' : 'ایمیل'}`;
  const defaultSubtitle = subtitle || `کد تأیید به ${getIdentifier()} ارسال شد`;

  return (
    <div className="w-full">
      {/* هدر */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isVerified ? 'bg-sky-100' : 'bg-sky-100'
        }`}>
          {isVerified ? (
            <CheckCircle className="h-8 w-8 text-sky-500" />
          ) : verificationType === 'phone' ? (
            <Smartphone className="h-8 w-8 text-sky-500" />
          ) : (
            <Lock className="h-8 w-8 text-sky-500" />
          )}
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          {defaultTitle}
        </h2>
        
        <p className="text-gray-600">
          {defaultSubtitle}
        </p>
        
        <div className="mt-4 inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-full">
          <span className="font-medium">{getIdentifier()}</span>
        </div>
      </div>

      {/* فرم OTP */}
      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-4 text-center">
            لطفاً کد ۶ رقمی را وارد کنید
          </label>
          
          <div className="flex justify-center gap-2 md:gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setActiveInput(index)}
                className={`w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
                  activeInput === index
                    ? 'border-sky-500 bg-sky-50'
                    : digit
                    ? 'border-sky-500 bg-sky-50'
                    : 'border-gray-300 bg-white'
                } ${
                  error ? 'border-red-300' : ''
                }`}
                disabled={isLoading || isVerified}
                autoComplete="one-time-code"
              />
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-500">
            کد تست برای توسعه: <span className="font-bold text-gray-700">123456</span>
          </p>
        </div>

        {/* پیام‌های خطا و موفقیت */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* دکمه تأیید */}
        <button
          type="submit"
          disabled={isLoading || otp.join('').length !== 6 || isVerified}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
            isLoading || otp.join('').length !== 6 || isVerified
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-sky-500 hover:bg-sky-700 shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              در حال تأیید...
            </span>
          ) : isVerified ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              تأیید شده
            </span>
          ) : (
            'تأیید کد'
          )}
        </button>

        {/* بخش ارسال مجدد */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              کد را دریافت نکرده‌اید؟
            </p>
            
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending || timeLeft > 0}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isResending || timeLeft > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-sky-500 hover:text-sky-800 hover:bg-sky-50'
              }`}
            >
              <RotateCcw className={`h-5 w-5 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'در حال ارسال...' : 'ارسال مجدد کد'}
            </button>
            
            {timeLeft > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {formatTime(timeLeft)} تا امکان ارسال مجدد
              </p>
            )}
          </div>
        </div>

        {/* نکات مهم */}
        <div className="mt-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
          <h4 className="font-medium text-sky-800 mb-2">توجه:</h4>
          <ul className="text-sm text-sky-700 space-y-1 pr-4">
            <li>• کد تأیید فقط ۱۰ دقیقه معتبر است</li>
            <li>• کد را با کسی به اشتراک نگذارید</li>
            <li>• در صورت عدم دریافت کد، شماره یا ایمیل خود را بررسی کنید</li>
            <li>• در صورت بروز مشکل با پشتیبانی تماس بگیرید</li>
          </ul>
        </div>
      </form>

      {/* راهنمایی */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">راهنمای وارد کردن کد:</h4>
        <ul className="text-sm text-gray-600 space-y-1 pr-4">
          <li>• می‌توانید کد را در اولین خانه paste کنید</li>
          <li>• از کلیدهای جهت‌دار برای حرکت بین خانه‌ها استفاده کنید</li>
          <li>• با Backspace می‌توانید به خانه قبلی برگردید</li>
          <li>• بعد از وارد کردن ۶ رقم، دکمه تأیید فعال می‌شود</li>
        </ul>
      </div>
    </div>
  );
}