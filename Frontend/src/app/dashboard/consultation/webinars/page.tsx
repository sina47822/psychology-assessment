'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Users, Clock, Star, Download, Share2 } from 'lucide-react';

export default function ConsultationWebinarsPage() {
  const upcomingWebinars = [
    { 
      title: 'مدیریت تعارض با نوجوانان', 
      speaker: 'دکتر مریم حسینی',
      date: '۱۴۰۲/۰۳/۱۵',
      time: '۱۸:۰۰',
      duration: '۹۰ دقیقه',
      participants: 124,
      registered: true
    },
    { 
      title: 'انگیزه بخشی برای موفقیت تحصیلی', 
      speaker: 'دکتر سارا کریمی',
      date: '۱۴۰۲/۰۳/۲۰',
      time: '۱۶:۰۰',
      duration: '۶۰ دقیقه',
      participants: 89,
      registered: false
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">وبینارها</h1>
        <p className="text-gray-600">شرکت در وبینارهای آموزشی با حضور برترین متخصصان</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">وبینارهای پیش رو</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingWebinars.map((webinar, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{webinar.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1" />
                          <span>مدرس: {webinar.speaker}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          <span>تاریخ: {webinar.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1" />
                          <span>ساعت: {webinar.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm bg-sky-100 text-sky-800 px-2 py-1 rounded-full ml-2">
                          {webinar.duration}
                        </span>
                        <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                          <Users className="h-3 w-3 inline ml-1" />
                          {webinar.participants} نفر ثبت‌نام کرده‌اند
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      {webinar.registered ? (
                        <div className="flex flex-col items-end">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2">
                            ثبت‌نام شده
                          </span>
                          <Button variant="outline" className="whitespace-nowrap">
                            <Calendar className="h-4 w-4 ml-2" />
                            افزودن به تقویم
                          </Button>
                        </div>
                      ) : (
                        <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 whitespace-nowrap">
                          <Video className="h-5 w-5 ml-2" />
                          ثبت‌نام در وبینار
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">وبینار بعدی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-2">مدیریت تعارض با نوجوانان</h3>
              <p className="text-gray-600 mb-4">با دکتر مریم حسینی</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">تاریخ:</span>
                  <span className="font-bold">۱۴۰۲/۰۳/۱۵</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ساعت:</span>
                  <span className="font-bold">۱۸:۰۰</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">مدت:</span>
                  <span className="font-bold">۹۰ دقیقه</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600">
                  <Video className="h-5 w-5 ml-2" />
                  ورود به وبینار
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-5 w-5 ml-2" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-sky-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800">وبینارهای گذشته</CardTitle>
            <Button variant="outline">مشاهده همه</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: 'درک دنیای نوجوان امروز', 
                speaker: 'دکتر مریم حسینی',
                date: '۱۴۰۲/۰۲/۱۰',
                rating: 4.8,
                attendees: 203
              },
              { 
                title: 'مدیریت زمان و برنامه‌ریزی', 
                speaker: 'دکتر سارا کریمی',
                date: '۱۴۰۲/۰۲/۲۵',
                rating: 4.6,
                attendees: 167
              },
            ].map((webinar, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{webinar.title}</h3>
                    <p className="text-gray-600">مدرس: {webinar.speaker}</p>
                  </div>
                  <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {webinar.date}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current ml-1" />
                    <span className="text-gray-800 font-bold">{webinar.rating}</span>
                    <span className="text-gray-600 text-sm mr-2">({webinar.attendees} شرکت‌کننده)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4 ml-2" />
                      مشاهده
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 ml-2" />
                      دانلود
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}