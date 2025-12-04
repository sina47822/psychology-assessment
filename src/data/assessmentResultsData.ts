// src/data/assessmentResultsData.ts

export const assessmentResults = {
  overallScore: 78,
  completionDate: '۱۴۰۲/۱۰/۱۵',
  duration: '۲۵ دقیقه',
  status: 'completed',
  categories: [
    {
      name: 'شخصیت',
      score: 82,
      color: 'bg-sky-500',
      icon: 'Brain',
      description: 'تحلیل تیپ شخصیتی و ویژگی‌های فردی',
      details: 'شما فردی اجتماعی و خلاق با توانایی‌های ارتباطی قوی هستید.'
    },
    {
      name: 'هوش هیجانی',
      score: 76,
      color: 'bg-sky-500',
      icon: 'Heart',
      description: 'توانایی درک و مدیریت احساسات',
      details: 'درک احساسات خود و دیگران در سطح خوبی قرار دارد.'
    },
    {
      name: 'مهارت‌های اجتماعی',
      score: 85,
      color: 'bg-sky-800',
      icon: 'Users',
      description: 'توانایی برقراری ارتباط با دیگران',
      details: 'توانایی شما در برقراری ارتباط بسیار خوب است.'
    },
    {
      name: 'پیشرفت تحصیلی',
      score: 72,
      color: 'bg-sky-500',
      icon: 'BookOpen',
      description: 'عملکرد درسی و آموزشی',
      details: 'نیاز به بهبود در برنامه‌ریزی و مدیریت زمان دارید.'
    },
    {
      name: 'تمرکز و توجه',
      score: 68,
      color: 'bg-red-500',
      icon: 'Target',
      description: 'توانایی تمرکز و حفظ توجه',
      details: 'تمرکز در کارهای طولانی‌مدت نیاز به تقویت دارد.'
    },
    {
      name: 'انرژی و انگیزه',
      score: 79,
      color: 'bg-sky-500',
      icon: 'Zap',
      description: 'سطح انرژی و انگیزه روزانه',
      details: 'سطح انرژی و انگیزه شما در حد مطلوب است.'
    }
  ],
  strengths: [
    'برقراری ارتباط اجتماعی',
    'همدلی و درک دیگران',
    'خلاقیت و نوآوری',
    'کار تیمی',
    'انعطاف‌پذیری'
  ],
  areasForImprovement: [
    'مدیریت زمان',
    'تمرکز در کارهای طولانی',
    'کنترل استرس',
    'برنامه‌ریزی بلندمدت',
    'تصمیم‌گیری سریع'
  ],
  recommendations: [
    {
      title: 'شرکت در کارگاه‌های مدیریت زمان',
      description: 'کارگاه عملی برای بهبود مهارت مدیریت زمان',
      priority: 'high',
      icon: 'Clock'
    },
    {
      title: 'تمرین تمرکز روزانه',
      description: 'تمرین روزانه ۱۵ دقیقه برای بهبود تمرکز',
      priority: 'medium',
      icon: 'Target'
    },
    {
      title: 'مشاوره فردی',
      description: 'مشاوره فردی برای مدیریت استرس',
      priority: 'high',
      icon: 'MessageSquare'
    },
    {
      title: 'برنامه‌ریزی هفتگی',
      description: 'برنامه‌ریزی هفتگی با کمک والدین',
      priority: 'medium',
      icon: 'Calendar'
    }
  ],
  progressTrend: '+۱۳%',
  assessmentHistory: [
    { date: '۱۴۰۲/۰۹/۱۰', score: 72, change: '+6' },
    { date: '۱۴۰۲/۰۸/۰۵', score: 68, change: '+10' },
    { date: '۱۴۰۲/۰۷/۱۲', score: 65, change: '+13' },
    { date: '۱۴۰۲/۰۶/۲۰', score: 70, change: '+8' }
  ]
};

export const resultTabs = [
  { id: 'overview', label: 'مرور کلی', icon: 'BarChart3' },
  { id: 'detailed', label: 'تحلیل جزئی', icon: 'PieChart' },
  { id: 'comparison', label: 'مقایسه روند', icon: 'TrendingUp' }
];

export const scoreLabels = {
  80: { label: 'عالی', color: 'text-sky-600', bg: 'bg-sky-100' },
  60: { label: 'متوسط', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  0: { label: 'نیاز به بهبود', color: 'text-red-600', bg: 'bg-red-100' }
};

export const assessmentInsights = {
  overall: 'با مقایسه نتایج فعلی با ارزیابی‌های قبلی، مشاهده می‌شود که پیشرفت مثبت و مداومی داشته‌اید. نمره کلی شما از ۶۵ به ۷۸ افزایش یافته که نشان‌دهنده رشد ۱۳ درصدی است.',
  personality: 'تیپ شخصیتی شما بیشتر برون‌گرا و شهودی است که نشان از خلاقیت و توانایی ارتباطی بالا دارد.',
  social: 'مهارت‌های اجتماعی شما در سطح بسیار خوبی قرار دارد که نقطه قوت مهمی محسوب می‌شود.',
  academic: 'با توجه به نتایج، نیاز به تمرکز بیشتری بر برنامه‌ریزی و مدیریت زمان دارید.'
};