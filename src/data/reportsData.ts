// src/data/reportsData.ts

export const reportsList = [
  {
    id: 1,
    title: 'گزارش ماهانه عملکرد',
    description: 'تحلیل کامل عملکرد ماه گذشته',
    type: 'monthly',
    icon: 'BarChart3',
    date: 'بهمن ۱۴۰۲',
    status: 'completed',
    downloads: 45,
    size: '2.5 MB',
    color: 'bg-sky-500',
    category: 'performance'
  },
  {
    id: 2,
    title: 'گزارش تحلیلی شخصیت',
    description: 'تحلیل تیپ شخصیتی و ویژگی‌ها',
    type: 'personality',
    icon: 'PieChart',
    date: 'دی ۱۴۰۲',
    status: 'completed',
    downloads: 32,
    size: '1.8 MB',
    color: 'bg-sky-500',
    category: 'personality'
  },
  {
    id: 3,
    title: 'گزارش پیشرفت تحصیلی',
    description: 'روند پیشرفت درسی و آموزشی',
    type: 'academic',
    icon: 'TrendingUp',
    date: 'آذر ۱۴۰۲',
    status: 'completed',
    downloads: 28,
    size: '1.2 MB',
    color: 'bg-sky-800',
    category: 'academic'
  },
  {
    id: 4,
    title: 'گزارش سلامت روان',
    description: 'بررسی سلامت روان و عاطفی',
    type: 'mental-health',
    icon: 'LineChart',
    date: 'آبان ۱۴۰۲',
    status: 'completed',
    downloads: 41,
    size: '3.1 MB',
    color: 'bg-sky-500',
    category: 'mental-health'
  },
  {
    id: 5,
    title: 'گزارش مهارت‌های اجتماعی',
    description: 'تحلیل مهارت‌های ارتباطی و اجتماعی',
    type: 'social',
    icon: 'Users',
    date: 'مهر ۱۴۰۲',
    status: 'completed',
    downloads: 23,
    size: '2.1 MB',
    color: 'bg-sky-500',
    category: 'social'
  },
  {
    id: 6,
    title: 'گزارش جامع سالانه',
    description: 'خلاصه عملکرد یک ساله',
    type: 'annual',
    icon: 'Award',
    date: 'شهریور ۱۴۰۲',
    status: 'completed',
    downloads: 19,
    size: '4.5 MB',
    color: 'bg-red-500',
    category: 'annual'
  }
];

export const reportsStats = {
  totalReports: 6,
  totalDownloads: 188,
  averageScore: 76,
  completionRate: 85,
  generatedThisMonth: 2,
  pendingReports: 1
};

export const reportTypes = [
  { value: 'monthly', label: 'ماهانه', icon: 'Calendar' },
  { value: 'personality', label: 'شخصیت', icon: 'User' },
  { value: 'academic', label: 'تحصیلی', icon: 'GraduationCap' },
  { value: 'mental-health', label: 'سلامت روان', icon: 'Heart' },
  { value: 'social', label: 'اجتماعی', icon: 'Users' },
  { value: 'annual', label: 'سالانه', icon: 'Award' }
];

export const reportActions = [
  {
    title: 'چاپ گزارش‌ها',
    description: 'پرینت تمام گزارش‌ها',
    icon: 'Printer',
    action: 'print'
  },
  {
    title: 'اشتراک‌گذاری',
    description: 'اشتراک گزارش با دیگران',
    icon: 'Share2',
    action: 'share'
  },
  {
    title: 'دانلود همه',
    description: 'دانلود تمام گزارش‌ها',
    icon: 'Download',
    action: 'downloadAll'
  },
  {
    title: 'بروزرسانی',
    description: 'بروزرسانی گزارش‌ها',
    icon: 'RefreshCw',
    action: 'refresh'
  }
];

export const recentReportActivity = [
  { id: 1, action: 'دانلود گزارش ماهانه', user: 'شما', time: '۲ ساعت پیش' },
  { id: 2, action: 'اشتراک‌گذاری گزارش شخصیت', user: 'شما', time: '۱ روز پیش' },
  { id: 3, action: 'ایجاد گزارش جدید', user: 'سیستم', time: '۳ روز پیش' },
  { id: 4, action: 'دانلود گزارش سلامت روان', user: 'شما', time: '۱ هفته پیش' }
];