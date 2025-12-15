// src/data/dashboardData.ts

export const dashboardStats = {
  totalAssessments: 6,
  totalDownloads: 188,
  averageScore: 76,
  completionRate: 85,
  unreadNotifications: 3,
  activeAssessments: 1,
  totalUsers: 5000,
  satisfactionRate: 95
};

export const assessmentCategories = [
  {
    name: 'شخصیت',
    score: 82,
    color: 'bg-sky-500',
    icon: 'Brain',
    description: 'تحلیل تیپ شخصیتی و ویژگی‌های فردی'
  },
  {
    name: 'هوش هیجانی',
    score: 76,
    color: 'bg-sky-500',
    icon: 'Heart',
    description: 'توانایی درک و مدیریت احساسات'
  },
  {
    name: 'مهارت‌های اجتماعی',
    score: 85,
    color: 'bg-sky-800',
    icon: 'Users',
    description: 'توانایی برقراری ارتباط با دیگران'
  },
  {
    name: 'پیشرفت تحصیلی',
    score: 72,
    color: 'bg-sky-500',
    icon: 'BookOpen',
    description: 'عملکرد درسی و آموزشی'
  },
  {
    name: 'تمرکز و توجه',
    score: 68,
    color: 'bg-red-500',
    icon: 'Target',
    description: 'توانایی تمرکز و حفظ توجه'
  },
  {
    name: 'انرژی و انگیزه',
    score: 79,
    color: 'bg-sky-500',
    icon: 'Zap',
    description: 'سطح انرژی و انگیزه روزانه'
  }
];

export const quickActions = [
  {
    title: 'پروفایل کاربری',
    description: 'ویرایش اطلاعات شخصی',
    icon: 'User',
    href: '/dashboard/profile',
    color: 'sky'
  },
  {
    title: 'تغییر رمز عبور',
    description: 'به‌روزرسانی رمز عبور',
    icon: 'Lock',
    href: '/dashboard/settings/security',
    color: 'red'
  },
  {
    title: 'ارزیابی رفتاری',
    description: 'مشاهده نتایج یا شروع مجدد',
    icon: 'FileText',
    href: '/',
    color: 'green'
  },
  {
    title: 'راهنما و پشتیبانی',
    description: 'مشاهده راهنما و سوالات متداول',
    icon: 'HelpCircle',
    href: '/help',
    color: 'sky'
  }
];

export const recentActivities = [
  {
    id: 1,
    action: 'ورود به سیستم',
    user: 'شما',
    time: new Date().toLocaleString('fa-IR'),
    icon: 'User',
    status: 'success',
    category: 'account'
  },
  {
    id: 2,
    action: 'تکمیل ارزیابی',
    user: 'شما',
    time: '۱۴۰۲/۱۰/۱۵',
    icon: 'CheckCircle',
    status: 'completed',
    category: 'assessment'
  },
  {
    id: 3,
    action: 'به‌روزرسانی پروفایل',
    user: 'شما',
    time: '۲ روز پیش',
    icon: 'Settings',
    status: 'updated',
    category: 'account'
  },
  {
    id: 4,
    action: 'دانلود گزارش',
    user: 'شما',
    time: '۱ هفته پیش',
    icon: 'Download',
    status: 'completed',
    category: 'report'
  }
];

export const systemInfo = {
  securityLevel: 'بالا',
  storageUsed: '350MB از 1GB',
  subscriptionType: 'رایگان',
  expiryDate: 'نامحدود',
  version: '1.0.1',
  lastUpdate: '۱۴۰۲/۱۰/۱۰'
};

export const recommendations = [
  {
    title: 'جلسه مشاوره آنلاین',
    description: 'با توجه به نتایج ارزیابی، یک جلسه مشاوره توصیه می‌شود',
    icon: 'MessageSquare',
    category: 'consultation',
    priority: 'high'
  },
  {
    title: 'کارگاه آموزشی والدین',
    description: 'کارگاه "درک نوجوانان" برای والدین پیشنهاد می‌شود',
    icon: 'Users',
    category: 'workshop',
    priority: 'medium'
  },
  {
    title: 'تمرینات تمرکز',
    description: 'تمرین روزانه ۱۵ دقیقه برای بهبود تمرکز',
    icon: 'Target',
    category: 'exercise',
    priority: 'low'
  }
];

export const previousResults = [
  { date: '۱۴۰۲/۰۹/۱۰', score: 72, change: '+6' },
  { date: '۱۴۰۲/۰۸/۰۵', score: 68, change: '+10' },
  { date: '۱۴۰۲/۰۷/۱۲', score: 65, change: '+13' },
  { date: '۱۴۰۲/۰۶/۲۰', score: 70, change: '+8' }
];