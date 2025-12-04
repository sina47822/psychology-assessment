'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Lock,
  Palette,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Mail,
  User,
  Key,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { APP_INFO } from '@/data/constants';

// تعریف نوع‌های TypeScript
type SettingsType = {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    weeklyReport: boolean;
    reminders: boolean;
  };
  privacy: {
    profileVisibility: string;
    showOnlineStatus: boolean;
    allowMessages: boolean;
    dataSharing: boolean;
  };
  appearance: {
    theme: string;
    fontSize: string;
    language: string;
    rtl: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: number; // تغییر از string به number
  };
};

type SettingsCategory = keyof SettingsType;

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState<SettingsType>({
    notifications: {
      email: true,
      sms: false,
      push: true,
      weeklyReport: true,
      reminders: true
    },
    privacy: {
      profileVisibility: 'private',
      showOnlineStatus: true,
      allowMessages: true,
      dataSharing: false
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      language: 'fa',
      rtl: true
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: 30 // تغییر به number
    }
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // هدایت به لاگین اگر کاربر لاگین نکرده
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // بارگذاری تنظیمات از localStorage
  useEffect(() => {
    if (!user) return;
    
    const savedSettings = localStorage.getItem(`user-settings-${user.id}`);
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      // تبدیل sessionTimeout به number اگر string است
      if (parsedSettings.security?.sessionTimeout) {
        parsedSettings.security.sessionTimeout = parseInt(parsedSettings.security.sessionTimeout);
      }
      setSettings(parsedSettings);
    }
    
    // بررسی حالت تاریک
    const darkMode = localStorage.getItem('dark-mode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [user]);

  // ذخیره تنظیمات در localStorage
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`user-settings-${user.id}`, JSON.stringify(settings));
  }, [settings, user]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dark-mode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // تابع type-safe برای تغییر تنظیمات
  const handleSettingChange = <K extends SettingsCategory>(
    category: K, 
    key: keyof SettingsType[K], 
    value: SettingsType[K][keyof SettingsType[K]]
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  // تابع برای تغییر تنظیمات security (ویژه)
  const handleSecuritySettingChange = (
    key: keyof SettingsType['security'], 
    value: boolean | number
  ) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const handlePasswordChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof passwordForm) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof passwordForm]
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess('تنظیمات با موفقیت ذخیره شد');
      
      setTimeout(() => {
        setSaveSuccess('');
      }, 3000);
    } catch (error) {
      setSaveError('خطا در ذخیره تنظیمات');
    } finally {
      setIsSaving(false);
    }
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveError('رمز عبور جدید و تأیید آن مطابقت ندارند');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setSaveError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return;
    }
    
    setIsSaving(true);
    setSaveError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveSuccess('رمز عبور با موفقیت تغییر کرد');
      
      // پاک کردن فرم
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
      });
      
      setTimeout(() => {
        setSaveSuccess('');
      }, 3000);
    } catch (error) {
      setSaveError('خطا در تغییر رمز عبور');
    } finally {
      setIsSaving(false);
    }
  };

  const exportData = () => {
    const data = {
      user: {
        id: user?.id,
        name: user?.fullName,
        email: user?.email,
        phone: user?.phone
      },
      settings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `settings-${user?.id}-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟ این عمل غیرقابل بازگشت است.')) {
      alert('درخواست حذف حساب ثبت شد. عملیات حذف به زودی انجام خواهد شد.');
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* هدر صفحه */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center">
                  <SettingsIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">تنظیمات حساب کاربری</h1>
                  <p className="text-gray-600">مدیریت تنظیمات و حریم خصوصی حساب شما</p>
                </div>
              </div>
              
              <button
                onClick={saveSettings}
                disabled={isSaving}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>در حال ذخیره...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>ذخیره تغییرات</span>
                  </>
                )}
              </button>
            </div>
            
            {/* پیام‌های موفقیت/خطا */}
            {saveSuccess && (
              <div className="bg-blue-50 border border-green-200 text-sky-700 px-4 py-3 rounded-lg mb-4 flex items-start">
                <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">موفقیت‌آمیز</p>
                  <p className="text-sm mt-1">{saveSuccess}</p>
                </div>
              </div>
            )}
            
            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start">
                <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">خطا</p>
                  <p className="text-sm mt-1">{saveError}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* سایدبار */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-6">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'general' ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <SettingsIcon className="h-5 w-5" />
                    <span>عمومی</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Bell className="h-5 w-5" />
                    <span>اعلان‌ها</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'privacy' ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Shield className="h-5 w-5" />
                    <span>حریم خصوصی</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'appearance' ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Palette className="h-5 w-5" />
                    <span>ظاهر</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'security' ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Lock className="h-5 w-5" />
                    <span>امنیت</span>
                  </button>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <button
                      onClick={() => setActiveTab('data')}
                      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'data' ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Download className="h-5 w-5" />
                      <span>مدیریت داده‌ها</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* محتوای اصلی */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* تنظیمات عمومی */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 mb-4">تنظیمات عمومی حساب</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            زبان سیستم
                          </label>
                          <select
                            value={settings.appearance.language}
                            onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="fa">فارسی</option>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            منطقه زمانی
                          </label>
                          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                            <option value="+3:30">تهران (GMT+3:30)</option>
                            <option value="+4:30">کابل (GMT+4:30)</option>
                            <option value="+0">لندن (GMT+0)</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">جهت متن</p>
                            <p className="text-sm text-gray-600">راست‌چین یا چپ‌چین</p>
                          </div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.appearance.rtl}
                              onChange={(e) => handleSettingChange('appearance', 'rtl', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600">
                              <span className="absolute top-1/2 transform -translate-y-1/2 text-xs text-gray-700 left-2">LTR</span>
                              <span className="absolute top-1/2 transform -translate-y-1/2 text-xs text-white right-2">RTL</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* تنظیمات اعلان‌ها */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">تنظیمات اعلان‌ها</h2>
                    
                    <div className="space-y-4">
                      {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">
                              {key === 'email' && 'ایمیل'}
                              {key === 'sms' && 'پیامک'}
                              {key === 'push' && 'اعلان‌های پوش'}
                              {key === 'weeklyReport' && 'گزارش هفتگی'}
                              {key === 'reminders' && 'یادآوری‌ها'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {key === 'email' && 'دریافت اعلان‌ها از طریق ایمیل'}
                              {key === 'sms' && 'دریافت اعلان‌ها از طریق پیامک'}
                              {key === 'push' && 'نمایش اعلان‌ها در مرورگر'}
                              {key === 'weeklyReport' && 'ارسال گزارش هفتگی فعالیت‌ها'}
                              {key === 'reminders' && 'یادآوری زمان‌بندی ارزیابی'}
                            </p>
                          </div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleSettingChange('notifications', key as keyof SettingsType['notifications'], e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* حریم خصوصی */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">تنظیمات حریم خصوصی</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          وضعیت پروفایل
                        </label>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        >
                          <option value="public">عمومی (همه می‌توانند ببینند)</option>
                          <option value="private">خصوصی (فقط کاربران تأیید شده)</option>
                          <option value="hidden">مخفی (فقط خودم)</option>
                        </select>
                      </div>
                      
                      <div className="space-y-3">
                        {(['showOnlineStatus', 'allowMessages', 'dataSharing'] as const).map((key) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800">
                                {key === 'showOnlineStatus' && 'نمایش وضعیت آنلاین'}
                                {key === 'allowMessages' && 'مجوز دریافت پیام'}
                                {key === 'dataSharing' && 'اشتراک‌گذاری داده برای تحقیقات'}
                              </p>
                              <p className="text-sm text-gray-600">
                                {key === 'showOnlineStatus' && 'نمایش وضعیت آنلاین بودن شما برای دیگر کاربران'}
                                {key === 'allowMessages' && 'اجازه دادن به کاربران دیگر برای ارسال پیام به شما'}
                                {key === 'dataSharing' && 'استفاده از داده‌های ناشناس برای بهبود خدمات'}
                              </p>
                            </div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.privacy[key]}
                                onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ظاهر */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">تنظیمات ظاهر</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اندازه فونت
                        </label>
                        <select
                          value={settings.appearance.fontSize}
                          onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        >
                          <option value="small">کوچک</option>
                          <option value="medium">متوسط</option>
                          <option value="large">بزرگ</option>
                          <option value="xlarge">خیلی بزرگ</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          تم رنگ
                        </label>
                        <select
                          value={settings.appearance.theme}
                          onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        >
                          <option value="light">روشن</option>
                          <option value="dark">تاریک</option>
                          <option value="auto">خودکار</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">حالت تاریک</p>
                        <p className="text-sm text-gray-600">استفاده از تم تاریک برای محافظت از چشم</p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
                      >
                        {isDarkMode ? (
                          <>
                            <Sun className="h-5 w-5" />
                            <span>حالت روشن</span>
                          </>
                        ) : (
                          <>
                            <Moon className="h-5 w-5" />
                            <span>حالت تاریک</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* امنیت */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">تنظیمات امنیت</h2>
                    
                    {/* احراز هویت دو مرحله‌ای */}
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-2">احراز هویت دو مرحله‌ای</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            با فعال کردن این گزینه، هنگام ورود به سیستم کد تایید اضافی دریافت خواهید کرد.
                          </p>
                          <div className="flex items-center space-x-2 text-sm">
                            <Smartphone className="h-4 w-4 text-gray-500" />
                            <span>توسط پیامک یا برنامه‌های احراز هویت</span>
                          </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorAuth}
                            onChange={(e) => handleSecuritySettingChange('twoFactorAuth', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    {/* تنظیمات دیگر */}
                    <div className="space-y-4">
                      {/* هشدارهای ورود */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">هشدارهای ورود</p>
                          <p className="text-sm text-gray-600">ارسال هشدار در صورت ورود از دستگاه جدید</p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.security.loginAlerts}
                            onChange={(e) => handleSecuritySettingChange('loginAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                        </label>
                      </div>
                      
                      {/* مدت زمان نشست */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">مدت زمان نشست</p>
                          <p className="text-sm text-gray-600">زمان خودکار خروج از سیستم (دقیقه)</p>
                        </div>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        >
                          <option value={15}>15 دقیقه</option>
                          <option value={30}>30 دقیقه</option>
                          <option value={60}>1 ساعت</option>
                          <option value={120}>2 ساعت</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* تغییر رمز عبور */}
                    <div className="p-6 bg-sky-50 rounded-lg border border-sky-200">
                      <h3 className="font-bold text-gray-800 mb-4">تغییر رمز عبور</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            رمز عبور فعلی
                          </label>
                          <div className="relative">
                            <input
                              type={passwordForm.showCurrentPassword ? 'text' : 'password'}
                              value={passwordForm.currentPassword}
                              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('showCurrentPassword')}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {passwordForm.showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              رمز عبور جدید
                            </label>
                            <div className="relative">
                              <input
                                type={passwordForm.showNewPassword ? 'text' : 'password'}
                                value={passwordForm.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('showNewPassword')}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              >
                                {passwordForm.showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              تأیید رمز عبور جدید
                            </label>
                            <div className="relative">
                              <input
                                type={passwordForm.showConfirmPassword ? 'text' : 'password'}
                                value={passwordForm.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('showConfirmPassword')}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              >
                                {passwordForm.showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={changePassword}
                          disabled={isSaving}
                          className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                        >
                          <Key className="h-4 w-4" />
                          <span>تغییر رمز عبور</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* مدیریت داده‌ها */}
                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">مدیریت داده‌ها</h2>
                    
                    <div className="space-y-6">
                      {/* خروجی گرفتن از داده‌ها */}
                      <div className="p-6 bg-blue-50 rounded-lg border border-green-200">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <Download className="h-8 w-8 text-sky-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-2">دریافت داده‌های حساب</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              می‌توانید کلیه داده‌های مرتبط با حساب کاربری خود را در قالب JSON دریافت کنید.
                            </p>
                            <button
                              onClick={exportData}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                              <Download className="h-4 w-4" />
                              <span>دریافت فایل داده‌ها</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* وارد کردن داده‌ها */}
                      <div className="p-6 bg-sky-50 rounded-lg border border-sky-200">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <Upload className="h-8 w-8 text-sky-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-2">وارد کردن داده‌ها</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              می‌توانید داده‌های قبلی را از فایل JSON وارد کنید.
                            </p>
                            <div className="flex items-center space-x-4">
                              <input
                                type="file"
                                accept=".json"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                              />
                              <button
                                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
                                onClick={() => alert('این قابلیت به زودی فعال خواهد شد')}
                              >
                                آپلود فایل
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* حذف حساب */}
                      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <Trash2 className="h-8 w-8 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-2">حذف حساب کاربری</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              با حذف حساب کاربری، کلیه اطلاعات و داده‌های شما به طور کامل پاک خواهد شد. این عمل غیرقابل بازگشت است.
                            </p>
                            <button
                              onClick={deleteAccount}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>حذف حساب کاربری</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer simplified={true} />
    </div>
  );
}