'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, TrendingUp, Award, Calendar, BarChart } from 'lucide-react';

export default function ProgressWeeklyReportPage() {
  const weeklyTasks = [
    { task: 'گفتگوی روزانه با نوجوان', completed: 7, total: 7, status: 'تکمیل شده' },
    { task: 'مطالعه مقالات هفتگی', completed: 5, total: 6, status: 'در حال انجام' },
    { task: 'شرکت در چالش خانوادگی', completed: 1, total: 2, status: 'در حال انجام' },
    { task: 'تمرین مهارت گوش دادن', completed: 4, total: 7, status: 'نیاز به بهبود' },
  ];

  const achievements = [
    { title: 'تداوم ۷ روزه', icon: TrendingUp, desc: '۷ روز تمرین متوالی' },
    { title: 'کسب امتیاز', icon: Award, desc: '+۳۵۰ امتیاز این هفته' },
    { title: 'فعالیت انجمن', icon: BarChart, desc: '۱۰ مشارکت در انجمن' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">گزارش هفتگی</h1>
        <p className="text-gray-600">خلاصه‌ای از فعالیت‌ها و دستاوردهای هفته جاری</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">وظایف هفتگی</CardTitle>
              <div className="flex items-center text-sky-600">
                <Calendar className="h-5 w-5 ml-1" />
                <span>هفته جاری: ۱۴۰۲/۰۳/۰۱ تا ۱۴۰۲/۰۳/۰۷</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyTasks.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800">{item.task}</h3>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      item.status === 'تکمیل شده' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'در حال انجام'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-600 text-sm">
                      {item.completed} از {item.total} تکمیل شده
                    </div>
                    <div className="text-gray-800 font-bold">
                      {Math.round((item.completed / item.total) * 100)}%
                    </div>
                  </div>
                  <Progress value={(item.completed / item.total) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">دستاوردهای هفته</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-sky-50 to-white rounded-xl border border-sky-100">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <achievement.icon className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-100">
              <h4 className="font-bold text-gray-800 mb-2">امتیاز هفته</h4>
              <div className="text-3xl font-bold text-emerald-600">۳۵۰</div>
              <p className="text-sm text-gray-600 mt-1">+۱۲% نسبت به هفته گذشته</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-sky-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">تحلیل هفتگی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-xl">
                <div className="text-2xl font-bold text-sky-600">۸۵%</div>
                <div className="text-gray-600">میانگین تکمیل وظایف</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">۱۴ ساعت</div>
                <div className="text-gray-600">زمان یادگیری</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">۹.۲/۱۰</div>
                <div className="text-gray-600">رضایت از تمرین‌ها</div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">نکته هفته:</h4>
              <p className="text-gray-700">
                این هفته در تمرین مهارت گوش دادن عملکرد خوبی داشتید. سعی کنید در هفته آینده روی مدیریت تعارض بیشتر تمرکز کنید.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}