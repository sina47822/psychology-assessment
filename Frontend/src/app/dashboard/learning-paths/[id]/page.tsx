// src/app/dashboard/learning-paths/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, BookOpen, Calendar, CheckCircle, Clock, Lock, 
  PlayCircle, Star, Target, TrendingUp, Users, Video, 
  FileText, MessageSquare, Award, ChevronLeft, Share2, Bookmark,
  BarChart3, Download, Eye, Heart
} from 'lucide-react';

// داده‌های تستی مسیر
const PATH_DETAILS = {
  id: 'communication',
  title: 'ارتباط مؤثر با نوجوان',
  description: 'یک مسیر ۴ هفته‌ای برای یادگیری مهارت‌های ارتباطی پیشرفته با نوجوان',
  longDescription: `
    در این مسیر ۴ هفته‌ای، مهارت‌های ضروری برای ایجاد و حفظ ارتباط مؤثر با نوجوان را فرا می‌گیرید.
    هر هفته بر یک جنبه خاص از ارتباط تمرکز دارد و شامل تمرین‌های عملی، چالش‌های روزانه
    و راهکارهای اثبات شده می‌باشد.
    
    این مسیر برای والدینی طراحی شده که می‌خواهند:
    • رابطه عمیق‌تری با نوجوان خود برقرار کنند
    • مهارت گوش دادن فعال را تقویت کنند
    • گفتگوهای مؤثر و بدون تنش داشته باشند
    • فضای امنی برای بیان احساسات ایجاد کنند
  `,
  category: 'communication',
  difficulty: 'beginner',
  duration: 4,
  enrolledCount: 245,
  rating: 4.8,
  total_points: 500,
  prerequisites: [],
  isEnrolled: true,
  progress: 75,
  isActive: true,
  
  instructor: {
    name: 'دکتر سارا محمدی',
    title: 'روانشناس کودک و نوجوان',
    bio: '۱۵ سال سابقه مشاوره خانواده، نویسنده ۳ کتاب پرفروش در حوزه ارتباط با نوجوان',
    avatar: '/instructors/sara.jpg'
  },
  
  weeklyModules: [
    {
      week: 1,
      title: 'پایه‌های ارتباط مؤثر',
      description: 'آشنایی با اصول اولیه ارتباط و گوش دادن فعال',
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      dailyTasks: 7,
      completedTasks: 7,
      content: {
        videos: 3,
        articles: 5,
        exercises: 7,
        quizzes: 1
      }
    },
    {
      week: 2,
      title: 'گوش دادن فعال',
      description: 'یادگیری مهارت گوش دادن بدون قضاوت و با تمرکز کامل',
      isUnlocked: true,
      isCompleted: true,
      progress: 100,
      dailyTasks: 7,
      completedTasks: 7,
      content: {
        videos: 4,
        articles: 4,
        exercises: 7,
        quizzes: 1
      }
    },
    {
      week: 3,
      title: 'گفتگوی مؤثر',
      description: 'آموزش تکنیک‌های گفتگوی سازنده و حل تعارض',
      isUnlocked: true,
      isCompleted: false,
      progress: 42,
      dailyTasks: 7,
      completedTasks: 3,
      content: {
        videos: 3,
        articles: 6,
        exercises: 7,
        quizzes: 1
      }
    },
    {
      week: 4,
      title: 'تثبیت مهارت‌ها',
      description: 'تمرین و تثبیت مهارت‌های یادگرفته شده',
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      dailyTasks: 7,
      completedTasks: 0,
      content: {
        videos: 2,
        articles: 5,
        exercises: 7,
        quizzes: 1
      }
    }
  ],
  
  learningOutcomes: [
    'توانایی گوش دادن فعال بدون قضاوت',
    'مهارت شروع و هدایت گفتگوهای مؤثر',
    'کنترل هیجانات در زمان تعارض',
    'ایجاد فضای امن برای بیان احساسات',
    'تقویت اعتماد و صمیمیت در رابطه'
  ],
  
  resources: [
    { type: 'pdf', title: 'راهنمای کامل ارتباط مؤثر', size: '۲٫۴ مگابایت' },
    { type: 'video', title: 'کارگاه عملی گوش دادن فعال', duration: '۴۵ دقیقه' },
    { type: 'checklist', title: 'چک‌لیست روزانه ارتباط', size: '۵۰۰ کیلوبایت' },
    { type: 'template', title: 'الگوی گفتگوی مؤثر', size: '۱٫۲ مگابایت' }
  ],
  
  testimonials: [
    {
      name: 'مریم رضایی',
      role: 'مادر یک نوجوان ۱۴ ساله',
      text: 'بعد از ۲ هفته از این مسیر، رابطه من و پسرم کاملاً تغییر کرده. حالا می‌تونیم ساعت‌ها درباره موضوعات مختلف صحبت کنیم.',
      rating: 5
    },
    {
      name: 'علی محمدی',
      role: 'پدر دو نوجوان',
      text: 'تمرین‌های عملی این مسیر واقعاً کاربردی هستن. تکنیک گوش دادن فعال زندگی خانوادگی ما رو متحول کرد.',
      rating: 5
    }
  ]
};

