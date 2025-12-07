'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  MessageSquare, 
  Users, 
  Calendar,
  Headphones,
  Mic,
  FileText,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ConsultationPage() {
  const consultationOptions = [
    {
      title: 'مشاوره زنده',
      description: 'صحبت آنی با مربیان متخصص',
      icon: <Video className="h-8 w-8" />,
      href: '/dashboard/consultation/live',
      color: 'from-sky-500 to-blue-500',
      features: ['ویدیو مشاوره', 'تماس فوری', 'پاسخ آنی']
    },
    {
      title: 'سوال از مربی',
      description: 'پرسش و دریافت پاسخ تخصصی',
      icon: <MessageSquare className="h-8 w-8" />,
      href: '/dashboard/consultation/ask',
      color: 'from-emerald-500 to-green-500',
      features: ['پاسخ در ۲۴ ساعت', 'مشاوره متنی', 'تاریخچه سوالات']
    },
    {
      title: 'انجمن والدین',
      description: 'تبادل تجربه با دیگر والدین',
      icon: <Users className="h-8 w-8" />,
      href: '/dashboard/consultation/community',
      color: 'from-purple-500 to-pink-500',
      features: ['مباحث داغ', 'پرسش و پاسخ', 'تجربیات موفق']
    },
    {
      title: 'وبینارها',
      description: 'شرکت در وبینارهای آموزشی',
      icon: <Calendar className="h-8 w-8" />,
      href: '/dashboard/consultation/webinars',
      color: 'from-orange-500 to-yellow-500',
      features: ['وبینارهای زنده', 'ویدیوهای ضبط شده', 'گواهی حضور']
    }
  ];

  const upcomingSessions = [
    { coach: 'دکتر مریم حسینی', time: 'فردا، ۱۶:۰۰', type: 'مشاوره ویدیویی' },
    { coach: 'دکتر سارا کریمی', time: 'پس‌فردا، ۱۰:۳۰', type: 'وبینار' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">مشاوره و راهنمایی</h1>
        <p className="text-gray-600">دریافت مشاوره تخصصی از مربیان و ارتباط با جامعه والدین</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consultationOptions.map((option, index) => (
          <Card key={index} className="border-sky-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${option.color}`}>
                  {option.icon}
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={option.href}>
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              
              <div className="space-y-2 mb-6">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 ml-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <Button asChild className="w-full">
                <Link href={option.href}>
                  مشاهده و استفاده
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">جلسات پیش رو</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${
                      session.type === 'مشاوره ویدیویی' 
                        ? 'bg-sky-100 text-sky-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {session.type === 'مشاوره ویدیویی' ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <Calendar className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mr-4">
                      <h4 className="font-bold text-gray-800">{session.coach}</h4>
                      <p className="text-sm text-gray-600">{session.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      اطلاع‌رسانی
                    </Button>
                    <Button size="sm">
                      ورود به جلسه
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">آمار مشاوره</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <Headphones className="h-5 w-5 text-sky-600 ml-2" />
                  <span>جلسات برگزار شده</span>
                </div>
                <span className="font-bold text-gray-800">۱۲ جلسه</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-emerald-600 ml-2" />
                  <span>سوالات پرسیده شده</span>
                </div>
                <span className="font-bold text-gray-800">۲۴ سوال</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 ml-2" />
                  <span>تعامل در انجمن</span>
                </div>
                <span className="font-bold text-gray-800">۵۶ مشارکت</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}