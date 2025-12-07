'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Smartphone, Lock, Key, CheckCircle, XCircle } from 'lucide-react';
import { identifyLoginType } from '@/lib/utils';

interface ForgotPasswordFormProps {
  onSubmit: (data: {
    identifier: string;
    identifierType: 'email' | 'username' | 'phone';
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<{ success: boolean; message?: string }>;
  onResendOTP: (identifier: string) => Promise<{ success: boolean; message?: string }>;
  isLoading: boolean;
  initialStep?: number;
}

export default function ForgotPasswordForm({
  onSubmit,
  onResendOTP,
  isLoading,
  initialStep = 1
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState(initialStep);
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState<'email' | 'username' | 'phone'>('email');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // تایمر برای ارسال مجدد OTP
  // (این useEffect در component parent باید باشد)

  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // تشخیص نوع شناسه
    const type = identifyLoginType(identifier);
    setIdentifierType(type);

    // اعتبارسنجی
    if (!identifier.trim()) {
      setError('لطفاً ایمیل، نام کاربری یا شماره موبایل خود را وارد کنید');
      return;
    }

    setIsSendingOTP(true);

    try {
      const result = await onResendOTP(identifier);
      
      if (result.success) {
        setStep(2);
        setTimeLeft(120); // 2 دقیقه
        setSuccess(`کد تأیید به ${type === 'phone' ? 'شماره موبایل' : 'ایمیل'} شما ارسال شد`);
      } else {
        setError(result.message || 'خطا در ارسال کد تأیید');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error('Error sending OTP:', error);
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید');
      return;
    }

    // اعتبارسنجی OTP (در محیط واقعی باید از سرور چک شود)
    if (otp !== '123456') {
      setError('کد تأیید نامعتبر است');
      return;
    }

    setStep(3);
    setSuccess('کد تأیید صحیح است. لطفاً رمز عبور جدید را وارد کنید');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    
    // اعتبارسنجی رمز عبور
    setPasswordValidation({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    });
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // اعتبارسنجی
    if (newPassword !== confirmPassword) {
      setError('رمز عبور و تأیید رمز عبور مطابقت ندارند');
      return;
    }

    if (!passwordValidation.length) {
      setError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return;
    }

    try {
      const result = await onSubmit({
        identifier,
        identifierType,
        otp,
        newPassword,
        confirmPassword
      });

      if (result.success) {
        setSuccess(result.message || 'رمز عبور با موفقیت تغییر کرد!');
        setStep(4); // مرحله موفقیت
      } else {
        setError(result.message || 'خطا در تغییر رمز عبور');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error('Password reset error:', error);
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
      const result = await onResendOTP(identifier);
      if (result.success) {
        setTimeLeft(120);
        setSuccess('کد تأیید مجدداً ارسال شد');
      } else {
        setError(result.message || 'خطا در ارسال مجدد کد تأیید');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsSendingOTP(false);
    }
  };

  const getIdentifierIcon = () => {
    switch (identifierType) {
      case 'phone': return <Smartphone className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'username': return <Key className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'بازیابی رمز عبور';
      case 2: return 'تأیید کد';
      case 3: return 'رمز عبور جدید';
      case 4: return 'موفقیت آمیز';
      default: return 'بازیابی رمز عبور';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'لطفاً ایمیل، نام کاربری یا شماره موبایل خود را وارد کنید';
      case 2: return `کد تأیید به ${identifier} ارسال شد`;
      case 3: return 'لطفاً رمز عبور جدید خود را وارد کنید';
      case 4: return 'رمز عبور شما با موفقیت تغییر کرد';
      default: return '';
    }
  };

  // مرحله 1: وارد کردن شناسه
  const renderStep1 = () => (
    <form onSubmit={handleIdentifierSubmit} className="space-y-6">
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
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="example@email.com یا username یا 09123456789"
            required
            dir="ltr"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          کد تأیید به این آدرس ارسال خواهد شد
        </p>
      </div>

      <button
        type="submit"
        disabled={isSendingOTP || !identifier.trim()}
        className={`w-full bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition-all ${
          isSendingOTP || !identifier.trim()
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-sky-700 shadow-md hover:shadow-lg'
        }`}
      >
        {isSendingOTP ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            در حال ارسال کد...
          </span>
        ) : (
          'ارسال کد تأیید'
        )}
      </button>
    </form>
  );

  // مرحله 2: وارد کردن OTP
  const renderStep2 = () => (
    <form onSubmit={handleOTPSubmit} className="space-y-6">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full mb-3">
          <Key className="h-6 w-6 text-sky-500" />
        </div>
        <p className="text-gray-600">
          کد ۶ رقمی ارسال شده را وارد کنید
        </p>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium text-center">
          کد تأیید (OTP)
        </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-2xl font-bold"
          placeholder="123456"
          required
          dir="ltr"
          maxLength={6}
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          کد تست: <span className="font-bold">123456</span>
        </p>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isSendingOTP || timeLeft > 0}
          className={`text-sm ${isSendingOTP || timeLeft > 0 ? 'text-gray-400' : 'text-sky-500 hover:text-sky-800'}`}
        >
          {isSendingOTP ? 'در حال ارسال...' : 'ارسال مجدد کد'}
          {timeLeft > 0 && ` (${timeLeft} ثانیه)`}
        </button>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
          بازگشت
        </button>
        <button
          type="submit"
          disabled={otp.length !== 6}
          className={`flex-1 bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
            otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-700'
          }`}
        >
          تأیید کد
        </button>
      </div>
    </form>
  );

  // مرحله 3: رمز عبور جدید
  const renderStep3 = () => (
    <form onSubmit={handleNewPasswordSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          رمز عبور جدید
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="رمز عبور جدید"
            required
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* اعتبارسنجی رمز عبور */}
        <div className="mt-3 space-y-2">
          {[
            { key: 'length', text: 'حداقل ۸ کاراکتر', isValid: passwordValidation.length },
            { key: 'uppercase', text: 'حداقل یک حرف بزرگ', isValid: passwordValidation.uppercase },
            { key: 'lowercase', text: 'حداقل یک حرف کوچک', isValid: passwordValidation.lowercase },
            { key: 'number', text: 'حداقل یک عدد', isValid: passwordValidation.number },
            { key: 'special', text: 'حداقل یک نماد ویژه', isValid: passwordValidation.special }
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              {item.isValid ? (
                <CheckCircle className="h-4 w-4 text-sky-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-300" />
              )}
              <span className={`text-sm ${item.isValid ? 'text-sky-500' : 'text-gray-500'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          تأیید رمز عبور جدید
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="تکرار رمز عبور جدید"
            required
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {confirmPassword && newPassword !== confirmPassword && (
          <p className="text-red-500 text-sm mt-1">رمز عبور و تأیید آن مطابقت ندارند</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
          بازگشت
        </button>
        <button
          type="submit"
          disabled={isLoading || newPassword !== confirmPassword || !passwordValidation.length}
          className={`flex-1 bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
            isLoading || newPassword !== confirmPassword || !passwordValidation.length
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-sky-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              در حال تغییر...
            </span>
          ) : (
            'تغییر رمز عبور'
          )}
        </button>
      </div>
    </form>
  );

  // مرحله 4: موفقیت
  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-4">
        <CheckCircle className="h-10 w-10 text-sky-500" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">رمز عبور با موفقیت تغییر کرد!</h3>
        <p className="text-gray-600">
          اکنون می‌توانید با رمز عبور جدید وارد حساب کاربری خود شوید
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/login"
          className="block w-full bg-sky-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors"
        >
          ورود به حساب کاربری
        </Link>
        <Link
          href="/"
          className="block w-full bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* نوار پیشرفت */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">{getStepTitle()}</h2>
          <span className="text-sm text-gray-600">مرحله {step} از 4</span>
        </div>
        
        <p className="text-gray-600 mb-4">{getStepDescription()}</p>
        
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-sky-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* پیام‌های خطا و موفقیت */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && step !== 4 && (
        <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      {/* محتوای هر مرحله */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}

      {/* لینک‌های کمکی */}
      {step !== 4 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center space-y-3">
            <Link
              href="/login"
              className="text-sm text-sky-500 hover:text-sky-800 transition-colors block"
            >
              ← بازگشت به صفحه ورود
            </Link>
            <p className="text-xs text-gray-500">
              در صورت مشکل در بازیابی رمز عبور با پشتیبانی تماس بگیرید
            </p>
          </div>
        </div>
      )}
    </div>
  );
}