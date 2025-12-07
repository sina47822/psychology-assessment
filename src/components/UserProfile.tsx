// src/components/UserProfile.tsx
'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Smartphone, User as UserIcon, Lock, Save, X, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { formatDate, formatPhoneNumber } from '@/lib/utils';
import api from '@/lib/api';

interface UserProfileProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function UserProfile({ onClose, isModal = false }: UserProfileProps) {
  const { user, updateProfile, checkSession, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    national_code: '',
    birth_date: '',
    gender: '',
    province: '',
    city: '',
    address: ''
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // مقداردهی اولیه formData با داده‌های کاربر
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        national_code: user.national_code || '',
        birth_date: user.birth_date || '',
        gender: user.gender || '',
        province: user.province || '',
        city: user.city || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // اعتبارسنجی
      if (!formData.first_name.trim() || !formData.last_name.trim()) {
        throw new Error('نام و نام خانوادگی ضروری است');
      }

      // بررسی session قبل از به‌روزرسانی
      const sessionValid = await checkSession();
      if (!sessionValid) {
        throw new Error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
      }

      // استفاده از تابع updateProfile از AuthProvider
      const result = await updateProfile(formData);
      
      if (result.success) {
        setSuccess('اطلاعات پروفایل با موفقیت به‌روزرسانی شد');
        setIsEditing(false);
        
        // پاک کردن پیام موفقیت بعد از 3 ثانیه
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error(result.error?.detail || 'خطا در به‌روزرسانی پروفایل');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در به‌روزرسانی پروفایل');
      
      // اگر session نامعتبر است، کاربر را logout کن
      if (error instanceof Error && error.message.includes('نشست')) {
        setTimeout(() => logout(), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { current_password, new_password, confirm_password } = passwordData;

      // اعتبارسنجی
      if (!current_password) {
        throw new Error('رمز عبور فعلی الزامی است');
      }
      
      if (new_password !== confirm_password) {
        throw new Error('رمز عبور جدید و تأیید آن مطابقت ندارند');
      }

      if (new_password.length < 8) {
        throw new Error('رمز عبور جدید باید حداقل ۸ کاراکتر باشد');
      }

      // بررسی session
      const sessionValid = await checkSession();
      if (!sessionValid) {
        throw new Error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
      }

      // ارسال درخواست تغییر رمز عبور
      const response = await api.post('/users/password/change/', {
        current_password,
        new_password,
        confirm_password
      });

      if (response.status === 200) {
        setSuccess('رمز عبور با موفقیت تغییر کرد');
        setIsChangingPassword(false);
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || error.message || 'خطا در تغییر رمز عبور');
      
      // اگر session نامعتبر است، کاربر را logout کن
      if (error.message.includes('نشست')) {
        setTimeout(() => logout(), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        national_code: user.national_code || '',
        birth_date: user.birth_date || '',
        gender: user.gender || '',
        province: user.province || '',
        city: user.city || '',
        address: user.address || ''
      });
    }
    setError('');
    setSuccess('');
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  const verifyAccount = async () => {
    try {
      setLoading(true);
      setError('');
      
      // ارسال درخواست تأیید حساب
      const response = await api.post('/users/verify/send-email/');
      
      if (response.status === 200) {
        setSuccess('ایمیل تأیید حساب ارسال شد. لطفاً صندوق ایمیل خود را بررسی کنید.');
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || 'خطا در ارسال ایمیل تأیید');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">در حال بارگذاری اطلاعات کاربر...</p>
      </div>
    );
  }

  const genderOptions = [
    { value: '', label: 'انتخاب کنید' },
    { value: 'male', label: 'مرد' },
    { value: 'female', label: 'زن' },
    { value: 'other', label: 'سایر' }
  ];

  return (
    <div className={`${isModal ? '' : 'max-w-6xl mx-auto p-4 md:p-6'}`}>
      {/* هدر */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">پروفایل کاربری</h2>
          <p className="text-gray-600 mt-1">مدیریت اطلاعات شخصی و امنیتی</p>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* سایدبار اطلاعات */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-sky-100 rounded-full mb-4">
                <User className="h-12 w-12 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{user.full_name}</h3>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  user.is_verified 
                    ? 'bg-sky-100 text-sky-800' 
                    : 'bg-sky-100 text-sky-800'
                }`}>
                  {user.is_verified ? 'حساب تأیید شده ✓' : 'نیاز به تأیید حساب'}
                </span>
              </div>
              {user.is_staff && (
                <div className="mt-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-800">
                    کارمند سیستم
                  </span>
                </div>
              )}
              {user.is_parent && (
                <div className="mt-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-800">
                    والدین
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <UserIcon className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">نام کاربری</p>
                  <p className="font-medium">{user.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">ایمیل</p>
                  <p className="font-medium">{user.email || 'تعیین نشده'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">شماره موبایل</p>
                  <p className="font-medium">{user.phone ? formatPhoneNumber(user.phone) : 'تعیین نشده'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">عضویت از</span>
                  <span className="font-medium">{formatDate(user.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین ورود</span>
                  <span className="font-medium">{formatDate(user.last_login)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین فعالیت</span>
                  <span className="font-medium">{formatDate(user.last_activity)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* دکمه‌های اقدام سریع */}
          <div className="mt-6 space-y-3">
            {!isEditing && !isChangingPassword && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-sky-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
                >
                  <User className="h-5 w-5" />
                  ویرایش پروفایل
                </button>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="h-5 w-5" />
                  تغییر رمز عبور
                </button>
              </>
            )}
            {(isEditing || isChangingPassword) && (
              <button
                onClick={cancelEdit}
                className="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <X className="h-5 w-5" />
                لغو
              </button>
            )}
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="lg:col-span-2 space-y-6">
          {/* ویرایش پروفایل */}
          {isEditing && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">ویرایش اطلاعات شخصی</h3>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      نام <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="نام"
                      required
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      نام خانوادگی <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="نام خانوادگی"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      ایمیل
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-12 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      شماره موبایل
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-12 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                        placeholder="09123456789"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      کد ملی
                    </label>
                    <input
                      type="text"
                      name="national_code"
                      value={formData.national_code}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="کد ملی"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      تاریخ تولد
                    </label>
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      جنسیت
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    >
                      {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      استان
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="استان"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      شهر
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="شهر"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    آدرس
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="آدرس کامل"
                    dir="rtl"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <X className="h-5 w-5 ml-2" />
                      {error}
                    </div>
                  </div>
                )}

                {success && (
                  <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 ml-2" />
                      {success}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    لغو
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-700'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        در حال ذخیره...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Save className="h-5 w-5" />
                        ذخیره تغییرات
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* تغییر رمز عبور */}
          {isChangingPassword && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">تغییر رمز عبور</h3>
              
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    رمز عبور فعلی <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pl-12 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="رمز عبور فعلی"
                      required
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    رمز عبور جدید <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pl-12 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="رمز عبور جدید"
                      required
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    رمز عبور باید حداقل ۸ کاراکتر باشد
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    تأیید رمز عبور جدید <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pl-12 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="تکرار رمز عبور جدید"
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
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <X className="h-5 w-5 ml-2" />
                      {error}
                    </div>
                  </div>
                )}

                {success && (
                  <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 ml-2" />
                      {success}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    لغو
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-700'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        در حال تغییر...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Lock className="h-5 w-5" />
                        تغییر رمز عبور
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* اطلاعات حساب (اگر در حال ویرایش نیستیم) */}
          {!isEditing && !isChangingPassword && (
            <>
              {/* اطلاعات ارزیابی */}
              {user.assessmentCompleted && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">اطلاعات ارزیابی</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">وضعیت ارزیابی</p>
                        <p className="text-sm text-gray-600">آخرین ارزیابی انجام شده</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">
                        تکمیل شده
                      </span>
                    </div>

                    {user.assessmentData && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">تاریخ تکمیل</span>
                          <span className="font-medium">{formatDate(user.assessmentData.completedAt)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">تعداد موارد انتخاب شده</span>
                          <span className="font-medium">{user.assessmentData.totalSelected} مورد</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* امنیت حساب */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">امنیت حساب</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">وضعیت تأیید حساب</p>
                      <p className="text-sm text-gray-600">تأیید ایمیل و موبایل</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.is_verified ? (
                        <>
                          <Check className="h-5 w-5 text-sky-500" />
                          <span className="text-sky-500 font-medium">تأیید شده</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-sky-500" />
                          <span className="text-sky-500 font-medium">نیاز به تأیید</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">احراز هویت دو مرحله‌ای</p>
                      <p className="text-sm text-gray-600">افزایش امنیت حساب</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.two_factor_auth ? (
                        <>
                          <Check className="h-5 w-5 text-sky-500" />
                          <span className="text-sky-500 font-medium">فعال</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-gray-600" />
                          <span className="text-gray-600 font-medium">غیرفعال</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="flex-1 bg-sky-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      تغییر رمز عبور
                    </button>
                    {!user.is_verified && (
                      <button
                        onClick={verifyAccount}
                        disabled={loading}
                        className="flex-1 bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        ارسال ایمیل تأیید
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}