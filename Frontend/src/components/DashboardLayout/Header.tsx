'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { 
  Menu,
  Bell,
  Search,
  HelpCircle,
  Shield,
  X,
  User,
  Home,
  Settings,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  user?: any; // اضافه کردن این خط
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const { user: authUser } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userInitials = `${user?.first_name?.charAt(0) || ''}${user?.last_name?.charAt(0) || ''}`.toUpperCase();

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onMenuClick?.() || setShowMobileMenu(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                aria-label="باز کردن منو"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold text-gray-800">
                    سامانه ارزیابی نوجوانان
                  </h1>
                  <p className="text-xs text-gray-500">
                    داشبورد کاربری
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="جستجو در داشبورد..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none bg-gray-50"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Help Button */}
              <Link
                href="/help"
                className="hidden md:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm">راهنما</span>
              </Link>

              {/* Home Button */}
              <Link
                href="/"
                className="hidden md:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="text-sm">صفحه اصلی</span>
              </Link>

              {/* Notifications */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
                    aria-label="اعلان‌ها"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">اعلان‌های جدید</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                          <p className="text-sm text-gray-700">ارزیابی جدید شما تکمیل شد</p>
                          <p className="text-xs text-gray-500 mt-1">2 ساعت پیش</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                          <p className="text-sm text-gray-700">گزارش ماهانه آماده است</p>
                          <p className="text-xs text-gray-500 mt-1">1 روز پیش</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/notifications" className="text-sm text-sky-500 hover:text-sky-800 text-center block py-2">
                          مشاهده همه اعلان‌ها
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Profile Info (Desktop) */}
              {user && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                      {user?.full_name || 'کاربر'}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {user?.email || user?.phone || ''}
                    </p>
                  </div>
                  <Link href="/dashboard/profile">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <span className="text-white font-bold text-sm">
                        {userInitials}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="lg:hidden py-3 animate-slideDown">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none bg-white"
                  onBlur={() => setShowSearch(false)}
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu (برای صفحه‌هایی که سایدبار ندارند) */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out animate-slideInRight">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">منو</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>داشبورد</span>
                </Link>
                
                <Link
                  href="/dashboard/profile"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="h-5 w-5" />
                  <span>پروفایل کاربری</span>
                </Link>
                
                <Link
                  href="/"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Shield className="h-5 w-5" />
                  <span>ارزیابی جدید</span>
                </Link>
                
                <Link
                  href="/settings"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span>تنظیمات</span>
                </Link>
                
                <Link
                  href="/help"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>راهنما</span>
                </Link>
              </nav>
              
              {user && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-sm">
                        {userInitials}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email || user.phone}</p>
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span>خروج از سیستم</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}