// components/layout/DashboardLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Sidebar from './Sidebar';
import Header from './Header';
import { Loader2, AlertCircle } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title = 'داشبورد' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionChecking, setSessionChecking] = useState(false);
  const { user, isLoading, is_authenticated, checkSession, logout } = useAuth();
  const router = useRouter();

  // بررسی دوره‌ای سشن
  const verifySession = async () => {
    setSessionChecking(true);
    try {
      const isValid = await checkSession();
      if (!isValid) {
        alert('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
        await logout();
      }
    } catch (error) {
      console.error('Error verifying session:', error);
    } finally {
      setSessionChecking(false);
    }
  };

  useEffect(() => {
    // بررسی اولیه سشن
    if (is_authenticated) {
      verifySession();
    }

    // بررسی دوره‌ای هر 10 دقیقه
    const interval = setInterval(() => {
      if (is_authenticated) {
        verifySession();
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [is_authenticated]);

  // اگر در حال لودینگ است
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
        <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
      </div>
    );
  }

  // اگر کاربر لاگین نکرده
  if (!user || !is_authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">دسترسی غیرمجاز</h1>
        <p className="text-gray-600 mb-6">برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید.</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-sky-500 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ورود به سیستم
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Session Check Indicator */}
      {sessionChecking && (
        <div className="fixed top-4 left-4 z-50 bg-sky-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">در حال بررسی نشست...</span>
        </div>
      )}

      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              {user && (
                <p className="text-gray-600 mt-2">
                  خوش آمدید، {user.first_name} {user.last_name} 👋
                </p>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
              {children}
            </div>

            {/* Session Info (برای دیباگ) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <details className="text-sm text-gray-600">
                  <summary className="cursor-pointer font-medium">اطلاعات سشن (دیباگ)</summary>
                  <div className="mt-2 space-y-1">
                    <p>کاربر: {user?.username}</p>
                    <p>Session ID: {localStorage.getItem('session_id')?.substring(0, 20)}...</p>
                    <p>آخرین ورود: {new Date(user?.last_login || '').toLocaleString('fa-IR')}</p>
                    <button
                      onClick={verifySession}
                      className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      بررسی سشن
                    </button>
                  </div>
                </details>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}