'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Trophy,
  Calendar,
  Heart,
  Share2,
  Search,
  Filter,
  Plus,
  Award,
  Star,
  TrendingDown
} from 'lucide-react';
import { useState } from 'react';

interface Discussion {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  views: number;
  time: string;
  isPinned: boolean;
  isFeatured: boolean;
}

interface User {
  id: number;
  name: string;
  role: string;
  points: number;
  streak: number;
  avatar: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const discussions: Discussion[] = [
    { 
      id: 1, 
      title: 'تجربیات موفق در کاهش زمان استفاده از موبایل توسط نوجوانان', 
      author: 'سارا محمدی', 
      category: 'تجربیات موفق',
      replies: 42, 
      likes: 89, 
      views: 156, 
      time: '۲ ساعت پیش',
      isPinned: true,
      isFeatured: true
    },
    { 
      id: 2, 
      title: 'چگونه برای کنکور به نوجوانم انگیزه بدهیم؟', 
      author: 'علی رضایی', 
      category: 'مشاوره تحصیلی',
      replies: 28, 
      likes: 64, 
      views: 98, 
      time: '۵ ساعت پیش',
      isPinned: true,
      isFeatured: false
    },
    { 
      id: 3, 
      title: 'راهکارهای مدیریت تعارض با نوجوانان در دوران بلوغ', 
      author: 'مریم کریمی', 
      category: 'خانواده',
      replies: 35, 
      likes: 72, 
      views: 120, 
      time: '۱ روز پیش',
      isPinned: false,
      isFeatured: true
    },
    { 
      id: 4, 
      title: 'برنامه ریزی تابستانی برای نوجوانان', 
      author: 'رضا احمدی', 
      category: 'برنامه‌ریزی',
      replies: 19, 
      likes: 45, 
      views: 87, 
      time: '۲ روز پیش',
      isPinned: false,
      isFeatured: false
    },
  ];

  const topUsers: User[] = [
    { id: 1, name: 'سارا محمدی', role: 'مدیر انجمن', points: 2450, streak: 28, avatar: 'SM' },
    { id: 2, name: 'علی رضایی', role: 'کاربر فعال', points: 1890, streak: 21, avatar: 'AR' },
    { id: 3, name: 'مریم کریمی', role: 'مشاور', points: 3120, streak: 35, avatar: 'MK' },
    { id: 4, name: 'رضا احمدی', role: 'کاربر جدید', points: 850, streak: 7, avatar: 'RA' },
  ];

  const categories = [
    { name: 'همه موضوعات', count: 156, color: 'bg-blue-100 text-blue-800' },
    { name: 'تجربیات موفق', count: 42, color: 'bg-green-100 text-green-800' },
    { name: 'سوالات عمومی', count: 67, color: 'bg-purple-100 text-purple-800' },
    { name: 'مشاوره تحصیلی', count: 28, color: 'bg-orange-100 text-orange-800' },
    { name: 'خانواده و ارتباط', count: 35, color: 'bg-pink-100 text-pink-800' },
    { name: 'برنامه‌ریزی', count: 19, color: 'bg-indigo-100 text-indigo-800' },
  ];

