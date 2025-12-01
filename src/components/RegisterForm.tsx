'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Smartphone, Eye, EyeOff, Check, X } from 'lucide-react';
import { validatePassword } from '@/lib/auth';

interface RegisterFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
    phone?: string;
    password: string;
    confirmPassword: string;
  }) => void;
  isLoading: boolean;
  error: string;
  success: string;
}

export default function RegisterForm({ onSubmit, isLoading, error, success }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState({
    firstName: { isValid: false, touched: false },
    lastName: { isValid: false, touched: false },
    email: { isValid: false, touched: false },
    username: { isValid: false, touched: false },
    phone: { isValid: false, touched: false },
    password: { isValid: false, touched: false, message: '' },
    confirmPassword: { isValid: false, touched: false }
  });

  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone' | 'username'>('email');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // اعتبارسنجی فوری
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let isValid = false;
    let message = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        isValid = value.trim().length >= 2;
        break;
      
      case 'email':
        if (registrationMethod === 'email') {
          isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else {
          isValid = true; // اگر ایمیل ضروری نیست
        }
        break;
      
      case 'username':
        if (registrationMethod === 'username') {
          isValid = value.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
        } else {
          isValid = true; // اگر نام کاربری ضروری نیست
        }
        break;
      
      case 'phone':
        if (registrationMethod === 'phone') {
          isValid = /^09\d{9}$/.test(value);
        } else {
          isValid = true; // اگر موبایل ضروری نیست
        }
        break;
      
      case 'password':
        const passwordValidation = validatePassword(value);
        isValid = passwordValidation.isValid;
        message = passwordValidation.message || '';
        break;
      
      case 'confirmPassword':
        isValid = value === formData.password && value.length > 0;
        break;
    }

    setValidation(prev => ({
      ...prev,
      [name]: { 
        ...prev[name as keyof typeof validation], 
        isValid, 
        touched: true,
        ...(message && { message })
      }
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // اعتبارسنجی نهایی همه فیلدها
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    // بررسی اعتبار همه فیلدهای ضروری
    const isFirstNameValid = formData.firstName.trim().length >= 2;
    const isLastNameValid = formData.lastName.trim().length >= 2;
    const isPasswordValid = validation.password.isValid;
    const isConfirmPasswordValid = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
    
    // بررسی اعتبار بر اساس روش ثبت‌نام
    let isIdentifierValid = false;
    switch (registrationMethod) {
      case 'email':
        isIdentifierValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        break;
      case 'username':
        isIdentifierValid = formData.username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(formData.username);
        break;
      case 'phone':
        isIdentifierValid = /^09\d{9}$/.test(formData.phone);
        break;
    }

    if (!isFirstNameValid || !isLastNameValid || !isIdentifierValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    // آماده‌سازی داده‌ها برای ارسال
    const submitData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: registrationMethod === 'email' ? formData.email.trim() : undefined,
      username: registrationMethod === 'username' ? formData.username.trim() : undefined,
      phone: registrationMethod === 'phone' ? formData.phone.trim() : undefined,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    onSubmit(submitData);
  };

  const isFormValid = () => {
    const baseValid = validation.firstName.isValid && 
                     validation.lastName.isValid && 
                     validation.password.isValid && 
                     validation.confirmPassword.isValid;
    
    switch (registrationMethod) {
      case 'email':
        return baseValid && validation.email.isValid;
      case 'username':
        return baseValid && validation.username.isValid;
      case 'phone':
        return baseValid && validation.phone.isValid;
      default:
        return false;
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, text: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    const texts = ['خیلی ضعیف', 'ضعیف', 'متوسط', 'قوی', 'خیلی قوی'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return { score, text: texts[score - 1] || '', color: colors[score - 1] || 'bg-red-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* انتخاب روش ثبت‌نام */}
      <div>
        <label className="block text-gray-700 mb-3 font-medium">
          روش ثبت‌نام
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setRegistrationMethod('email')}
            className={`p-4 rounded-lg border transition-all duration-200 flex flex-col items-center gap-2 ${
              registrationMethod === 'email'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Mail className="h-6 w-6" />
            <span className="font-medium">ایمیل</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRegistrationMethod('username')}
            className={`p-4 rounded-lg border transition-all duration-200 flex flex-col items-center gap-2 ${
              registrationMethod === 'username'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="font-medium">نام کاربری</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRegistrationMethod('phone')}
            className={`p-4 rounded-lg border transition-all duration-200 flex flex-col items-center gap-2 ${
              registrationMethod === 'phone'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Smartphone className="h-6 w-6" />
            <span className="font-medium">موبایل</span>
          </button>
        </div>
      </div>

      {/* نام و نام خانوادگی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            نام <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                validation.firstName.touched
                  ? validation.firstName.isValid
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="نام"
              required
              dir="rtl"
            />
            {validation.firstName.touched && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {validation.firstName.isValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {validation.firstName.touched && !validation.firstName.isValid && (
            <p className="text-red-500 text-xs mt-1">
              نام باید حداقل ۲ حرف داشته باشد
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            نام خانوادگی <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                validation.lastName.touched
                  ? validation.lastName.isValid
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="نام خانوادگی"
              required
              dir="rtl"
            />
            {validation.lastName.touched && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {validation.lastName.isValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {validation.lastName.touched && !validation.lastName.isValid && (
            <p className="text-red-500 text-xs mt-1">
              نام خانوادگی باید حداقل ۲ حرف داشته باشد
            </p>
          )}
        </div>
      </div>

      {/* شناسه بر اساس روش انتخاب شده */}
      {registrationMethod === 'email' && (
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            ایمیل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                validation.email.touched
                  ? validation.email.isValid
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="example@email.com"
              required
              dir="ltr"
            />
            {validation.email.touched && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {validation.email.isValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {validation.email.touched && !validation.email.isValid && (
            <p className="text-red-500 text-xs mt-1">
              لطفاً یک ایمیل معتبر وارد کنید
            </p>
          )}
        </div>
      )}

      {registrationMethod === 'username' && (
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            نام کاربری <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                validation.username.touched
                  ? validation.username.isValid
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="username"
              required
              dir="ltr"
            />
            {validation.username.touched && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {validation.username.isValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {validation.username.touched && !validation.username.isValid && (
            <p className="text-red-500 text-xs mt-1">
              نام کاربری باید حداقل ۳ کاراکتر و فقط شامل حروف، اعداد و زیرخط باشد
            </p>
          )}
        </div>
      )}

      {registrationMethod === 'phone' && (
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            شماره موبایل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Smartphone className="h-5 w-5" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                validation.phone.touched
                  ? validation.phone.isValid
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="09123456789"
              required
              dir="ltr"
            />
            {validation.phone.touched && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {validation.phone.isValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {validation.phone.touched && !validation.phone.isValid && (
            <p className="text-red-500 text-xs mt-1">
              لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)
            </p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            کد تأیید به این شماره ارسال خواهد شد
          </p>
        </div>
      )}

      {/* رمز عبور */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          رمز عبور <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
              validation.password.touched
                ? validation.password.isValid
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="رمز عبور"
            required
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {validation.password.touched && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {validation.password.isValid ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        
        {/* قدرت رمز عبور */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">قدرت رمز عبور:</span>
              <span className={`text-xs font-medium ${
                passwordStrength.score >= 4 ? 'text-green-600' :
                passwordStrength.score >= 3 ? 'text-blue-600' :
                passwordStrength.score >= 2 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {passwordStrength.text}
              </span>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* قوانین رمز عبور */}
        <div className="mt-3 space-y-1">
          <p className="text-sm text-gray-600">رمز عبور باید شامل:</p>
          <ul className="text-xs text-gray-500 space-y-1 pr-4">
            <li className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
              {formData.password.length >= 8 ? <Check className="h-3 w-3" /> : '○'}
              حداقل ۸ کاراکتر
            </li>
            <li className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
              {/[A-Z]/.test(formData.password) ? <Check className="h-3 w-3" /> : '○'}
              حداقل یک حرف بزرگ
            </li>
            <li className={`flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : ''}`}>
              {/[a-z]/.test(formData.password) ? <Check className="h-3 w-3" /> : '○'}
              حداقل یک حرف کوچک
            </li>
            <li className={`flex items-center gap-1 ${/\d/.test(formData.password) ? 'text-green-600' : ''}`}>
              {/\d/.test(formData.password) ? <Check className="h-3 w-3" /> : '○'}
              حداقل یک عدد
            </li>
            <li className={`flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : ''}`}>
              {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? <Check className="h-3 w-3" /> : '○'}
              حداقل یک نماد ویژه
            </li>
          </ul>
        </div>
      </div>

      {/* تأیید رمز عبور */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          تأیید رمز عبور <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 pl-12 text-right border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
              validation.confirmPassword.touched
                ? validation.confirmPassword.isValid
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="تکرار رمز عبور"
            required
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {validation.confirmPassword.touched && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {validation.confirmPassword.isValid ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        {validation.confirmPassword.touched && !validation.confirmPassword.isValid && (
          <p className="text-red-500 text-xs mt-1">
            رمز عبور و تأیید رمز عبور مطابقت ندارند
          </p>
        )}
      </div>

      {/* سایر فیلدهای اختیاری */}
      <div className="text-sm text-gray-600">
        <p className="mb-2">فیلدهای اختیاری (برای ثبت‌نام با روش‌های دیگر):</p>
        <div className="space-y-3">
          {registrationMethod !== 'email' && (
            <div>
              <label className="block text-gray-600 mb-1">
                ایمیل (اختیاری)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 text-right border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                placeholder="ایمیل (اختیاری)"
                dir="ltr"
              />
            </div>
          )}
          
          {registrationMethod !== 'username' && (
            <div>
              <label className="block text-gray-600 mb-1">
                نام کاربری (اختیاری)
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 text-right border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                placeholder="نام کاربری (اختیاری)"
                dir="ltr"
              />
            </div>
          )}
          
          {registrationMethod !== 'phone' && (
            <div>
              <label className="block text-gray-600 mb-1">
                شماره موبایل (اختیاری)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 text-right border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                placeholder="شماره موبایل (اختیاری)"
                dir="ltr"
              />
            </div>
          )}
        </div>
      </div>

      {/* پیام‌های خطا و موفقیت */}
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

      {/* دکمه ثبت‌نام */}
      <button
        type="submit"
        disabled={isLoading || !isFormValid()}
        className={`w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ${
          isLoading || !isFormValid()
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-indigo-700 shadow-md hover:shadow-lg'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            در حال ثبت‌نام...
          </span>
        ) : (
          'ثبت‌نام'
        )}
      </button>

      {/* لینک ورود */}
      <div className="text-center text-sm text-gray-600">
        قبلاً حساب کاربری دارید؟{' '}
        <Link 
          href="/login" 
          className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          وارد شوید
        </Link>
      </div>

      {/* توافقنامه */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
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
      </div>
    </form>
  );
}