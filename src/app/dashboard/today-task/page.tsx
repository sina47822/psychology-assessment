// src/app/dashboard/today-task/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, BookOpen, MessageSquare, Star, Trophy } from 'lucide-react';

export default function TodayTaskPage() {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');

  const todaysTask = {
    id: 1,
    title: 'گفتگوی فعال ۱۵ دقیقه‌ای',
    description: 'امروز حداقل ۱۵ دقیقه بدون قضاوت و فقط به عنوان شنونده با نوجوان خود گفتگو کنید.',
    week: 3,
    day: 'سه‌شنبه',
    estimatedTime: 15,
    points: 50,
    instructions: [
      'زمان مناسب و بدون مزاحمت انتخاب کنید',
      'موبایل خود را کنار بگذارید',
      'به چشمان نوجوان نگاه کنید',
      'حرف‌هایش را قطع نکنید',
      'سعی نکنید راهنمایی یا نصیحت کنید',
      'فقط تأیید کنید که حرفش را شنیده‌اید'
    ],
    tips: [
      'به زبان بدن توجه کنید',
      'از جملات باز مانند "بیشتر برام بگو" استفاده کنید',
      'تشخیص دهید چه زمانی سکوت مناسب است',
      'قضاوت خود را کنار بگذارید'
    ]
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // در اینجا API فراخوانی می‌شود تا تکمیل تمرین ذخیره شود
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* هدر */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                هفته {todaysTask.week} • روز {todaysTask.day}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                +{todaysTask.points} امتیاز
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{todaysTask.title}</h1>
            <p className="text-sky-100">{todaysTask.description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-white/20 p-4 rounded-xl">
              <Clock className="h-6 w-6" />
              <div>
                <div className="text-sm">زمان تخمینی</div>
                <div className="text-xl font-bold">{todaysTask.estimatedTime} دقیقه</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* کارت اصلی تمرین */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* بخش دستورالعمل */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-sky-500" />
              <h2 className="text-xl font-bold text-gray-800">دستورالعمل تمرین</h2>
            </div>
            
            <div className="space-y-3">
              {todaysTask.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                  <div className="bg-sky-100 text-sky-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* بخش نکات کلیدی */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-sky-500" />
              <h2 className="text-xl font-bold text-gray-800">نکات کلیدی</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {todaysTask.tips.map((tip, index) => (
                <div key={index} className="p-3 bg-sky-50 border border-sky-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <p className="text-gray-700 font-medium">نکته {index + 1}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* بخش بازتاب */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-sky-500" />
              <h2 className="text-xl font-bold text-gray-800">بازتاب خود را بنویسید</h2>
            </div>
            
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="تجربه خود از انجام این تمرین را بنویسید. چه احساسی داشتید؟ چه چیز جدیدی یاد گرفتید؟"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
              rows={4}
            />
            
            <p className="text-sm text-gray-500 mt-2">
              نوشتن بازتاب به تثبیت یادگیری کمک می‌کند.
            </p>
          </div>

          {/* دکمه تکمیل */}
          {!isCompleted ? (
            <div className="space-y-4">
              <button
                onClick={handleComplete}
                className="w-full bg-sky-500 hover:bg-sky-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3"
              >
                <CheckCircle className="h-6 w-6" />
                تکمیل تمرین امروز
              </button>
              
              <div className="text-center text-gray-600 text-sm">
                با تکمیل این تمرین، {todaysTask.points} امتیاز دریافت خواهید کرد
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-10 w-10 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                آفرین! تمرین تکمیل شد 🎉
              </h3>
              <p className="text-gray-600 mb-4">
                +{todaysTask.points} امتیاز به حساب شما اضافه شد
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-sky-500 hover:bg-sky-700 text-white py-3 px-6 rounded-lg font-medium"
              >
                بازگشت به داشبورد
              </button>
            </div>
          )}
        </div>
      </div>

      {/* اطلاعات جانبی */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
        <h3 className="font-bold text-sky-800 mb-3">فواید این تمرین</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <span>افزایش اعتماد بین شما و نوجوان</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <span>ایجاد فضای امن برای گفتگو</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <span>کاهش تنش‌های ارتباطی</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <span>افزایش مهارت شنیدن فعال</span>
          </li>
        </ul>
      </div>
    </div>
  );
}