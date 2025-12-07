'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

export default function ProgressStatsPage() {
  const stats = [
    { title: 'امتیاز کل', value: '1,250', change: '+12%', icon: TrendingUp, color: 'text-blue-600' },
    { title: 'روزهای تداوم', value: '14', change: '+2', icon: Target, color: 'text-green-600' },
    { title: 'مسیرهای تکمیل شده', value: '3', change: '+1', icon: Award, color: 'text-purple-600' },
    { title: 'تعامل در انجمن', value: '24', change: '+8', icon: Users, color: 'text-orange-600' },
  ];

  const progressData = [
    { label: 'مهارت گوش دادن', value: 75 },
    { label: 'مدیریت تعارض', value: 60 },
    { label: 'انگیزه بخشی', value: 90 },
    { label: 'برقراری ارتباط', value: 80 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">آمار کلی پیشرفت</h1>
        <p className="text-gray-600">نمای کلی از دستاوردها و پیشرفت شما</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-sky-50 border-sky-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600">{stat.change}</span> از ماه گذشته
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">پیشرفت مهارت‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">فعالیت هفتگی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">تمرین‌های انجام شده</span>
                <span className="font-bold">۱۲ مورد</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">چالش‌های تکمیل شده</span>
                <span className="font-bold">۳ مورد</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">زمان یادگیری</span>
                <span className="font-bold">۵ ساعت</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">تعامل با مربی</span>
                <span className="font-bold">۲ جلسه</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-sky-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">تاریخچه فعالیت</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'تکمیل چالش خانوادگی', time: 'امروز، ۱۰:۳۰', points: '+۵۰' },
              { action: 'مطالعه مقاله ارتباط موثر', time: 'دیروز، ۱۶:۴۵', points: '+۳۰' },
              { action: 'شرکت در وبینار', time: 'دیروز، ۱۸:۰۰', points: '+۱۰۰' },
              { action: 'تمرین روزانه', time: '۲ روز پیش، ۰۹:۱۵', points: '+۲۰' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-medium text-gray-800">{item.action}</div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  {item.points} امتیاز
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}