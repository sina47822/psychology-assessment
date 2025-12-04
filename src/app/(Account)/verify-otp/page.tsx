'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { formatIranianPhone } from '@/lib/utils';
import { Shield, Smartphone, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const id = searchParams.get('identifier');
    if (id) {
      setIdentifier(id);
    }
    
    // تایمر
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!otp || otp.length !== 6) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔐 Verifying OTP:', { identifier, otp });
      
      // در اینجا باید OTP را تأیید کنید
      // این فقط یک نمونه است
      
      setSuccess('کد تأیید با موفقیت تأیید شد!');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error: any) {
      setError(error.message || 'کد تأیید نامعتبر است');
      console.error('❌ OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setError('');
    setSuccess('');
    
    try {
      console.log('🔄 Resending OTP for:', identifier);
      
      // در اینجا باید OTP جدید ارسال کنید
      // این فقط یک نمونه است
      
      setTimer(120);
      setCanResend(false);
      setSuccess('کد جدید ارسال شد');
      
    } catch (error: any) {
      setError('خطا در ارسال مجدد کد');
      console.error('❌ Resend OTP error:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-sky-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">تأیید کد یکبار مصرف</h1>
              </div>
            </Link>
            
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">بازگشت</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-sky-50 text-sky-600 mx-auto mb-4">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  تأیید شماره موبایل
                </h2>
                <p className="text-gray-600 text-sm">
                  کد تأیید به شماره{' '}
                  <span className="font-bold text-sky-600">
                    {formatIranianPhone(identifier)}
                  </span>{' '}
                  ارسال شد
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    کد تأیید ۶ رقمی
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
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

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">زمان باقی‌مانده:</span>
                    <span className="font-bold text-sky-600">{formatTime(timer)}</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={!canResend}
                    className={`text-sm ${canResend ? 'text-sky-600 hover:text-sky-800' : 'text-gray-400'} font-medium`}
                  >
                    {canResend ? 'ارسال مجدد کد' : 'صبر کنید'}
                  </button>
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
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
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
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال تأیید...
                    </span>
                  ) : (
                    'تأیید و ادامه'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}