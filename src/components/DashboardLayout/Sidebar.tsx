'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart,
  FileText,
  User,
  Settings,
  HelpCircle,
  Calendar,
  Award,
  BookOpen,
  ChevronLeft,
  LogOut,
  X,
  Shield,
  Bell,
  Users,
  PieChart
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

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
    },
    {
      title: 'ارزیابی جدید',
      href: '/',
      icon: <Shield className="h-5 w-5" />,
      active: pathname === '/',
    },
    {
      title: 'پروفایل',
      href: '/dashboard/profile',
      icon: <User className="h-5 w-5" />,
      active: pathname.startsWith('/dashboard/profile'),
    },
    {
      title: 'نتایج ارزیابی',
      href: '/dashboard/results',
      icon: <Award className="h-5 w-5" />,
      active: pathname === '/dashboard/results',
    },
    {
      title: 'تاریخچه ارزیابی‌ها',
      href: '/dashboard/history',
      icon: <Calendar className="h-5 w-5" />,
      active: pathname === '/dashboard/history',
    },
    {
      title: 'گزارش‌ها',
      href: '/dashboard/reports',
      icon: <PieChart className="h-5 w-5" />,
      active: pathname.startsWith('/dashboard/reports'),
    },
    {
      title: 'تنظیمات',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
      active: pathname === '/dashboard/settings',
    },
    {
      title: 'اعلان‌ها',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />,
      badge: '3',
      active: pathname === '/dashboard/notifications',
    },
  ];

  return (
    <aside className="h-full bg-white border-l border-gray-200 w-full flex flex-col shadow-lg">
      {/* Close Button (Mobile) */}
      {onClose && (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">منو</h2>
              <p className="text-xs text-gray-500">سامانه ارزیابی</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">
                {user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || ''}
              </span>
            </div>
            {user?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-sky-800 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800 text-sm truncate">
              {user?.fullName || 'کاربر'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || user?.phone || 'کاربر'}
            </p>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-1 ${user?.isVerified ? 'bg-sky-100 text-sky-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {user?.isVerified ? '✓ حساب تأیید شده' : 'در انتظار تأیید'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-2 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                item.active
                  ? 'bg-sky-50 text-sky-600 border-r-4 border-sky-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-sky-600'
              }`}
              onClick={onClose}
            >
              <div className="flex items-center space-x-3">
                <div className={`${item.active ? 'text-sky-600' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <Link
          href="/help"
          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-600 rounded-lg transition-colors"
          onClick={onClose}
        >
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <span>راهنمای استفاده</span>
        </Link>
        
        <Link
          href="/about"
          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-600 rounded-lg transition-colors"
          onClick={onClose}
        >
          <Users className="h-5 w-5 text-gray-500" />
          <span>درباره ما</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
        >
          <LogOut className="h-5 w-5" />
          <span>خروج از سیستم</span>
        </button>
        
        <div className="pt-3 border-t border-gray-200 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </aside>
  );
}