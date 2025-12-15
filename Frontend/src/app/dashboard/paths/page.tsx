// src/app/dashboard/paths/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Target, Users, ArrowRight, Lock } from 'lucide-react';

const LEARNING_PATHS = [
  {
    id: 'communication',
    title: 'ارتباط مؤثر با نوجوان',
    description: 'یادگیری مهارت‌های ارتباطی، گوش دادن فعال و گفتگوی مؤثر',
    category: 'ارتباطات',
    duration: '۴ هفته',
    difficulty: 'مقدماتی',
    enrolled: 234,
    progress: 75,
    unlocked: true,
    coverColor: 'bg-sky-500'
  },
  {
    id: 'emotion',
    title: 'مدیریت هیجانات نوجوان',
    description: 'شناخت و مدیریت هیجانات، کنترل خشم و اضطراب',
    category: 'هیجانات',
    duration: '۴ هفته',
    difficulty: 'متوسط',
    enrolled: 189,
    progress: 25,
    unlocked: true,
    coverColor: 'bg-sky-500'
  },
  {
    id: 'discipline',
    title: 'تربیت مسئولیت‌پذیر',
    description: 'ایجاد قوانین مؤثر، تشویق و تنبیه مناسب',
    category: 'تربیت',
    duration: '۶ هفته',
    difficulty: 'پیشرفته',
    enrolled: 156,
    progress: 0,
    unlocked: false,
    coverColor: 'bg-sky-500'
  },
  {
    id: 'academic',
    title: 'انگیزه‌بخشی تحصیلی',
    description: 'راهکارهای افزایش انگیزه و پیشرفت تحصیلی',
    category: 'تحصیل',
    duration: '۴ هفته',
    difficulty: 'مقدماتی',
    enrolled: 198,
    progress: 0,
    unlocked: true,
    coverColor: 'bg-sky-500'
  },
  {
    id: 'technology',
    title: 'مدیریت فضای مجازی',
    description: 'آموزش استفاده صحیح از تکنولوژی و شبکه‌های اجتماعی',
    category: 'تکنولوژی',
    duration: '۴ هفته',
    difficulty: 'متوسط',
    enrolled: 167,
    progress: 0,
    unlocked: false,
    coverColor: 'bg-sky-500'
  },
  {
    id: 'future',
    title: 'هدایت شغلی و آینده',
    description: 'کشف استعدادها و هدایت تحصیلی-شغلی نوجوان',
    category: 'آینده',
    duration: '۴ هفته',
    difficulty: 'پیشرفته',
    enrolled: 145,
    progress: 0,
    unlocked: false,
    coverColor: 'bg-sky-500'
  }
];

export default function LearningPathsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'همه مسیرها' },
    { id: 'communication', name: 'ارتباطات' },
    { id: 'emotion', name: 'هیجانات' },
    { id: 'academic', name: 'تحصیلی' },
    { id: 'discipline', name: 'تربیت' }
  ];

  const filteredPaths = selectedCategory === 'all' 
    ? LEARNING_PATHS 
    : LEARNING_PATHS.filter(path => path.id.includes(selectedCategory));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">مسیرهای آموزشی</h1>
        <p className="text-gray-600 mt-2">
          مسیرهای تخصصی برای تبدیل شدن به والدینی توانمند و آگاه
        </p>
      </div>

      {/* فیلترها */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-sky-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* مسیرهای آموزشی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map(path => (
          <div 
            key={path.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02] ${
              !path.unlocked ? 'opacity-75' : ''
            }`}
          >
            {/* هدر */}
            <div className={`${path.coverColor} h-32 relative`}>
              {!path.unlocked && (
                <div className="absolute inset-0 bg-sky-500/50 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {path.difficulty}
                </span>
              </div>
            </div>

            {/* محتوا */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {path.category}
                </span>
                <span className="text-xs text-gray-500">• {path.duration}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {path.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {path.description}
              </p>

              {/* آمار */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{path.enrolled} شرکت‌کننده</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{path.duration}</span>
                </div>
              </div>

              {/* پیشرفت */}
              {path.progress > 0 ? (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>پیشرفت شما</span>
                    <span>{path.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                </div>
              ) : null}

              {/* دکمه‌ها */}
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/paths/${path.id}`}
                  className={`flex-1 text-center py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    path.unlocked
                      ? 'bg-sky-500 hover:bg-sky-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {path.unlocked ? (
                    <>
                      {path.progress > 0 ? 'ادامه یادگیری' : 'شروع مسیر'}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    'قفل شده'
                  )}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* اطلاعات تکمیلی */}
      <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-2xl p-8 mt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            چگونه مسیرهای آموزشی کار می‌کنند؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center p-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">۱. انتخاب مسیر</h3>
              <p className="text-gray-600 text-sm">
                مسیر آموزشی مورد نظر خود را بر اساس نیازتان انتخاب کنید
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Target className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">۲. تمرین هفتگی</h3>
              <p className="text-gray-600 text-sm">
                هر هفته تمرین‌های عملی و چالش‌های جدید دریافت می‌کنید
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">۳. دریافت جایزه</h3>
              <p className="text-gray-600 text-sm">
                با تکمیل هر مسیر، جایزه‌های ویژه و گواهینامه دریافت می‌کنید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}