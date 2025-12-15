// src/app/(Account)/register/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { checkPasswordStrength, formatIranianPhone } from '@/lib/utils';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { Shield, Home, Eye, EyeOff, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, isLoading: authLoading, is_authenticated } = useAuth();
  
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
    if (user && is_authenticated && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, is_authenticated, authLoading, router]);

  // بررسی قدرت رمز عبور
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    }
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // برای تاریخ تولد، فقط اعداد فارسی و لاتین بپذیر
    if (name === 'birth_date') {
      // حذف کاراکترهای غیرعددی (به جز / و -)
      const cleanedValue = value.replace(/[^0-9۰-۹\/\-]/g, '');
      // اگر کاربر تاریخ فارسی وارد کرد، به انگلیسی تبدیل کن
      const englishValue = cleanedValue
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
        .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
      
      setFormData(prev => ({
        ...prev,
        [name]: englishValue
      }));
      
      // نمایش پیش‌نمایش
      if (englishValue.length === 8) {
        const year = englishValue.substring(0, 4);
        const month = englishValue.substring(4, 6);
        const day = englishValue.substring(6, 8);
        console.log(`تاریخ وارد شده: ${year}/${month}/${day}`);
      }
      
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // بررسی نام کاربری
    if (!formData.username.trim()) {
      toast.error('نام کاربری الزامی است');
      return false;
    }
    
    if (formData.username.length < 3) {
      toast.error('نام کاربری باید حداقل ۳ کاراکتر باشد');
      return false;
    }
    
    // بررسی ایمیل یا شماره تلفن (حداقل یکی)
    if (!formData.email?.trim() && !formData.phone?.trim()) {
      toast.error('حداقل یکی از ایمیل یا شماره تلفن باید وارد شود');
      return false;
    }
    
    // بررسی ایمیل (اگر وارد شده)
    if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('ایمیل معتبر نیست');
      return false;
    }
    
    // بررسی شماره تلفن (اگر وارد شده)
    if (formData.phone?.trim()) {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 11 || !cleanPhone.startsWith('09')) {
        toast.error('شماره تلفن باید 11 رقمی و با 09 شروع شود');
        return false;
      }
    }
    
    // بررسی رمز عبور
    if (!formData.password) {
      toast.error('رمز عبور الزامی است');
      return false;
    }
    
    if (formData.password.length < 8) {
      toast.error('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return false;
    }
    
    if (formData.password !== formData.confirm_password) {
      toast.error('رمز عبور و تأیید آن مطابقت ندارند');
      return false;
    }
    
    // بررسی نام و نام خانوادگی
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error('نام و نام خانوادگی الزامی است');
      return false;
    }
    
    return true;
  };

  // تابع برای پردازش خطاهای سرور و نمایش در توست
  const processServerErrors = (errors: any) => {
    if (!errors) return;
    
    // اگر errors یک آبجکت است (مثل خطاهای فیلدها)
    if (typeof errors === 'object' && !Array.isArray(errors)) {
      Object.entries(errors).forEach(([field, errorList]) => {
        if (Array.isArray(errorList)) {
          errorList.forEach((error: any) => {
            // تبدیل نام فیلد به فارسی برای نمایش بهتر
            const fieldName = getFieldPersianName(field);
            
            // اگر error یک آبجکت است (مثل ErrorDetail در Django)
            if (typeof error === 'object') {
              if (error.string) {
                toast.error(`${fieldName}: ${error.string}`);
              } else if (error.message) {
                toast.error(`${fieldName}: ${error.message}`);
              } else {
                toast.error(`${fieldName}: خطای نامشخص`);
              }
            } else if (typeof error === 'string') {
              toast.error(`${fieldName}: ${error}`);
            }
          });
        } else if (typeof errorList === 'string') {
          toast.error(errorList);
        }
      });
    } 
    // اگر errors یک رشته است
    else if (typeof errors === 'string') {
      toast.error(errors);
    }
    // اگر errors یک آرایه است
    else if (Array.isArray(errors)) {
      errors.forEach(error => {
        if (typeof error === 'string') {
          toast.error(error);
        }
      });
    }
  };

  // تابع برای تبدیل نام فیلد انگلیسی به فارسی
  const getFieldPersianName = (field: string): string => {
    const fieldNames: Record<string, string> = {
      'username': 'نام کاربری',
      'email': 'ایمیل',
      'phone': 'شماره تلفن',
      'password': 'رمز عبور',
      'confirm_password': 'تأیید رمز عبور',
      'first_name': 'نام',
      'last_name': 'نام خانوادگی',
      'national_code': 'کد ملی',
      'birth_date': 'تاریخ تولد',
      'gender': 'جنسیت',
    };
    
    return fieldNames[field] || field;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    toast.dismiss(); // پاک کردن توست‌های قبلی

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // ایجاد آبجکت ثبت‌نام
      const registrationData: Record<string, any> = {
        username: formData.username.trim(),
        password: formData.password,
        confirm_password: formData.confirm_password,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
      };
      
      // اضافه کردن فیلدهای اختیاری فقط اگر مقدار دارند
      if (formData.email?.trim()) registrationData.email = formData.email.trim();
      if (formData.phone?.trim()) registrationData.phone = formData.phone.trim();
      if (formData.national_code?.trim()) registrationData.national_code = formData.national_code.trim();
      if (formData.birth_date?.trim()) registrationData.birth_date = formData.birth_date.trim();
      if (formData.gender) registrationData.gender = formData.gender;

      console.log('📤 Sending registration data:', registrationData);
      
      const result = await register(registrationData);
      
      if (result.success) {
        toast.success('ثبت‌نام با موفقیت انجام شد! در حال هدایت...');
        setSuccess('ثبت‌نام با موفقیت انجام شد! در حال هدایت به صفحه تأیید حساب...');
        
        setTimeout(() => {
          router.push('/verify-account');
        }, 2000);
      } else {
        // نمایش خطاهای سرور در توست
        processServerErrors(result.error);
        
        // همچنین نمایش خطا در state برای نمایش در فرم
        if (result.error?.detail) {
          setError(result.error.detail);
        } else if (typeof result.error === 'string') {
          setError(result.error);
        } else {
          setError('خطا در ثبت‌نام. لطفاً اطلاعات را بررسی کنید.');
        }
        
        console.error('Registration error:', result.error);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // نمایش خطای عمومی
      toast.error('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
      setError('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
      
      // اگر خطای شبکه یا سرور داریم
      if (error.response?.data) {
        processServerErrors(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // افزودن helper برای نمایش تاریخ فارسی
  const formatJalaliDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return '';
    
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    
    return `${year}/${month}/${day}`;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-sky-500';
    if (passwordStrength.score <= 4) return 'bg-sky-500';
    return 'bg-sky-500';
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
          <p className="text-gray-600">در حال بررسی وضعیت احراز هویت...</p>
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
                  <h1 className="text-lg font-bold text-gray-800">ثبت نام</h1>
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
                  {/* نام کاربری (اجباری) */}
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

                  {/* ایمیل (اختیاری) */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      ایمیل (اختیاری)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left ltr"
                      placeholder="example@email.com (اختیاری)"
                      dir="ltr"
                      autoComplete="email"
                    />
                  </div>

                  {/* شماره موبایل (اختیاری) */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      شماره موبایل (اختیاری)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left ltr"
                      placeholder="09123456789 (اختیاری)"
                      dir="ltr"
                      autoComplete="tel"
                    />
                  </div>

                  {/* کد ملی (اختیاری) */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      کد ملی (اختیاری)
                    </label>
                    <input
                      type="text"
                      name="national_code"
                      value={formData.national_code}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left ltr"
                      placeholder="کد ملی (اختیاری)"
                      dir="ltr"
                      maxLength={10}
                    />
                  </div>

                  {/* تاریخ تولد (اختیاری) */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      تاریخ تولد (شمسی) (اختیاری)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-left ltr"
                        placeholder="13700101 (۸ رقم بدون خط تیره)"
                        dir="ltr"
                        maxLength={8}
                      />
                      {formData.birth_date && formData.birth_date.length === 8 && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-sky-100 text-sky-800 px-2 py-1 rounded text-xs">
                          {formatJalaliDate(formData.birth_date)}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      فرمت: ۸ رقم بدون جداکننده (مثال: ۱۳۷۰۱۲۵)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      می‌توانید بعداً در پروفایل تکمیل کنید
                    </p>
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

                  {/* دکمه ثبت‌نام */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-sky-500 to-sky-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg`}
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
                      className="text-sky-500 font-semibold hover:text-sky-800 transition-colors"
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
                      <Link href="/terms" className="text-sky-500 hover:text-sky-800 font-medium">
                        شرایط استفاده
                      </Link>{' '}
                      و{' '}
                      <Link href="/privacy" className="text-sky-500 hover:text-sky-800 font-medium">
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
    </>

  );
}