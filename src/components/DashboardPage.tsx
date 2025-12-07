// src/app/dashboard/page.tsx - نسخه بهبود یافته
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Trophy, TrendingUp, Calendar, Star, Target, Gift, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// داده‌های تستی
const SAMPLE_PATHS = [
  {
    id: '1',
    title: 'ارتباط مؤثر با نوجوان',
    category: 'communication',
    progress: 75,
    currentWeek: 3,
    totalWeeks: 4,
    description: 'یادگیری مهارت‌های ارتباطی برای بهبود رابطه با نوجوان'
  },
  {
    id: '2',
    title: 'مدیریت هیجانات نوجوان',
    category: 'emotion',
    progress: 25,
    currentWeek: 1,
    totalWeeks: 4,
    description: 'شناخت و مدیریت هیجانات در دوره نوجوانی'
  },
  {
    id: '3',
    title: 'انگیزه‌بخشی تحصیلی',
    category: 'academic',
    progress: 0,
    currentWeek: 0,
    totalWeeks: 4,
    description: 'راهکارهای افزایش انگیزه و پیشرفت تحصیلی'
  }
];

const WEEKLY_TASKS = [
  { id: 1, day: 'شنبه', title: 'گفتگوی ۱۵ دقیقه‌ای', completed: true },
  { id: 2, day: 'یکشنبه', title: 'فعالیت مشترک', completed: true },
  { id: 3, day: 'دوشنبه', title: 'بازخورد مثبت', completed: true },
  { id: 4, day: 'سه‌شنبه', title: 'شنونده فعال', completed: false },
  { id: 5, day: 'چهارشنبه', title: 'تشویق و تحسین', completed: false },
  { id: 6, day: 'پنجشنبه', title: 'حل تعارض', completed: false },
  { id: 7, day: 'جمعه', title: 'بررسی هفتگی', completed: false }
];

const RECENT_ACHIEVEMENTS = [
  { id: 1, title: 'شروع کننده مسیر', icon: '🏁', description: 'شروع اولین مسیر آموزشی' },
  { id: 2, title: 'تداوم ۷ روزه', icon: '🔥', description: '۷ روز متوالی تمرین' },
  { id: 3, title: 'گفتگوگر حرفه‌ای', icon: '💬', description: 'اتمام هفته اول ارتباط' }
];

