// src/app/(Account)/register/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { checkPasswordStrength, formatIranianPhone } from '@/lib/utils';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { Shield, Home, Eye, EyeOff, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, isLoading: authLoading, isAuthenticated } = useAuth();
  
  // اطلاعات ثبت‌نام
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    national_code: '',
    birth_date: '',
    gender: '',
  });
  
  // وضعیت‌ها
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' });
  
  // اگر کاربر قبلاً لاگین کرده و سشن معتبر است، به داشبورد هدایت شود
  useEffect(() => {
    if (user && isAuthenticated && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, isAuthenticated, authLoading, router]);

  // بررسی قدرت رمز عبور
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    }
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // بررسی نام کاربری
    if (!formData.username.trim()) {
      setError('نام کاربری الزامی است');
      return false;
    }
    
    if (formData.username.length < 3) {
      setError('نام کاربری باید حداقل ۳ کاراکتر باشد');
      return false;
    }
    
    // بررسی ایمیل یا شماره تلفن
    if (!formData.email && !formData.phone) {
      setError('حداقل یکی از ایمیل یا شماره تلفن باید وارد شود');
      return false;
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('ایمیل معتبر نیست');
      return false;
    }
    
    if (formData.phone && !/^(\+98|0)?9\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('شماره تلفن معتبر نیست');
      return false;
    }
    
    // بررسی رمز عبور
    if (!formData.password) {
      setError('رمز عبور الزامی است');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return false;
    }
    
    if (formData.password !== formData.confirm_password) {
      setError('رمز عبور و تأیید آن مطابقت ندارند');
      return false;
    }
    
    // بررسی نام و نام خانوادگی
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError('نام و نام خانوادگی الزامی است');
      return false;
    }
    
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // ارسال درخواست ثبت‌نام
      const result = await register(formData);
      
      if (result.success) {
        setSuccess('ثبت‌نام با موفقیت انجام شد! در حال هدایت به داشبورد...');
        
        // تأخیر کوتاه برای نمایش پیام موفقیت
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(result.error?.detail || result.error?.message || 'خطا در ثبت‌نام');
        console.error('Registration error:', result.error);
      }
    } catch (error: any) {
      setError('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    if (passwordStrength.score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPhoneDisplay = () => {
    if (!formData.phone) return '';
    return formatIranianPhone(formData.phone);
  };

  // اگر کاربر در حال بررسی احراز هویت است، loading نمایش بده
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          <p className="text-gray-600">در حال بررسی وضعیت احراز هویت...</p>
        </div>
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
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">ثبت نام</h1>
                <p className="text-xs text-gray-500">{CONTACT_INFO.organization}</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
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
                  <UserPlus className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    ایجاد حساب کاربری
                  </h1>
                  <p className="text-gray-600 text-sm">
                    لطفاً اطلاعات خود را برای ثبت‌نام وارد کنید
                  </p>
                </div>
              </div>
            </div>

            {/* بدنه کارت */}
            <div className="p-6">
              <form onSubmit={handleRegister} className="space-y-6">
                {/* نام کاربری */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    نام کاربری *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-right"
                    placeholder="نام کاربری"
                    required
                    autoComplete="username"
                  />
                </div>

                {/* ایمیل */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left ltr"
                    placeholder="example@email.com"
                    dir="ltr"
                    autoComplete="email"
                  />
                </div>

                {/* شماره موبایل */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    شماره موبایل
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left ltr"
                    placeholder="09123456789"
                    dir="ltr"
                    autoComplete="tel"
                  />
                </div>

                {/* نام و نام خانوادگی */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      نام *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-right"
                      placeholder="نام"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-right"
                      placeholder="نام خانوادگی"
                      required
                    />
                  </div>
                </div>

                {/* رمز عبور */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    رمز عبور *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-right"
                      placeholder="رمز عبور"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">قدرت رمز عبور:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.score <= 2 ? 'text-red-600' :
                          passwordStrength.score <= 3 ? 'text-yellow-600' :
                          passwordStrength.score <= 4 ? 'text-blue-600' : 'text-green-600'
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

                {/* تأیید رمز عبور */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    تأیید رمز عبور *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      className="w-full p-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-right"
                      placeholder="تکرار رمز عبور"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* خطا و موفقیت */}
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

                {/* دکمه ثبت‌نام */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال ثبت‌نام...
                    </span>
                  ) : (
                    'ثبت‌نام'
                  )}
                </button>

                {/* لینک به صفحه ورود */}
                <div className="text-center text-sm text-gray-600">
                  قبلاً حساب کاربری دارید؟{' '}
                  <Link 
                    href="/login" 
                    className="text-sky-600 font-semibold hover:text-sky-800 transition-colors"
                  >
                    وارد شوید
                  </Link>
                </div>
              </form>

              {/* اطلاعات */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="space-y-2 text-xs text-gray-500">
                  <p className="text-center">
                    با ثبت‌نام، شما با{' '}
                    <Link href="/terms" className="text-sky-600 hover:text-sky-800 font-medium">
                      شرایط استفاده
                    </Link>{' '}
                    و{' '}
                    <Link href="/privacy" className="text-sky-600 hover:text-sky-800 font-medium">
                      حریم خصوصی
                    </Link>{' '}
                    موافقت می‌کنید
                  </p>
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