export default function PathDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [path, setPath] = useState(PATH_DETAILS);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'resources' | 'reviews'>('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleEnroll = () => {
    // منطق ثبت‌نام در مسیر
    router.push(`/dashboard/learning-paths/${path.id}/week/1`);
  };

  const handleContinue = () => {
    // یافتن اولین هفته‌ای که کامل نشده
    const currentWeek = path.weeklyModules.find(w => !w.isCompleted && w.isUnlocked)?.week || 1;
    router.push(`/dashboard/learning-paths/${path.id}/week/${currentWeek}`);
  };

  const getWeekStatus = (week: any) => {
    if (week.isCompleted) return 'completed';
    if (week.isUnlocked && !week.isCompleted) return 'in-progress';
    return 'locked';
  };

  const getWeekStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-sky-100 text-sky-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'locked': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* هدر */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-600"></div>
        
        <div className="relative z-10 p-8 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Link 
                href="/dashboard/learning-paths"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
              >
                <ChevronLeft className="h-5 w-5" />
                بازگشت به مسیرها
              </Link>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {path.duration} هفته
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {path.difficulty === 'beginner' ? 'مقدماتی' : path.difficulty === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {path.rating}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{path.title}</h1>
              <p className="text-lg text-white/90 max-w-3xl">{path.description}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 hover:bg-white/20 rounded-lg"
              >
                <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-white' : ''}`} />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 hover:bg-white/20 rounded-lg"
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500' : ''}`} />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-lg">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{path.enrolledCount.toLocaleString()} شرکت‌کننده</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>{path.total_points} امتیاز</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span>{path.weeklyModules.filter(w => w.isCompleted).length}/{path.duration} هفته تکمیل شده</span>
              </div>
            </div>
            
            {path.isEnrolled ? (
              <button
                onClick={handleContinue}
                className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold text-lg transition-colors flex items-center gap-3"
              >
                ادامه یادگیری
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold text-lg transition-colors"
              >
                شروع مسیر - رایگان
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* سایدبار */}
        <div className="lg:col-span-1 space-y-6">
          {/* کارت مربی */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">مربی مسیر</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                SM
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{path.instructor.name}</h4>
                <p className="text-sm text-gray-600">{path.instructor.title}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{path.instructor.bio}</p>
            
            <button className="w-full border border-sky-600 text-sky-600 hover:bg-sky-50 py-2 px-4 rounded-lg font-medium transition-colors">
              پرسش از مربی
            </button>
          </div>

          {/* پیشرفت */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">پیشرفت شما</h3>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${path.progress * 2.51} 251`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{path.progress}%</div>
                    <div className="text-sm text-gray-600">پیشرفت</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تمرین‌های تکمیل شده</span>
                <span className="font-bold">
                  {path.weeklyModules.reduce((acc, w) => acc + w.completedTasks, 0)}/
                  {path.weeklyModules.reduce((acc, w) => acc + w.dailyTasks, 0)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">هفته‌های تکمیل شده</span>
                <span className="font-bold">
                  {path.weeklyModules.filter(w => w.isCompleted).length}/{path.duration}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">امتیاز کسب شده</span>
                <span className="font-bold flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {Math.floor((path.progress / 100) * path.total_points)}
                </span>
              </div>
            </div>
          </div>

          {/* منابع کمکی */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">منابع کمکی</h3>
            
            <div className="space-y-3">
              {path.resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {resource.type === 'pdf' ? (
                      <FileText className="h-5 w-5 text-red-500" />
                    ) : resource.type === 'video' ? (
                      <Video className="h-5 w-5 text-blue-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-sky-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{resource.title}</div>
                      <div className="text-xs text-gray-500">
                        {resource.type === 'video' ? resource.duration : resource.size}
                      </div>
                    </div>
                  </div>
                  <button className="text-sky-600 hover:text-sky-700">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="lg:col-span-2 space-y-6">
          {/* تب‌ها */}
          <div className="bg-white rounded-xl shadow border border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-4 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Eye className="h-5 w-5" />
                  بررسی کلی
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-4 font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  محتوای هفتگی
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-4 font-medium transition-colors ${
                  activeTab === 'resources'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  منابع آموزشی
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-4 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  نظرات شرکت‌کنندگان
                </div>
              </button>
            </div>
            
            {/* محتوای تب‌ها */}
            <div className="p-6">
              {/* تب بررسی کلی */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">درباره این مسیر</h3>
                    <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                      {path.longDescription}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">خروجی‌های یادگیری</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {path.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">سرفصل‌های آموزشی</h3>
                    <div className="space-y-3">
                      {path.weeklyModules.map((week) => (
                        <div key={week.week} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            getWeekStatus(week) === 'completed' ? 'bg-sky-100 text-sky-600' :
                            getWeekStatus(week) === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-200 text-gray-500'
                          }`}>
                            {getWeekStatus(week) === 'completed' ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : getWeekStatus(week) === 'in-progress' ? (
                              <PlayCircle className="h-6 w-6" />
                            ) : (
                              <Lock className="h-6 w-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800">هفته {week.week}: {week.title}</h4>
                            <p className="text-sm text-gray-600">{week.description}</p>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Video className="h-4 w-4" />
                                {week.content.videos} ویدیو
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {week.content.articles} مقاله
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {week.content.exercises} تمرین
                              </span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getWeekStatusColor(getWeekStatus(week))}`}>
                            {getWeekStatus(week) === 'completed' ? 'تکمیل شده' :
                             getWeekStatus(week) === 'in-progress' ? 'در حال انجام' : 'قفل شده'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* تب محتوای هفتگی */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">برنامه هفتگی</h3>
                  
                  {path.weeklyModules.map((week) => (
                    <div key={week.week} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className={`p-6 ${
                        getWeekStatus(week) === 'completed' ? 'bg-sky-50 border-b border-sky-200' :
                        getWeekStatus(week) === 'in-progress' ? 'bg-blue-50 border-b border-blue-200' :
                        'bg-gray-50 border-b border-gray-200'
                      }`}>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">
                              هفته {week.week}: {week.title}
                            </h4>
                            <p className="text-gray-600 mt-1">{week.description}</p>
                          </div>
                          
                          <div className={`px-4 py-2 rounded-lg font-medium ${
                            getWeekStatus(week) === 'completed' ? 'bg-sky-100 text-sky-800' :
                            getWeekStatus(week) === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {getWeekStatus(week) === 'completed' ? 'تکمیل شده' :
                             getWeekStatus(week) === 'in-progress' ? `${week.progress}% پیشرفت` : 'قفل شده'}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>۷ روز تمرین</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>حدود ۳ ساعت در هفته</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-sky-600 mb-1">{week.content.videos}</div>
                            <div className="text-sm text-gray-600">ویدیوی آموزشی</div>
                          </div>
                          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-sky-600 mb-1">{week.content.articles}</div>
                            <div className="text-sm text-gray-600">مقاله تخصصی</div>
                          </div>
                          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 mb-1">{week.content.exercises}</div>
                            <div className="text-sm text-gray-600">تمرین عملی</div>
                          </div>
                          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-sky-600 mb-1">{week.content.quizzes}</div>
                            <div className="text-sm text-gray-600">آزمون خودسنجی</div>
                          </div>
                        </div>
                        
                        {week.isUnlocked ? (
                          <Link
                            href={`/dashboard/learning-paths/${path.id}/week/${week.week}`}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                              getWeekStatus(week) === 'completed'
                                ? 'bg-sky-600 hover:bg-sky-700 text-white'
                                : 'bg-sky-600 hover:bg-sky-700 text-white'
                            }`}
                          >
                            {getWeekStatus(week) === 'completed' ? 'مشاهده مجدد' : 'شروع این هفته'}
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        ) : (
                          <div className="text-center p-4 bg-gray-100 rounded-lg">
                            <Lock className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-600">
                              این هفته پس از تکمیل هفته قبل باز خواهد شد
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* تب منابع آموزشی */}
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">منابع آموزشی تکمیلی</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {path.resources.map((resource, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            resource.type === 'pdf' ? 'bg-red-100' :
                            resource.type === 'video' ? 'bg-blue-100' : 'bg-sky-100'
                          }`}>
                            {resource.type === 'pdf' ? (
                              <FileText className="h-6 w-6 text-red-600" />
                            ) : resource.type === 'video' ? (
                              <Video className="h-6 w-6 text-blue-600" />
                            ) : (
                              <FileText className="h-6 w-6 text-sky-600" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-1">{resource.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              {resource.type === 'pdf' ? 'PDF آموزشی' : 
                               resource.type === 'video' ? 'ویدیوی آموزشی' : 'چک‌لیست عملی'}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                {resource.type === 'video' ? resource.duration : resource.size}
                              </span>
                              <button className="text-sky-600 hover:text-sky-700 flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                دانلود
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-bold text-blue-800 mb-3">📚 کتاب‌های پیشنهادی</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>"با نوجوانم چگونه رفتار کنم" - دکتر هلاکویی</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>"هوش هیجانی در نوجوانان" - دکتر گلمن</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>"رازهای گفتگوی مؤثر" - دکتر احمدی</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* تب نظرات */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">نظرات شرکت‌کنندگان</h3>
                  
                  <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl font-bold text-gray-800">{path.rating}</div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(path.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">بر اساس {path.enrolledCount} نظر</p>
                      </div>
                    </div>
                    
                    <button className="w-full border border-sky-600 text-sky-600 hover:bg-sky-50 py-3 px-4 rounded-lg font-medium">
                      ثبت نظر شما
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {path.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{testimonial.text}</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 text-left">
                          ۲ هفته پیش
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* سوالات متداول */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">سوالات متداول</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">چقدر زمان برای این مسیر نیاز دارم؟</h4>
                <p className="text-gray-600">
                  این مسیر ۴ هفته طراحی شده و هر هفته حدود ۳-۴ ساعت زمان نیاز دارد.
                  روزانه ۳۰-۴۵ دقیقه برای مطالعه و تمرین کافی است.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">آیا می‌توانم مسیر را سریع‌تر تمام کنم؟</h4>
                <p className="text-gray-600">
                  بله، می‌توانید با سرعت خود پیش بروید. اما توصیه می‌کنیم برنامه هفتگی را رعایت کنید تا بهترین نتایج را بگیرید.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">پس از پایان مسیر چه می‌شود؟</h4>
                <p className="text-gray-600">
                  پس از تکمیل مسیر، گواهینامه دریافت می‌کنید و به مسیرهای پیشرفته‌تر دسترسی پیدا خواهید کرد.
                  همچنین می‌توانید در انجمن والدین عضو شوید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}