'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { 
  User, 
  FileText, 
  BarChart, 
  Settings, 
  LogOut, 
  CheckCircle, 
  Clock,
  Home,
  Edit,
  Lock
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  // اگر کاربر لاگین نکرده، به لاگین هدایت شود
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // بررسی وضعیت ارزیابی
  const hasAssessmentData = localStorage.getItem(`assessment-completed-${user.id}`);
  const assessmentStatus = hasAssessmentData ? 'تکمیل شده' : 'شروع نشده';
  const assessmentDate = hasAssessmentData 
    ? new Date(JSON.parse(hasAssessmentData).timestamp).toLocaleDateString('fa-IR')
    : '-';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* هدر */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">داشبورد کاربری</h1>
              <p className="text-gray-600">مدیریت حساب و اطلاعات ارزیابی</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                صفحه اصلی
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                خروج
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* سایدبار اطلاعات کاربر */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
                  <User className="h-10 w-10 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
                <p className="text-gray-600">{user.email || user.phone}</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    user.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.isVerified ? 'تأیید شده ✓' : 'نیاز به تأیید'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">عضویت از</span>
                  <span className="font-medium">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">آخرین ورود</span>
                  <span className="font-medium">{new Date(user.lastLogin).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/profile"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <Settings className="h-5 w-5" />
                  ویرایش پروفایل
                </Link>
              </div>
            </div>

            {/* اطلاعات سیستم */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600" />
                اطلاعات سیستم
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">نسخه</span>
                  <span className="font-medium">{APP_INFO.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین بروزرسانی</span>
                  <span className="font-medium">{APP_INFO.lastUpdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">پشتیبانی</span>
                  <span className="font-medium">{CONTACT_INFO.supportPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:col-span-2 space-y-6">
            {/* وضعیت ارزیابی */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  وضعیت ارزیابی
                </h2>
                {assessmentStatus === 'شروع نشده' && (
                  <Link
                    href="/"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    شروع ارزیابی
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg ${
                  assessmentStatus === 'تکمیل شده' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${
                      assessmentStatus === 'تکمیل شده' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {assessmentStatus === 'تکمیل شده' 
                        ? <CheckCircle className="h-6 w-6" />
                        : <Clock className="h-6 w-6" />
                      }
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">وضعیت</h3>
                      <p className={`text-lg font-bold ${
                        assessmentStatus === 'تکمیل شده' 
                          ? 'text-green-700' 
                          : 'text-blue-700'
                      }`}>
                        {assessmentStatus}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {assessmentStatus === 'تکمیل شده' 
                      ? 'ارزیابی شما با موفقیت تکمیل شده است.'
                      : 'هنوز ارزیابی را شروع نکرده‌اید.'
                    }
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-3">تاریخ‌ها</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاریخ تکمیل</span>
                      <span className="font-medium">{assessmentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاریخ شروع</span>
                      <span className="font-medium">{assessmentDate === '-' ? '-' : assessmentDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {assessmentStatus === 'تکمیل شده' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <Link
                      href="/"
                      className="flex-1 bg-blue-600 text-white text-center font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      مشاهده نتایج
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm('آیا مطمئن هستید که می‌خواهید ارزیابی را مجدداً شروع کنید؟')) {
                          localStorage.removeItem(`assessment-completed-${user.id}`);
                          localStorage.removeItem(`assessment-answers-${user.id}`);
                          localStorage.removeItem(`assessment-demographics-${user.id}`);
                          router.push('/');
                        }
                      }}
                      className="flex-1 bg-yellow-500 text-white text-center font-medium py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      شروع مجدد
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* گزینه‌های سریع */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">گزینه‌های سریع</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/profile"
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">پروفایل کاربری</h3>
                      <p className="text-gray-600 text-sm">ویرایش اطلاعات شخصی</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/change-password"
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <Lock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">تغییر رمز عبور</h3>
                      <p className="text-gray-600 text-sm">به‌روزرسانی رمز عبور</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/"
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">ارزیابی رفتاری</h3>
                      <p className="text-gray-600 text-sm">{assessmentStatus === 'تکمیل شده' ? 'مشاهده نتایج' : 'شروع ارزیابی'}</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/help"
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Settings className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">راهنما و پشتیبانی</h3>
                      <p className="text-gray-600 text-sm">راهنمایی و سوالات متداول</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* آخرین فعالیت‌ها */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">آخرین فعالیت‌ها</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">ورود به سیستم</p>
                      <p className="text-gray-600 text-sm">{new Date(user.lastLogin).toLocaleString('fa-IR')}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">موفق</span>
                </div>

                {assessmentStatus === 'تکمیل شده' && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">تکمیل ارزیابی</p>
                        <p className="text-gray-600 text-sm">{assessmentDate}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">تکمیل شده</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>{CONTACT_INFO.organization} © {APP_INFO.currentYear}</p>
          <p className="mt-1">سیستم ارزیابی رفتاری نوجوانان | نسخه {APP_INFO.version}</p>
        </footer>
      </div>
    </div>
  );
}