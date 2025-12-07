'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, ThumbsUp, Eye, Clock, TrendingUp } from 'lucide-react';

export default function ConsultationCommunityPage() {
  const discussions = [
    { 
      title: 'تجربه من با کاهش زمان استفاده از موبایل', 
      author: 'سارا محمدی',
      replies: 24,
      likes: 42,
      views: 156,
      time: '۲ ساعت پیش',
      category: 'تجربیات موفق'
    },
    { 
      title: 'چگونه برای کنکور به نوجوانم انگیزه بدهیم؟', 
      author: 'علی رضایی',
      replies: 18,
      likes: 31,
      views: 98,
      time: '۵ ساعت پیش',
      category: 'مشاوره تحصیلی'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">انجمن والدین</h1>
        <p className="text-gray-600">به جامعه والدین بپیوندید و تجربیات خود را به اشتراک بگذارید</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 border-sky-100">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">مباحث داغ</CardTitle>
              <div className="flex gap-2 mt-3 md:mt-0">
                <input 
                  type="text" 
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent flex-1"
                  placeholder="جستجو در انجمن..."
                />
                <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600">
                  <MessageSquare className="h-5 w-5 ml-2" />
                  ایجاد بحث جدید
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{discussion.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 ml-1" />
                        <span className="ml-2">{discussion.author}</span>
                        <Clock className="h-4 w-4 mr-4 ml-6" />
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                      {discussion.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 ml-1" />
                        <span>{discussion.replies} پاسخ</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 ml-1" />
                        <span>{discussion.likes} پسند</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 ml-1" />
                        <span>{discussion.views} بازدید</span>
                      </div>
                    </div>
                    <Button variant="outline">مشاهده بحث</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100 h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">دسته‌بندی‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'همه موضوعات', count: 156 },
                { name: 'تجربیات موفق', count: 42 },
                { name: 'سوالات عمومی', count: 67 },
                { name: 'مشاوره تحصیلی', count: 28 },
              ].map((category, index) => (
                <button
                  key={index}
                  className="flex items-center justify-between w-full p-3 text-right rounded-xl hover:bg-sky-50 transition-colors"
                >
                  <span className="text-gray-800 font-medium">{category.name}</span>
                  <span className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-sky-100 bg-gradient-to-r from-sky-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">فعال‌ترین اعضا</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['سارا محمدی', 'علی رضایی', 'مریم کریمی'].map((name, index) => (
                <div key={index} className="flex items-center justify-between p-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {name.split(' ')[0].charAt(0)}
                      </span>
                    </div>
                    <span className="mr-3 font-medium text-gray-800">{name}</span>
                  </div>
                  <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    {[156, 142, 98][index]} امتیاز
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">آمار انجمن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 ml-2" />
                  <span>کل اعضا</span>
                </div>
                <span className="font-bold text-gray-800">۱,۲۴۸ نفر</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="h-5 w-5 ml-2" />
                  <span>مباحث فعال</span>
                </div>
                <span className="font-bold text-gray-800">۱۵۶ بحث</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600">
                  <TrendingUp className="h-5 w-5 ml-2" />
                  <span>امروز</span>
                </div>
                <span className="font-bold text-gray-800">۲۴ پست جدید</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">راهنمای انجمن</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 pr-6">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                <span>احترام به نظرات دیگران را رعایت کنید</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                <span>از تبلیغات خودداری کنید</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                <span>مطالب را در دسته‌بندی مناسب قرار دهید</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4">مشاهده قوانین کامل</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}