'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { 
  Home, 
  BarChart, 
  HelpCircle, 
  User, 
  Settings, 
  FileText, 
  LogOut, 
  ChevronDown,
  Menu,
  X,
  Bell,
  Phone,
  Info,
  Shield
} from 'lucide-react';

interface HeaderProps {
  showAssessmentNav?: boolean;
  currentStep?: number;
  totalSteps?: number;
  userName?: string;
  userInitials?: string;
}

export default function Header({ 
  showAssessmentNav = false,
  currentStep = 0,
  totalSteps = 0,
  userName = '',
  userInitials = ''
}: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userFullName = user?.fullName || userName;
  const userEmailPhone = user?.email || user?.phone || '';
  const initials = userInitials || `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`.toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleAssessmentStep = (stepNumber: number) => {
    // این تابع باید از صفحه اصلی دریافت شود
    // فعلاً فقط صفحه را ریفرش می‌کند
    router.refresh();
  };

  return (
    <>
      {/* ناوبری بالا */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* لوگو و برند */}
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <Link href="/" className="flex items-center space-x-3 mr-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold text-gray-800">
                    سامانه ارزیابی نوجوانان
                  </h1>
                  <p className="text-xs text-gray-500">
                    {CONTACT_INFO.organization}
                  </p>
                </div>
              </Link>
            </div>

            {/* دسکتاپ منو */}
            <div className="hidden md:flex items-center space-x-6">
              {showAssessmentNav && totalSteps > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium">مرحله:</span>
                  <span className="text-sky-500 font-bold">{currentStep}/{totalSteps}</span>
                </div>
              )}
              
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>صفحه اصلی</span>
              </Link>
              
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
              >
                <BarChart className="h-5 w-5" />
                <span>داشبورد</span>
              </Link>
              
              <Link
                href="/help"
                className="flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <span>راهنما</span>
              </Link>
              
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-left hidden lg:block">
                        <p className="text-sm font-medium text-gray-700">{userFullName}</p>
                        <p className="text-xs text-gray-500">
                          {userEmailPhone}
                        </p>
                      </div>
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-sm">
                            {initials}
                          </span>
                        </div>
                        {user.isVerified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-sky-800 rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-700">{userFullName}</p>
                        <p className="text-xs text-gray-500 mt-1">{userEmailPhone}</p>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4 text-gray-500" />
                          <span>ویرایش پروفایل</span>
                        </Link>
                        
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <BarChart className="h-4 w-4 text-gray-500" />
                          <span>داشبورد کاربری</span>
                        </Link>
                        
                        <Link
                          href="/assessment-history"
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>تاریخچه ارزیابی‌ها</span>
                        </Link>
                        
                        <Link
                          href="/settings"
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span>تنظیمات</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>خروج از سیستم</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!user && (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-sky-500 transition-colors"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    ثبت‌نام
                  </Link>
                </div>
              )}
            </div>

            {/* موبایل - دکمه کاربر */}
            {user && (
              <div className="md:hidden">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">
                      {initials}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* موبایل منو */}
          {showMobileMenu && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="space-y-2 px-4">
                <Link
                  href="/"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>صفحه اصلی</span>
                </Link>
                
                {user && (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <BarChart className="h-5 w-5" />
                      <span>داشبورد</span>
                    </Link>
                    
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>پروفایل کاربری</span>
                    </Link>
                    
                    <Link
                      href="/assessment-history"
                      className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <FileText className="h-5 w-5" />
                      <span>تاریخچه ارزیابی‌ها</span>
                    </Link>
                  </>
                )}
                
                <Link
                  href="/help"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>راهنما و پشتیبانی</span>
                </Link>
                
                <Link
                  href="/about"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Info className="h-5 w-5" />
                  <span>درباره ما</span>
                </Link>
                
                <Link
                  href="/contact"
                  className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Phone className="h-5 w-5" />
                  <span>تماس با ما</span>
                </Link>
                
                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center space-x-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>خروج از حساب</span>
                  </button>
                )}
              </div>
              
              {user && (
                <div className="mt-4 px-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{userFullName}</p>
                    <p className="text-xs mt-1">{userEmailPhone}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-2 ${user.isVerified ? 'bg-sky-100 text-sky-800' : 'bg-sky-100 text-sky-800'}`}>
                      {user.isVerified ? '✓ حساب تأیید شده' : 'در انتظار تأیید'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* منوی کاربر موبایل */}
      {showUserMenu && !showMobileMenu && user && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowUserMenu(false)}></div>
          <div className="fixed right-0 top-16 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{initials}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{userFullName}</p>
                  <p className="text-xs text-gray-500 mt-1">{userEmailPhone}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              <Link
                href="/profile"
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <User className="h-5 w-5 text-gray-500" />
                <span>پروفایل کاربری</span>
              </Link>
              
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <BarChart className="h-5 w-5 text-gray-500" />
                <span>داشبورد کاربری</span>
              </Link>
              
              <Link
                href="/settings"
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="h-5 w-5 text-gray-500" />
                <span>تنظیمات</span>
              </Link>
              
              <Link
                href="/assessment-history"
                className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <FileText className="h-5 w-5 text-gray-500" />
                <span>تاریخچه ارزیابی‌ها</span>
              </Link>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  handleLogout();
                  setShowUserMenu(false);
                }}
                className="flex items-center justify-center space-x-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>خروج از سیستم</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}