  const communityStats = [
    { label: 'کل اعضا', value: '1,248', icon: Users, change: '+12%' },
    { label: 'مباحث فعال', value: '156', icon: MessageSquare, change: '+8%' },
    { label: 'پست‌های روزانه', value: '24', icon: TrendingUp, change: '+15%' },
    { label: 'نرخ مشارکت', value: '68%', icon: Trophy, change: '+5%' },
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pinned') return discussion.isPinned;
    if (activeTab === 'featured') return discussion.isFeatured;
    return discussion.category === activeTab;
  }).filter(discussion => 
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">انجمن والدین</h1>
          <p className="text-gray-600">به جامعه والدین بپیوندید و تجربیات خود را به اشتراک بگذارید</p>
        </div>
        <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600">
          <Plus className="h-5 w-5 ml-2" />
          ایجاد بحث جدید
        </Button>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => (
          <Card key={index} className="border-sky-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600 mr-1">{stat.change}</span>
                    <span className="text-sm text-gray-500">از ماه قبل</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50">
                  <stat.icon className="h-6 w-6 text-sky-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* مباحث اصلی */}
        <div className="lg:col-span-2 space-y-6">
          {/* جستجو و فیلتر */}
          <Card className="border-sky-100">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="جستجو در مباحث انجمن..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-5 w-5 ml-2" />
                  فیلتر پیشرفته
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* تب‌ها */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-6 mb-6">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="pinned">مهم‌ها</TabsTrigger>
              <TabsTrigger value="featured">برگزیده</TabsTrigger>
              <TabsTrigger value="تجربیات موفق">تجربیات</TabsTrigger>
              <TabsTrigger value="مشاوره تحصیلی">تحصیلی</TabsTrigger>
              <TabsTrigger value="خانواده">خانواده</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="border-sky-100 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-800 text-lg">
                                {discussion.title}
                              </h3>
                              {discussion.isPinned && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  📌 مهم
                                </span>
                              )}
                              {discussion.isFeatured && (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                                  ⭐ برگزیده
                                </span>
                              )}
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${categories.find(c => c.name === discussion.category)?.color}`}>
                              {discussion.category}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 ml-1" />
                              <span>{discussion.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 ml-1" />
                              <span>{discussion.time}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center text-gray-600">
                                <MessageSquare className="h-4 w-4 ml-1" />
                                <span>{discussion.replies} پاسخ</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Heart className="h-4 w-4 ml-1" />
                                <span>{discussion.likes} پسند</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <TrendingUp className="h-4 w-4 ml-1" />
                                <span>{discussion.views} بازدید</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                <Heart className="h-4 w-4 ml-2" />
                                پسندیدن
                              </Button>
                              <Button size="sm">
                                شرکت در بحث
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* سایدبار */}
        <div className="space-y-6">
          {/* کاربران برتر */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 ml-2" />
                کاربران برتر این ماه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">{user.avatar}</span>
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="mr-3">
                        <h4 className="font-bold text-gray-800">{user.name}</h4>
                        <p className="text-xs text-gray-600">{user.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{user.points} امتیاز</div>
                      <div className="text-xs text-gray-600">{user.streak} روز تداوم</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* دسته‌بندی‌ها */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">دسته‌بندی‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveTab(category.name)}
                    className={`flex items-center justify-between w-full p-3 text-right rounded-xl transition-all hover:scale-[1.02] ${
                      activeTab === category.name 
                        ? 'bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ml-2 ${
                        category.color.split(' ')[0]
                      }`}></div>
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </div>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* رویدادهای آینده */}
          <Card className="border-sky-100 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Calendar className="h-5 w-5 text-orange-600 ml-2" />
                رویدادهای آینده
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-bold text-gray-800 mb-1">وبینار "درک دنیای نوجوان"</h4>
                  <p className="text-sm text-gray-600 mb-2">با دکتر مریم حسینی</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-600 font-medium">فردا، ۱۸:۰۰</span>
                    <Button size="sm">شرکت</Button>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-bold text-gray-800 mb-1">مسابقه تابستانی</h4>
                  <p className="text-sm text-gray-600 mb-2">چالش ۳۰ روز ارتباط موثر</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-600 font-medium">شروع: ۱ تیر</span>
                    <Button size="sm" variant="outline">ثبت‌نام</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* قوانین انجمن */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">قوانین انجمن</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 pr-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                  <span>احترام به همه اعضا را رعایت کنید</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                  <span>از تبلیغات و اسپم خودداری کنید</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                  <span>مباحث را در دسته‌بندی مناسب قرار دهید</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full ml-2"></div>
                  <span>از افشای اطلاعات شخصی خودداری کنید</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                مشاهده قوانین کامل
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}