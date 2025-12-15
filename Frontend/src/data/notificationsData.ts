// src/data/notificationsData.ts

export const notificationsList = [
  {
    id: 1,
    title: 'ارزیابی شما تکمیل شد',
    message: 'نتایج ارزیابی رفتاری شما آماده است. برای مشاهده گزارش کلیک کنید.',
    type: 'success',
    icon: 'CheckCircle',
    read: false,
    important: true,
    time: '2 ساعت پیش',
    date: '۱۴۰۲/۱۰/۱۵',
    category: 'assessment'
  },
  {
    id: 2,
    title: 'جلسه مشاوره تنظیم شد',
    message: 'جلسه مشاوره شما برای فردا ساعت ۱۰ صبح تنظیم شده است.',
    type: 'info',
    icon: 'Calendar',
    read: false,
    important: true,
    time: '۱ روز پیش',
    date: '۱۴۰۲/۱۰/۱۴',
    category: 'appointment'
  },
  {
    id: 3,
    title: 'هشدار امنیتی',
    message: 'ورود جدید از دستگاه ناشناس شناسایی شد.',
    type: 'warning',
    icon: 'AlertCircle',
    read: true,
    important: true,
    time: '۲ روز پیش',
    date: '۱۴۰۲/۱۰/۱۳',
    category: 'security'
  },
  {
    id: 4,
    title: 'کارگاه آموزشی جدید',
    message: 'کارگاه "مدیریت استرس نوجوانان" اضافه شد.',
    type: 'info',
    icon: 'Users',
    read: true,
    important: false,
    time: '۳ روز پیش',
    date: '۱۴۰۲/۱۰/۱۲',
    category: 'workshop'
  },
  {
    id: 5,
    title: 'به‌روزرسانی سیستم',
    message: 'سیستم به نسخه ۲.۱.۰ ارتقا یافت.',
    type: 'info',
    icon: 'Info',
    read: true,
    important: false,
    time: '۱ هفته پیش',
    date: '۱۴۰۲/۱۰/۰۸',
    category: 'system'
  },
  {
    id: 6,
    title: 'نتایج تست اضافه شد',
    message: 'تست جدید شخصیت اضافه شده است.',
    type: 'success',
    icon: 'FileText',
    read: true,
    important: false,
    time: '۱ هفته پیش',
    date: '۱۴۰۲/۱۰/۰۷',
    category: 'assessment'
  },
  {
    id: 7,
    title: 'نظر مشاور',
    message: 'مشاور شما در مورد نتایج ارزیابی نظر داده است.',
    type: 'info',
    icon: 'MessageSquare',
    read: false,
    important: true,
    time: '۲ هفته پیش',
    date: '۱۴۰۲/۱۰/۰۱',
    category: 'feedback'
  },
  {
    id: 8,
    title: 'تاریخ انقضا نزدیک است',
    message: 'اشتراک شما تا ۷ روز دیگر به پایان می‌رسد.',
    type: 'warning',
    icon: 'Clock',
    read: false,
    important: true,
    time: '۲ هفته پیش',
    date: '۱۴۰۲/۰۹/۲۸',
    category: 'account'
  }
];

export const notificationStats = {
  total: 8,
  unread: 3,
  important: 4,
  today: 2
};

export const notificationTypes = [
  { value: 'all', label: 'همه', icon: 'Bell' },
  { value: 'unread', label: 'خوانده نشده', icon: 'Eye' },
  { value: 'important', label: 'مهم', icon: 'Star' }
];

export const notificationCategories = [
  { value: 'assessment', label: 'ارزیابی‌ها', icon: 'FileText' },
  { value: 'appointment', label: 'جلسات', icon: 'Calendar' },
  { value: 'security', label: 'امنیت', icon: 'Shield' },
  { value: 'workshop', label: 'کارگاه‌ها', icon: 'Users' },
  { value: 'system', label: 'سیستم', icon: 'Settings' },
  { value: 'feedback', label: 'نظرات', icon: 'MessageSquare' },
  { value: 'account', label: 'حساب کاربری', icon: 'User' }
];