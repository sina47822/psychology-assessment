// src/app/dashboard/layout.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Header from '@/components/DashboardLayout/Header';
import Sidebar from '@/components/DashboardLayout/Sidebar';
import Footer from '@/components/DashboardLayout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();

  // اگر در حال لودینگ است، اسپینر نشان بده
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // اگر کاربر لاگین نکرده است، layout خالی برگردان
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-50 flex flex-col">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex flex-1 relative">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-0 h-[calc(100vh-64px)]">
            <Sidebar />
          </div>
          
          {/* Mobile Sidebar */}
          <div
            className={`lg:hidden fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
          
          {/* Overlay برای موبایل */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 min-h-[calc(100vh-200px)]">
                {children}
              </div>
            </div>
          </main>
        </div>
        
        {/* Footer */}
        <div className="mt-auto">
          <Footer simplified />
        </div>
      </div>
    </AuthGuard>
  );
}