'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Clock, 
  Filter, 
  Trash2,
  CheckCheck,
  Settings,
  Eye,
  Star,
  MessageSquare,
  FileText,
  Users,
  Calendar
} from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'ارزیابی شما تکمیل شد',
      message: 'نتایج ارزیابی رفتاری شما آماده است. برای مشاهده گزارش کلیک کنید.',
      type: 'success',
      icon: CheckCircle,
      read: false,
      important: true,
      time: '2 ساعت پیش',
      date: '۱۴۰۲/۱۰/۱۵',
      category: 'assessment',
    },
    {
      id: 2,
      title: 'جلسه مشاوره تنظیم شد',
      message: 'جلسه مشاوره شما برای فردا ساعت ۱۰ صبح تنظیم شده است.',
      type: 'info',
      icon: Calendar,
      read: false,
      important: true,
      time: '۱ روز پیش',
      date: '۱۴۰۲/۱۰/۱۴',
      category: 'appointment',
    },
    {
      id: 3,
      title: 'هشدار امنیتی',
      message: 'ورود جدید از دستگاه ناشناس شناسایی شد.',
      type: 'warning',
      icon: AlertCircle,
      read: true,
      important: true,
      time: '۲ روز پیش',
      date: '۱۴۰۲/۱۰/۱۳',
      category: 'security',
    },
    {
      id: 4,
      title: 'کارگاه آموزشی جدید',
      message: 'کارگاه "مدیریت استرس نوجوانان" اضافه شد.',
      type: 'info',
      icon: Users,
      read: true,
      important: false,
      time: '۳ روز پیش',
      date: '۱۴۰۲/۱۰/۱۲',
      category: 'workshop',
    },
    {
      id: 5,
      title: 'به‌روزرسانی سیستم',
      message: 'سیستم به نسخه ۲.۱.۰ ارتقا یافت.',
      type: 'info',
      icon: Info,
      read: true,
      important: false,
      time: '۱ هفته پیش',
      date: '۱۴۰۲/۱۰/۰۸',
      category: 'system',
    },
    {
      id: 6,
      title: 'نتایج تست اضافه شد',
      message: 'تست جدید شخصیت اضافه شده است.',
      type: 'success',
      icon: FileText,
      read: true,
      important: false,
      time: '۱ هفته پیش',
      date: '۱۴۰۲/۱۰/۰۷',
      category: 'assessment',
    },
    {
      id: 7,
      title: 'نظر مشاور',
      message: 'مشاور شما در مورد نتایج ارزیابی نظر داده است.',
      type: 'info',
      icon: MessageSquare,
      read: false,
      important: true,
      time: '۲ هفته پیش',
      date: '۱۴۰۲/۱۰/۰۱',
      category: 'feedback',
    },
    {
      id: 8,
      title: 'تاریخ انقضا نزدیک است',
      message: 'اشتراک شما تا ۷ روز دیگر به پایان می‌رسد.',
      type: 'warning',
      icon: Clock,
      read: false,
      important: true,
      time: '۲ هفته پیش',
      date: '۱۴۰۲/۰۹/۲۸',
      category: 'account',
    },
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'warning':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'info':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'assessment':
        return FileText;
      case 'appointment':
        return Calendar;
      case 'security':
        return AlertCircle;
      case 'workshop':
        return Users;
      case 'feedback':
        return MessageSquare;
      case 'account':
        return Info;
      default:
        return Info;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'important') return notif.important;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Bell className="h-8 w-8 text-sky-500" />
            اعلان‌ها
          </h1>
          <p className="text-gray-600 mt-2">
            مدیریت پیام‌ها و اطلاعیه‌های سیستم
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            <CheckCheck className="h-5 w-5" />
            خواندن همه
          </button>
          <Link
            href="/dashboard/settings/notifications"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="h-5 w-5" />
            تنظیمات
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">کل اعلان‌ها</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{notifications.length}</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg">
              <Bell className="h-6 w-6 text-sky-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">خوانده نشده</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{unreadCount}</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg">
              <Eye className="h-6 w-6 text-sky-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">مهم</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {notifications.filter(n => n.important).length}
              </h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Star className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">امروز</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">2</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg">
              <Calendar className="h-6 w-6 text-sky-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">فیلتر:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'unread'
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                خوانده نشده
                {unreadCount > 0 && (
                  <span className="mr-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setFilter('important')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'important'
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                مهم
              </button>
            </div>
          </div>
          
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            حذف همه
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const CategoryIcon = getCategoryIcon(notification.category);
              
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-sky-50/50' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(notification.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="px-2 py-1 bg-sky-500 text-white text-xs rounded-full">
                                جدید
                              </span>
                            )}
                            {notification.important && (
                              <Star className="h-4 w-4 text-sky-500 fill-current" />
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <CategoryIcon className="h-4 w-4" />
                              <span>{notification.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{notification.time}</span>
                            </div>
                            <span>{notification.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                              title="علامت به عنوان خوانده شده"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">هیچ اعلانی یافت نشد</h3>
            <p className="text-gray-500 mt-2">
              {filter !== 'all' ? 'با فیلتر فعلی اعلانی وجود ندارد.' : 'هنوز اعلانی برای شما ارسال نشده است.'}
            </p>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl p-6 border border-sky-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              تنظیمات دریافت اعلان‌ها
            </h3>
            <p className="text-gray-600">
              می‌توانید نوع اعلان‌های دریافتی خود را مدیریت کنید
            </p>
          </div>
          <Link
            href="/dashboard/settings/notifications"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
          >
            <Settings className="h-5 w-5" />
            مدیریت تنظیمات
          </Link>
        </div>
      </div>
    </div>
  );
}