export default function CoachingDashboard() {
  const { user } = useAuth();
  const [activePath, setActivePath] = useState(SAMPLE_PATHS[0]);
  const [streak, setStreak] = useState(7);
  const [points, setPoints] = useState(850);
  const [level, setLevel] = useState(3);

  return (
    <div className="space-y-6">
      {/* هدر خوش آمدگویی */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              سلام، {user?.first_name} 👋
            </h1>
            <p className="text-sky-100">
              امروز روز جدیدی برای یادگیری و رشد هست!
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-center bg-white/20 px-4 py-2 rounded-lg">
              <div className="text-sm">روز متوالی</div>
              <div className="text-2xl font-bold">{streak} 🔥</div>
            </div>
            <div className="text-center bg-white/20 px-4 py-2 rounded-lg">
              <div className="text-sm">امتیاز</div>
              <div className="text-2xl font-bold">{points} ⭐</div>
            </div>
            <div className="text-center bg-white/20 px-4 py-2 rounded-lg">
              <div className="text-sm">سطح</div>
              <div className="text-2xl font-bold">{level} 🏆</div>
            </div>
          </div>
        </div>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">مسیر فعال</p>
              <p className="text-xl font-bold text-gray-800">{activePath.title}</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>پیشرفت</span>
              <span>{activePath.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${activePath.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">تمرین امروز</p>
              <p className="text-xl font-bold text-gray-800">گفتگوی فعال</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <div className="mt-3">
            <Link 
              href="/dashboard/today-task"
              className="text-sm text-sky-500 hover:text-sky-700 font-medium"
            >
              شروع تمرین →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">هفته جاری</p>
              <p className="text-xl font-bold text-gray-800">
                هفته {activePath.currentWeek} از {activePath.totalWeeks}
              </p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-600">تا پایان مسیر: {activePath.totalWeeks - activePath.currentWeek} هفته</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">جوایز در دسترس</p>
              <p className="text-xl font-bold text-gray-800">۳ جایزه</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Gift className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <div className="mt-3">
            <Link 
              href="/dashboard/rewards"
              className="text-sm text-sky-500 hover:text-sky-700 font-medium"
            >
              مشاهده جوایز →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* مسیرهای آموزشی */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">مسیرهای آموزشی</h2>
              <Link 
                href="/dashboard/paths"
                className="text-sky-500 hover:text-sky-700 font-medium"
              >
                مشاهده همه →
              </Link>
            </div>
            
            <div className="space-y-4">
              {SAMPLE_PATHS.map((path) => (
                <div 
                  key={path.id}
                  className={`border rounded-xl p-4 transition-all hover:shadow-md cursor-pointer ${
                    path.id === activePath.id 
                      ? 'border-sky-300 bg-sky-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => setActivePath(path)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          path.category === 'communication' ? 'bg-sky-100 text-sky-800' :
                          path.category === 'emotion' ? 'bg-sky-100 text-sky-800' :
                          'bg-sky-100 text-sky-800'
                        }`}>
                          {path.category === 'communication' ? 'ارتباط' :
                           path.category === 'emotion' ? 'هیجانات' : 'تحصیلی'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {path.totalWeeks} هفته
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">{path.title}</h3>
                      <p className="text-sm text-gray-600">{path.description}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sky-500 mb-1">
                        {path.progress}%
                      </div>
                      <div className="text-xs text-gray-500">پیشرفت</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>هفته {path.currentWeek} از {path.totalWeeks}</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          path.id === activePath.id ? 'bg-sky-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Link 
                      href={`/dashboard/paths/${path.id}`}
                      className="flex-1 text-center bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      {path.progress > 0 ? 'ادامه مسیر' : 'شروع مسیر'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* تمرین‌های هفتگی */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">برنامه هفتگی</h2>
              <div className="text-sm text-gray-600">
                هفته ۳ از ۴ • ۴ روز باقی مانده
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {WEEKLY_TASKS.map((task) => (
                <div 
                  key={task.id}
                  className={`text-center p-3 rounded-lg border ${
                    task.completed 
                      ? 'bg-sky-50 border-sky-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">{task.day}</div>
                  <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    task.completed 
                      ? 'bg-sky-100 text-sky-500' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {task.completed ? '✓' : task.id}
                  </div>
                  <div className="text-xs font-medium truncate">{task.title}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-sky-50 border border-sky-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-sky-500" />
                <div>
                  <h4 className="font-bold text-sky-800">تمرین امروز</h4>
                  <p className="text-sm text-sky-700 mt-1">
                    امروز باید حداقل ۱۵ دقیقه گفتگوی فعال با نوجوان خود داشته باشید.
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 bg-sky-500 hover:bg-sky-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                شروع تمرین امروز
              </button>
            </div>
          </div>
        </div>

        {/* سایدبار */}
        <div className="space-y-6">
          {/* دستاوردهای اخیر */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-sky-500" />
              <h2 className="text-lg font-bold text-gray-800">دستاوردهای اخیر</h2>
            </div>
            
            <div className="space-y-3">
              {RECENT_ACHIEVEMENTS.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href="/dashboard/achievements"
              className="block mt-4 text-center text-sky-500 hover:text-sky-700 font-medium"
            >
              مشاهده همه دستاوردها →
            </Link>
          </div>

          {/* نکات انگیزشی */}
          <div className="bg-gradient-to-br from-sky-50 to-sky-50 rounded-xl p-6 border border-sky-200">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-sky-500" />
              <h3 className="font-bold text-gray-800">نکته امروز</h3>
            </div>
            <p className="text-gray-700">
              "نوجوان شما به شنیدن حرف‌هایش بیشتر از راهنمایی‌های شما نیاز دارد.
              امروز سعی کنید فقط شنونده باشید."
            </p>
            <div className="mt-4 text-xs text-gray-500">
              ~ دکتر روانشناس کودک و نوجوان
            </div>
          </div>

          {/* پیگیری پیشرفت */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-sky-500" />
              <h2 className="text-lg font-bold text-gray-800">پیشرفت شما</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>تمرین‌های تکمیل شده</span>
                  <span className="font-bold">۱۲ از ۲۰</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>چالش‌های انجام شده</span>
                  <span className="font-bold">۳ از ۴</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>امتیاز کسب شده</span>
                  <span className="font-bold">۸۵۰ از ۱۰۰۰</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}