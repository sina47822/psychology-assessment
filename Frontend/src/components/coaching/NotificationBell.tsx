// src/components/coaching/NotificationBell.tsx
'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Notification } from '@/services/notificationService';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // بارگذاری نوتیفیکیشن‌ها از localStorage
    const loadNotifications = () => {
      const stored = localStorage.getItem('notifications_user1') || '[]';
      const parsed = JSON.parse(stored);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: Notification) => !n.isRead).length);
    };

    loadNotifications();

    // گوش دادن به event جدید
    const handleNewNotification = (event: CustomEvent) => {
      loadNotifications();
    };

    window.addEventListener('show-notification', handleNewNotification as EventListener);
    
    return () => {
      window.removeEventListener('show-notification', handleNewNotification as EventListener);
    };
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications_user1', JSON.stringify(updated));
    setUnreadCount(updated.filter(n => !n.isRead).length);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('notifications_user1', JSON.stringify(updated));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'weekly_task': return '📅';
      case 'achievement': return '🏆';
      case 'reward': return '🎁';
      case 'reminder': return '⏰';
      case 'motivation': return '💫';
      default: return '🔔';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">اعلان‌ها</h3>
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="text-sm text-sky-500 hover:text-sky-700"
              >
                خوانده‌شده‌ها
              </button>
              <button
                onClick={() => setShowDropdown(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>اعلانی وجود ندارد</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-sky-50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-800">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Check className="h-4 w-4 text-gray-500" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {notification.message}
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString('fa-IR')}
                      </div>
                      {notification.data?.points && (
                        <div className="mt-2 inline-flex items-center gap-1 bg-sky-100 text-sky-800 px-2 py-1 rounded text-xs">
                          +{notification.data.points} امتیاز
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}