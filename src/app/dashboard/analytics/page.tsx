// src/app/dashboard/analytics/page.tsx
'use client';

import { TrendingUp, Calendar, Target, BarChart3, PieChart, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const weeklyStats = [
    { day: 'شنبه', tasks: 7, hours: 1.2 },
    { day: 'یکشنبه', tasks: 6, hours: 1.0 },
    { day: 'دوشنبه', tasks: 7, hours: 1.3 },
    { day: 'سه‌شنبه', tasks: 5, hours: 0.8 },
    { day: 'چهارشنبه', tasks: 7, hours: 1.5 },
    { day: 'پنجشنبه', tasks: 6, hours: 1.1 },
    { day: 'جمعه', tasks: 4, hours: 0.7 },
  ];

  const categoryDistribution = [
    { name: 'ارتباطات', value: 35, color: 'bg-sky-500' },
    { name: 'هیجانات', value: 25, color: 'bg-sky-500' },
    { name: 'تربیت', value: 20, color: 'bg-sky-500' },
    { name: 'تحصیل', value: 15, color: 'bg-sky-500' },
    { name: 'سایر', value: 5, color: 'bg-gray-500' },
  ];

  const milestones = [
    { date: '۱۴۰۲/۱۰/۰۱', title: 'شروع دوره', description: 'ثبت‌نام در سامانه' },
    { date: '۱۴۰۲/۱۰/۰۸', title: 'تکمیل هفته اول', description: '۷ روز تمرین متوالی' },
    { date: '۱۴۰۲/۱۰/۱۵', title: 'کسب اولین جایزه', description: 'دریافت کتاب الکترونیکی' },
    { date: '۱۴۰۲/۱۰/۲۲', title: 'اتمام مسیر اول', description: 'تکمیل مسیر ارتباط مؤثر' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">آمار و تحلیل پیشرفت</h1>
        <p className="text-gray-600 mt-2">
          مشاهده دقیق عملکرد و روند پیشرفت شما در مسیر آموزشی
        </p>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">روزهای متوالی</p>
              <p className="text-2xl font-bold text-gray-800">۲۱ روز</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">رکورد شخصی شما</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">تمرین‌های تکمیل شده</p>
              <p className="text-2xl font-bold text-gray-800">۸۹ تمرین</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">۸۷٪ موفقیت</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">ساعت‌های یادگیری</p>
              <p className="text-2xl font-bold text-gray-800">۴۲ ساعت</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">میانگین ۲ ساعت در هفته</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">نرخ مشارکت</p>
              <p className="text-2xl font-bold text-gray-800">۹۴٪</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-sky-500" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">بالاتر از میانگین</p>
        </div>
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* نمودار هفتگی */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl font-bold text-gray-800">فعالیت هفتگی</h2>
          </div>
          
          <div className="space-y-4">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{stat.day}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>تمرین‌ها</span>
                        <span>{stat.tasks}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${(stat.tasks / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>ساعت</span>
                        <span>{stat.hours}h</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${(stat.hours / 1.5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* توزیع موضوعی */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="h-5 w-5 text-sky-500" />
            <h2 className="text-xl font-bold text-gray-800">توزیع موضوعی</h2>
          </div>
          
          <div className="space-y-4">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-sm text-gray-600">{category.name}</div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.value}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${category.color} rounded-full`}
                        style={{ width: `${category.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* نقاط عطف */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">نقاط عطف سفر شما</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-gray-300"></div>
          
          <div className="space-y-8 relative z-10">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{milestone.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {milestone.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* تحلیل و پیشنهادات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">نقاط قوت شما</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <span>تداوم عالی در تمرین روزانه</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <span>مشارکت فعال در چالش‌ها</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <span>بازتاب‌های عمیق و تأمل‌برانگیز</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">پیشنهاد برای بهبود</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <span>سعی کنید تمرین‌های آخر هفته را هم انجام دهید</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <span>در مباحث هیجانات بیشتر تمرکز کنید</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
              <span>سعی کنید مسیر جدیدی را شروع کنید</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}