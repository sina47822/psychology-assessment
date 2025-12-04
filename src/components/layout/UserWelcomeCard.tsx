'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { User, FileText, Settings, BarChart, Clock, CheckCircle } from 'lucide-react';

interface UserWelcomeCardProps {
  showStats?: boolean;
  currentStep?: number;
  totalSelected?: number;
  selectionRules?: any;
}

export default function UserWelcomeCard({ 
  showStats = false,
  currentStep = 0,
  totalSelected = 0,
  selectionRules
}: UserWelcomeCardProps) {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) return null;

  const userFullName = user.fullName;
  const userInitials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  const lastLoginDate = new Date(user.lastLogin).toLocaleDateString('fa-IR');
  const stepTitle = currentStep === 0 ? 'خوش‌آمدگویی' :
                   currentStep === 1 ? 'اطلاعات دموگرافیک' :
                   'پرسشنامه';

  return (
    <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-2xl p-6 mb-6 border border-sky-100">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {userInitials}
              </span>
            </div>
            {user.isVerified && (
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-sky-800 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              سلام، {user.firstName} عزیز 👋
            </h2>
            <p className="text-gray-600 mt-1">
              به سامانه ارزیابی رفتاری نوجوانان خوش آمدید
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm text-gray-600">وضعیت حساب:</p>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${user.isVerified ? 'bg-sky-100 text-sky-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {user.isVerified ? 'تأیید شده' : 'در انتظار تأیید'}
            </div>
          </div>
          
          <Link
            href="/profile"
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span className="text-sm">پروفایل</span>
          </Link>
        </div>
      </div>
      
      {/* اطلاعات تکمیلی */}
      {showStats && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مرحله فعلی</p>
                <p className="font-bold text-gray-800">{stepTitle}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">تعداد پاسخ‌ها</p>
                <p className="font-bold text-gray-800">
                  {totalSelected} از {selectionRules?.maxTotal || 80}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">آخرین فعالیت</p>
                <p className="font-bold text-gray-800">{lastLoginDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* دکمه‌های سریع */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
        >
          <BarChart className="h-4 w-4" />
          <span>داشبورد</span>
        </Link>
        
        <Link
          href="/assessment-history"
          className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>تاریخچه ارزیابی‌ها</span>
        </Link>
        
        <Link
          href="/settings"
          className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>تنظیمات</span>
        </Link>
      </div>
    </div>
  );
}