'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  TrendingUp, 
  Target, 
  FileText,
  Award,
  Calendar,
  ChevronLeft,
  Star,
  Zap,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ProgressPage() {
  const progressOptions = [
    {
      title: 'گزارش هفتگی',
      description: 'خلاصه فعالیت‌های هفته جاری',
      icon: <Calendar className="h-8 w-8" />,
      href: '/dashboard/progress/weekly-report',
      stat: '۸۵% تکمیل',
      color: 'from-blue-500 to-sky-500'
    },
    {
      title: 'نقاط عطف',
      description: 'دستاوردها و موفقیت‌های شما',
      icon: <Target className="h-8 w-8" />,
      href: '/dashboard/progress/milestones',
      stat: '۴ از ۶ تکمیل',
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'نمودارها',
      description: 'تحلیل گرافیکی پیشرفت',
      icon: <BarChart className="h-8 w-8" />,
      href: '/dashboard/progress/charts',
      stat: '۶ نمودار',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'آمار کلی',
      description: 'نمای کلی از دستاوردها',
      icon: <TrendingUp className="h-8 w-8" />,
      href: '/dashboard/progress/stats',
      stat: '۱۲۵۰ امتیاز',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  const currentProgress = [
    { skill: 'مهارت گوش دادن', progress: 75 },
    { skill: 'مدیریت تعارض', progress: 60 },
    { skill: 'انگیزه بخشی', progress: 90 },
    { skill: 'برقراری ارتباط', progress: 80 },
  ];

  const recentAchievements = [
    { title: 'تداوم ۷ روزه', date: 'امروز', points: '+۵۰' },
    { title: 'کسب ۵۰۰ امتیاز', date: 'دیروز', points: '+۱۰۰' },
    { title: 'اولین وبینار', date: '۲ روز پیش', points: '+۳۰' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">پیشرفت و آمار</h1>
        <p className="text-gray-600">پیگیری رشد و دستاوردهای شما در مسیر یادگیری</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressOptions.map((option, index) => (
          <Card key={index} className="border-sky-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${option.color}`}>
                  {option.icon}
                </div>
                <span className="text-sm font-bold text-gray-700">{option.stat}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
              <Button asChild size="sm" className="w-full" variant="outline">
                <Link href={option.href}>
                  <ChevronLeft className="h-4 w-4" />
                  مشاهده
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">پیشرفت مهارت‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentProgress.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{item.skill}</span>
                    <span className="font-bold">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">آمار سریع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-white rounded-xl">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 ml-2" />
                  <span>امتیاز کل</span>
                </div>
                <span className="text-xl font-bold text-gray-800">۱,۲۵۰</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-white rounded-xl">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-orange-500 ml-2" />
                  <span>روزهای تداوم</span>
                </div>
                <span className="text-xl font-bold text-gray-800">۱۴</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-white rounded-xl">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-500 ml-2" />
                  <span>تمرین‌های تکمیل شده</span>
                </div>
                <span className="text-xl font-bold text-gray-800">۴۲</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">دستاوردهای اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Award className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="mr-3">
                      <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                    {achievement.points}
                  </span>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/dashboard/progress/milestones">
                مشاهده همه دستاوردها
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">هدف بعدی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl">
              <div className="flex items-center mb-3">
                <Target className="h-6 w-6 text-sky-600 ml-2" />
                <h3 className="font-bold text-gray-800 text-lg">تکمیل مسیر اول</h3>
              </div>
              <p className="text-gray-700 mb-4">
                برای تکمیل اولین مسیر یادگیری خود، ۳ تمرین باقی مانده است.
              </p>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-700 mb-1">
                  <span>پیشرفت</span>
                  <span>۷۵%</span>
                </div>
                <Progress value={75} />
              </div>
              <Button className="w-full">ادامه مسیر</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}