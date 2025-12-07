'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Phone, MessageSquare, Calendar, Clock, Users, Star } from 'lucide-react';

export default function ConsultationLivePage() {
  const availableCoaches = [
    { name: 'دکتر مریم حسینی', specialty: 'روانشناسی نوجوان', rating: 4.9, sessions: 124, status: 'آماده', nextAvailable: 'هم اکنون' },
    { name: 'دکتر علی محمدی', specialty: 'خانواده درمانی', rating: 4.8, sessions: 89, status: 'مشغول', nextAvailable: '۳۰ دقیقه دیگر' },
    { name: 'دکتر سارا کریمی', specialty: 'مشاوره تحصیلی', rating: 4.7, sessions: 156, status: 'آماده', nextAvailable: 'هم اکنون' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">مشاوره زنده</h1>
        <p className="text-gray-600">ارتباط مستقیم و آنی با مربیان و متخصصان</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">مربیان آنلاین</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableCoaches.map((coach, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-3 mb-3 md:mb-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {coach.name.split(' ')[1].charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{coach.name}</h3>
                        <p className="text-sm text-gray-600">{coach.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-700 mr-1">{coach.rating}</span>
                          <span className="text-sm text-gray-500">({coach.sessions} جلسه)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                        coach.status === 'آماده' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {coach.status === 'آماده' ? 'آماده برای مشاوره' : 'مشغول'}
                      </div>
                      <div className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline ml-1" />
                        بعدی: {coach.nextAvailable}
                      </div>
                      <Button className="mt-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600">
                        <Video className="h-5 w-5 ml-2" />
                        شروع مشاوره
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">مشاوره فوری</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-2">نیاز به صحبت فوری دارید؟</h3>
              <p className="text-gray-600 mb-6">با فعال‌سازی این گزینه، اولین مربی available با شما تماس خواهد گرفت.</p>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                <Phone className="h-5 w-5 ml-2" />
                درخواست مشاوره فوری
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">تقویم جلسات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { coach: 'دکتر مریم حسینی', time: 'امروز، ۱۶:۰۰', type: 'ویدیو مشاوره' },
                { coach: 'دکتر سارا کریمی', time: 'فردا، ۱۰:۳۰', type: 'تماس صوتی' },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-bold text-gray-800">{session.coach}</div>
                    <div className="text-sm text-gray-600">{session.time}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      چت
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 ml-2" />
                      تغییر
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Calendar className="h-5 w-5 ml-2" />
              رزرو جلسه جدید
            </Button>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">تاریخچه مشاوره</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '۱۴۰۲/۰۳/۰۵', coach: 'دکتر مریم حسینی', duration: '۴۵ دقیقه' },
                { date: '۱۴۰۲/۰۳/۰۱', coach: 'دکتر علی محمدی', duration: '۳۰ دقیقه' },
                { date: '۱۴۰۲/۰۲/۲۵', coach: 'دکتر سارا کریمی', duration: '۶۰ دقیقه' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{item.coach}</div>
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </div>
                  <div className="text-sm text-gray-600">{item.duration}</div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              مشاهده همه
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}