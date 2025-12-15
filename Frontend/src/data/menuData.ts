// src/data/menuData.ts

export const mainNavigation = [
  {
    title: 'صفحه اصلی',
    href: '/',
    icon: 'Home'
  },
  {
    title: 'داشبورد',
    href: '/dashboard',
    icon: 'BarChart'
  },
  {
    title: 'ارزیابی جدید',
    href: '/assessment',
    icon: 'Shield'
  },
  {
    title: 'راهنما',
    href: '/help',
    icon: 'HelpCircle'
  }
];

export const dashboardNavigation = [
  {
    title: 'داشبورد',
    href: '/dashboard',
    icon: 'BarChart',
    active: true,
    description: 'مشاهده آمار و اطلاعات کلی'
  },
  {
    title: 'ارزیابی جدید',
    href: '/',
    icon: 'Shield',
    active: false,
    description: 'شروع ارزیابی رفتاری جدید'
  },
  {
    title: 'پروفایل',
    href: '/dashboard/profile',
    icon: 'User',
    active: false,
    description: 'ویرایش اطلاعات شخصی'
  },
  {
    title: 'نتایج ارزیابی',
    href: '/dashboard/results',
    icon: 'Award',
    active: false,
    description: 'مشاهده نتایج ارزیابی‌ها'
  },
  {
    title: 'تاریخچه ارزیابی‌ها',
    href: '/dashboard/history',
    icon: 'Calendar',
    active: false,
    description: 'لیست تمام ارزیابی‌های انجام شده'
  },
  {
    title: 'گزارش‌ها',
    href: '/dashboard/reports',
    icon: 'PieChart',
    active: false,
    description: 'گزارش‌های تحلیلی و آماری'
  },
  {
    title: 'اعلان‌ها',
    href: '/dashboard/notifications',
    icon: 'Bell',
    active: false,
    description: 'پیام‌ها و اطلاعیه‌های سیستم',
    badge: '3'
  },
  {
    title: 'تنظیمات',
    href: '/dashboard/settings',
    icon: 'Settings',
    active: false,
    description: 'تنظیمات حساب کاربری'
  }
];

export const userMenuItems = [
  {
    title: 'پروفایل کاربری',
    href: '/dashboard/profile',
    icon: 'User',
    description: 'ویرایش اطلاعات شخصی'
  },
  {
    title: 'تنظیمات حساب',
    href: '/dashboard/settings',
    icon: 'Settings',
    description: 'تنظیمات سیستم و حریم خصوصی'
  },
  {
    title: 'تاریخچه ارزیابی‌ها',
    href: '/dashboard/history',
    icon: 'Calendar',
    description: 'لیست تمام ارزیابی‌های انجام شده'
  },
  {
    title: 'اعلان‌ها',
    href: '/dashboard/notifications',
    icon: 'Bell',
    description: 'پیام‌ها و اطلاعیه‌های سیستم'
  },
  {
    title: 'راهنما و پشتیبانی',
    href: '/help',
    icon: 'HelpCircle',
    description: 'راهنمای استفاده و سوالات متداول'
  }
];

export const mobileMenuItems = [
  {
    title: 'صفحه اصلی',
    href: '/',
    icon: 'Home'
  },
  {
    title: 'داشبورد',
    href: '/dashboard',
    icon: 'BarChart'
  },
  {
    title: 'ارزیابی جدید',
    href: '/assessment',
    icon: 'Shield'
  },
  {
    title: 'پروفایل کاربری',
    href: '/dashboard/profile',
    icon: 'User'
  },
  {
    title: 'نتایج ارزیابی',
    href: '/dashboard/results',
    icon: 'Award'
  },
  {
    title: 'اعلان‌ها',
    href: '/dashboard/notifications',
    icon: 'Bell'
  },
  {
    title: 'گزارش‌ها',
    href: '/dashboard/reports',
    icon: 'PieChart'
  },
  {
    title: 'تنظیمات',
    href: '/dashboard/settings',
    icon: 'Settings'
  },
  {
    title: 'راهنما و پشتیبانی',
    href: '/help',
    icon: 'HelpCircle'
  }
];