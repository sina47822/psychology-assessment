'use client';

import { useState } from 'react';
import { User, Mail, Smartphone, User as UserIcon, Lock, Save, X, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { changePassword } from '@/lib/auth';
import { formatDate, formatPhoneNumber } from '@/lib/utils';

interface UserProfileProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function UserProfile({ onClose, isModal = false }: UserProfileProps) {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error('نام و نام خانوادگی ضروری است');
      }

      // در محیط واقعی، اینجا API call می‌شود
      await new Promise(resolve => setTimeout(resolve, 1000)); // شبیه‌سازی delay

      updateUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        username: formData.username.trim() || undefined
      });

      setSuccess('اطلاعات پروفایل با موفقیت به‌روزرسانی شد');
      setIsEditing(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در به‌روزرسانی پروفایل');
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
      const { currentPassword, newPassword, confirmPassword } = passwordData;

      if (newPassword !== confirmPassword) {
        throw new Error('رمز عبور جدید و تأیید آن مطابقت ندارند');
      }

      if (newPassword.length < 8) {
        throw new Error('رمز عبور جدید باید حداقل ۸ کاراکتر باشد');
      }

      if (!user) {
        throw new Error('کاربر یافت نشد');
      }

      // در محیط واقعی، باید API call شود
      const result = await changePassword(user.id, currentPassword, newPassword);

      if (!result.success) {
        throw new Error(result.message || 'خطا در تغییر رمز عبور');
      }

      setSuccess('رمز عبور با موفقیت تغییر کرد');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در تغییر رمز عبور');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      username: user?.username || ''
    });
    setError('');
    setSuccess('');
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">در حال بارگذاری اطلاعات کاربر...</p>
      </div>
    );
  }

  return (
    <div className={`${isModal ? '' : 'max-w-4xl mx-auto p-4 md:p-6'}`}>
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
                <User className="h-12 w-12 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{user.fullName}</h3>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  user.isVerified 
                    ? 'bg-sky-100 text-sky-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.isVerified ? 'حساب تأیید شده ✓' : 'نیاز به تأیید حساب'}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <UserIcon className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">نام کاربری</p>
                  <p className="font-medium">{user.username || 'تعیین نشده'}</p>
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
                  <span className="font-medium">{formatDate(user.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین ورود</span>
                  <span className="font-medium">{formatDate(user.lastLogin)}</span>
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
                  className="w-full bg-sky-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
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
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
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
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="نام خانوادگی"
                      required
                      dir="rtl"
                    />
                  </div>
                </div>

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
                      className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    نام کاربری
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="username"
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
                      className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="09123456789"
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
                  <div className="bg-blue-50 border border-green-200 text-sky-700 px-4 py-3 rounded-lg">
                    {success}
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
                    className={`flex-1 bg-sky-600 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
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
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
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
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
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
                    رمز عبور باید حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک، عدد و نماد باشد
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
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
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
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-blue-50 border border-green-200 text-sky-700 px-4 py-3 rounded-lg">
                    {success}
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
                    className={`flex-1 bg-sky-600 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
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
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">اطلاعات ارزیابی</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">وضعیت ارزیابی</p>
                      <p className="text-sm text-gray-600">آخرین ارزیابی انجام شده</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.assessmentCompleted 
                        ? 'bg-sky-100 text-sky-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.assessmentCompleted ? 'تکمیل شده' : 'شروع نشده'}
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
                        <span className="font-medium">{Object.values(user.assessmentData.answers).flat().length} مورد</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
                      {user.isVerified ? (
                        <>
                          <Check className="h-5 w-5 text-sky-600" />
                          <span className="text-sky-600 font-medium">تأیید شده</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-yellow-600" />
                          <span className="text-yellow-600 font-medium">نیاز به تأیید</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">آخرین تغییر رمز عبور</p>
                      <p className="text-sm text-gray-600">تاریخ آخرین تغییر</p>
                    </div>
                    <span className="text-gray-800 font-medium">-</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="flex-1 bg-sky-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      تغییر رمز عبور
                    </button>
                    <button
                      onClick={() => {
                        // در محیط واقعی، باید ایمیل تأیید ارسال شود
                        alert('ایمیل تأیید حساب ارسال شد');
                      }}
                      className="flex-1 bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      ارسال ایمیل تأیید
                    </button>
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