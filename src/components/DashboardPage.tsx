// components/DashboardPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Calendar,
  Award,
  Bell,
  Shield,
  UserCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    assessments: 0,
    workshops: 0,
    certificates: 0,
    notifications: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی بارگیری داده‌ها
    const loadDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // شبیه‌سازی تاخیر
      
      setStats({
        assessments: 5,
        workshops: 3,
        certificates: 2,
        notifications: 4
      });

      setRecentActivities([
        { id: 1, title: 'تکمیل ارزیابی رفتاری', time: '۲ ساعت پیش', icon: '📝' },
        { id: 2, title: 'ثبت‌نام در کارگاه مدیریت استرس', time: 'دیروز', icon: '🎯' },
        { id: 3, title: 'دریافت گواهینامه مهارت ارتباطی', time: '۳ روز پیش', icon: '🏆' },
        { id: 4, title: 'به‌روزرسانی پروفایل', time: '۱ هفته پیش', icon: '👤' },
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'ارزیابی‌های انجام شده',
      value: stats.assessments,
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'کارگاه‌های فعال',
      value: stats.workshops,
      icon: <Calendar className="h-8 w-8" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'گواهینامه‌ها',
      value: stats.certificates,
      icon: <Award className="h-8 w-8" />,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'اعلان‌های جدید',
      value: stats.notifications,
      icon: <Bell className="h-8 w-8" />,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const quickActions = [
    { title: 'شروع ارزیابی جدید', icon: <BarChart3 className="h-6 w-6" />, path: '/dashboard/assessment' },
    { title: 'مشاهده نتایج', icon: <FileText className="h-6 w-6" />, path: '/dashboard/results' },
    { title: 'کارگاه‌ها', icon: <Users className="h-6 w-6" />, path: '/dashboard/workshops' },
    { title: 'پروفایل من', icon: <UserCheck className="h-6 w-6" />, path: '/dashboard/profile' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              سلام، {user?.first_name} {user?.last_name} 👋
            </h1>
            <p className="text-sky-100">
              به داشبورد سامانه ارزیابی نوجوانان خوش آمدید
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              <span>حساب شما {user?.is_verified ? 'تأیید شده است ✅' : 'نیاز به تأیید دارد'}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm">آخرین ورود</p>
              <p className="font-semibold">
                {user?.last_login ? new Date(user.last_login).toLocaleDateString('fa-IR') : 'اولین ورود'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">آمار سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-sky-300 hover:shadow-md transition-all flex flex-col items-center justify-center gap-3"
              onClick={() => window.location.href = action.path}
            >
              <div className="text-sky-600">
                {action.icon}
              </div>
              <span className="font-medium text-gray-700">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">فعالیت‌های اخیر</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activity.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}