// src/components/DashboardLayout/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart,
  Target,
  BookOpen,
  User,
  Settings,
  HelpCircle,
  Calendar,
  Award,
  Trophy,
  Gift,
  Bell,
  Users,
  LogOut,
  X,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Zap,
  Target as TargetIcon,
  Clock,
  Star,
  PieChart,
  FileText,
  Video,
  Mic,
  Headphones,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  onClose?: () => void;
}

export default function CoachingSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navigationItems = [
    {
      title: 'داشبورد',
      href: '/dashboard',
      icon: <BarChart className="h-5 w-5" />,
      active: pathname === '/dashboard',
      badge: '🔥'
    },
    {
      title: 'مسیرهای آموزشی',
      href: '/dashboard/learning-paths',
      icon: <BookOpen className="h-5 w-5" />,
      active: pathname.includes('/learning-paths'),
      submenu: [
        { title: 'همه مسیرها', href: '/dashboard/learning-paths' },
        { title: 'در حال یادگیری', href: '/dashboard/learning-paths/active' },
        { title: 'تکمیل شده', href: '/dashboard/learning-paths/completed' },
        { title: 'جدیدترین‌ها', href: '/dashboard/learning-paths/new' },
      ]
    },
    {
      title: 'تمرین روزانه',
      href: '/dashboard/today-task',
      icon: <Target className="h-5 w-5" />,
      active: pathname.includes('/today-task'),
      badge: '🎯'
    },
    {
      title: 'برنامه هفتگی',
      href: '/dashboard/weekly-plan',
      icon: <Calendar className="h-5 w-5" />,
      active: pathname.includes('/weekly-plan'),
    },
    {
      title: 'چالش‌ها',
      href: '/dashboard/challenges',
      icon: <Trophy className="h-5 w-5" />,
      active: pathname.includes('/challenges'),
      badge: '⚡'
    },
    {
      title: 'دستاوردها',
      href: '/dashboard/achievements',
      icon: <Award className="h-5 w-5" />,
      active: pathname.includes('/achievements'),
    },
    {
      title: 'جوایز',
      href: '/dashboard/rewards',
      icon: <Gift className="h-5 w-5" />,
      active: pathname.includes('/rewards'),
      badge: '🎁'
    },
    {
      title: 'پیشرفت من',
      href: '/dashboard/progress',
      icon: <TrendingUp className="h-5 w-5" />,
      active: pathname.includes('/progress'),
      submenu: [
        { title: 'آمار کلی', href: '/dashboard/progress/stats' },
        { title: 'نمودار پیشرفت', href: '/dashboard/progress/charts' },
        { title: 'نقاط عطف', href: '/dashboard/progress/milestones' },
        { title: 'گزارش هفتگی', href: '/dashboard/progress/weekly-report' },
      ]
    },
    {
      title: 'پروفایل',
      href: '/dashboard/profile',
      icon: <User className="h-5 w-5" />,
      active: pathname.includes('/profile'),
    },
    {
      title: 'مشاوره',
      href: '/dashboard/consultation',
      icon: <MessageSquare className="h-5 w-5" />,
      active: pathname.includes('/consultation'),
      submenu: [
        { title: 'مشاوره زنده', href: '/dashboard/consultation/live' },
        { title: 'سوال از مربی', href: '/dashboard/consultation/ask' },
        { title: 'انجمن والدین', href: '/dashboard/consultation/community' },
        { title: 'وبینارها', href: '/dashboard/consultation/webinars' },
      ]
    },
    {
      title: 'اعلان‌ها',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />,
      active: pathname.includes('/notifications'),
      badge: '۳'
    },
    {
      title: 'تنظیمات',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
      active: pathname.includes('/settings'),
    },
  ];

  const quickStats = [
    { label: 'امتیاز', value: '۸۵۰', icon: Star, color: 'text-yellow-500' },
    { label: 'تداوم', value: '۷ روز', icon: Zap, color: 'text-orange-500' },
    { label: 'مسیر فعال', value: '۱', icon: TargetIcon, color: 'text-blue-500' },
  ];

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  return (
    <aside className="h-full bg-gradient-to-b from-white to-sky-50 border-l border-gray-200 w-full flex flex-col shadow-xl">
      {/* هدر */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-white">
        <div className="flex justify-between items-center mb-4">
          <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">کوچینگ والدین</h2>
              <p className="text-xs text-gray-500">سفر یادگیری شما</p>
            </div>
          </Link>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* آمار سریع */}
        <div className="grid grid-cols-3 gap-2">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-gray-100 text-center">
              <div className={`flex justify-center mb-1 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
              <div className="text-sm font-bold text-gray-800">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* بخش کاربر */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">
                {user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || ''}
              </span>
            </div>
            {user?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800 truncate">
              {user?.fullName || 'والد عزیز'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.isParent ? 'والد' : 'همراه نوجوان'}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <div className="text-xs px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">
                سطح {user?.level || 1}
              </div>
              <div className="text-xs px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">
                ⭐ {user?.totalPoints || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ناوبری اصلی */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <Link
                href={item.href}
                onClick={(e) => {
                  if (item.submenu) {
                    e.preventDefault();
                    toggleSubmenu(item.title);
                  }
                  onClose?.();
                }}
                className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  item.active
                    ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:text-sky-600 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${item.active ? 'text-white' : 'text-gray-500 group-hover:text-sky-500'}`}>
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`text-xs ${
                      item.active 
                        ? 'bg-white/20 text-white' 
                        : 'bg-sky-100 text-sky-800'
                    } px-2 py-0.5 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && (
                    <ChevronLeft className={`h-4 w-4 transition-transform ${
                      activeSubmenu === item.title ? 'rotate-90' : '-rotate-90'
                    } ${item.active ? 'text-white' : 'text-gray-400'}`} />
                  )}
                </div>
              </Link>

              {/* زیرمنو */}
              {item.submenu && activeSubmenu === item.title && (
                <div className="mt-1 ml-8 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      onClick={onClose}
                      className={`flex items-center w-full px-3 py-2 text-xs rounded-lg transition-colors ${
                        pathname === subItem.href
                          ? 'bg-sky-100 text-sky-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 ml-2"></div>
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* تمرین امروز */}
        <div className="mt-6 mx-4">
          <Link
            href="/dashboard/today-task"
            className="block bg-gradient-to-r from-emerald-500 to-sky-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span className="font-bold">تمرین امروز</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">جدید</span>
            </div>
            <p className="text-sm text-emerald-100 mb-3">
              گفتگوی ۱۵ دقیقه‌ای با نوجوان
            </p>
            <div className="flex items-center justify-between text-xs">
              <span>۱۵ دقیقه ⏱️</span>
              <span>+۵۰ امتیاز ⭐</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* فوتر */}
      <div className="p-4 border-t border-gray-200 space-y-3 bg-white">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Link
            href="/dashboard/help"
            className="flex flex-col items-center p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <HelpCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">راهنما</span>
          </Link>
          <Link
            href="/dashboard/community"
            className="flex flex-col items-center p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs">انجمن</span>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
        >
          <LogOut className="h-5 w-5" />
          <span>خروج از سیستم</span>
        </button>

        <div className="pt-3 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Home className="h-3 w-3 inline ml-1" />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </aside>
  );
}