'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Zap,
  Users,
  Target,
  Clock,
  Award,
  Star,
  TrendingUp,
  ChevronRight,
  Calendar,
  CheckCircle,
  Lock,
  Flame
} from 'lucide-react';
import { useState } from 'react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'آسان' | 'متوسط' | 'سخت';
  duration: string;
  participants: number;
  points: number;
  progress: number;
  status: 'active' | 'completed' | 'locked' | 'upcoming';
  startDate?: string;
  endDate?: string;
}

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState('active');

  const challenges: Challenge[] = [
    { 
      id: 1, 
      title: 'چالش ۳۰ روز ارتباط موثر', 
      description: '۳۰ روز تمرین روزانه برای بهبود ارتباط با نوجوان',
      category: 'ارتباط',
      difficulty: 'سخت',
      duration: '۳۰ روز',
      participants: 245,
      points: 1000,
      progress: 65,
      status: 'active',
      startDate: '۱۴۰۳/۰۲/۱۵',
      endDate: '۱۴۰۳/۰۳/۱۵'
    },
    { 
      id: 2, 
      title: 'هفته بدون فریاد', 
      description: 'یک هفته کامل بدون فریاد زدن بر سر نوجوان',
      category: 'خویشتن‌داری',
      difficulty: 'متوسط',
      duration: '۷ روز',
      participants: 189,
      points: 500,
      progress: 100,
      status: 'completed'
    },
    { 
      id: 3, 
      title: 'شنونده خوب', 
      description: 'تمرین گوش دادن فعال در گفتگوهای روزانه',
      category: 'مهارت',
      difficulty: 'آسان',
      duration: '۱۴ روز',
      participants: 312,
      points: 300,
      progress: 0,
      status: 'upcoming',
      startDate: '۱۴۰۳/۰۳/۱۰'
    },
    { 
      id: 4, 
      title: 'مدیریت زمان خانوادگی', 
      description: 'برنامه‌ریزی و مدیریت زمان برای فعالیت‌های خانوادگی',
      category: 'برنامه‌ریزی',
      difficulty: 'متوسط',
      duration: '۲۱ روز',
      participants: 156,
      points: 750,
      progress: 0,
      status: 'locked'
    },
    { 
      id: 5, 
      title: 'چالش قدردانی روزانه', 
      description: 'هر روز از نوجوان خود برای یک چیز تشکر کنید',
      category: 'روابط',
      difficulty: 'آسان',
      duration: '۱۴ روز',
      participants: 278,
      points: 400,
      progress: 42,
      status: 'active'
    },
  ];

  const categories = [
    { name: 'ارتباط', count: 3, color: 'bg-blue-100 text-blue-800' },
    { name: 'مهارت', count: 5, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'برنامه‌ریزی', count: 2, color: 'bg-purple-100 text-purple-800' },
    { name: 'روابط', count: 4, color: 'bg-pink-100 text-pink-800' },
    { name: 'خویشتن‌داری', count: 3, color: 'bg-orange-100 text-orange-800' },
  ];

  const leaderboard = [
    { rank: 1, name: 'سارا محمدی', points: 2450, challenges: 12 },
    { rank: 2, name: 'علی رضایی', points: 1890, challenges: 10 },
    { rank: 3, name: 'مریم کریمی', points: 1750, challenges: 9 },
    { rank: 4, name: 'رضا احمدی', points: 1620, challenges: 8 },
  ];

  const userStats = {
    completedChallenges: 5,
    activeChallenges: 2,
    totalPoints: 1250,
    currentStreak: 14,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'آسان': return 'bg-emerald-100 text-emerald-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'سخت': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-sky-100 text-sky-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'locked': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (activeTab === 'all') return true;
    return challenge.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">چالش‌ها</h1>
          <p className="text-gray-600">با شرکت در چالش‌ها مهارت‌های خود را تقویت کنید</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-to-r from-sky-50 to-blue-50">
            <Trophy className="h-4 w-4 ml-1" />
            {userStats.completedChallenges} چالش تکمیل شده
          </Badge>
          <Badge variant="outline" className="bg-gradient-to-r from-emerald-50 to-green-50">
            <Flame className="h-4 w-4 ml-1" />
            تداوم {userStats.currentStreak} روزه
          </Badge>
        </div>
      </div>

      {/* آمار کاربر */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">چالش‌های تکمیل شده</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.completedChallenges}</p>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <CheckCircle className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">چالش‌های فعال</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.activeChallenges}</p>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">امتیاز کل</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.totalPoints}</p>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">رتبه شما</p>
                <p className="text-2xl font-bold text-gray-800">#۵</p>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* لیست چالش‌ها */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="active">فعال</TabsTrigger>
              <TabsTrigger value="completed">تکمیل شده</TabsTrigger>
              <TabsTrigger value="upcoming">آینده</TabsTrigger>
              <TabsTrigger value="locked">قفل شده</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {filteredChallenges.map((challenge) => (
                  <Card key={challenge.id} className="border-sky-100 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-800 text-lg">{challenge.title}</h3>
                              <Badge className={getDifficultyColor(challenge.difficulty)}>
                                {challenge.difficulty}
                              </Badge>
                              <Badge className={getStatusColor(challenge.status)}>
                                {challenge.status === 'active' && '🔴 فعال'}
                                {challenge.status === 'completed' && '✅ تکمیل شده'}
                                {challenge.status === 'locked' && '🔒 قفل شده'}
                                {challenge.status === 'upcoming' && '📅 آینده'}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-500 ml-1" />
                              <span className="font-bold text-gray-800">{challenge.points}</span>
                              <span className="text-gray-600 mr-1">امتیاز</span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{challenge.description}</p>

                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 ml-1" />
                              <span>{challenge.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 ml-1" />
                              <span>{challenge.participants} شرکت‌کننده</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 ml-1" />
                              {challenge.startDate && (
                                <span>شروع: {challenge.startDate}</span>
                              )}
                            </div>
                          </div>

                          {challenge.status === 'active' && challenge.progress > 0 && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm text-gray-700 mb-1">
                                <span>پیشرفت</span>
                                <span>{challenge.progress}%</span>
                              </div>
                              <Progress value={challenge.progress} />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          {challenge.status === 'active' && (
                            <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                              ادامه چالش
                            </Button>
                          )}
                          {challenge.status === 'upcoming' && (
                            <Button variant="outline" disabled>
                              به زودی...
                            </Button>
                          )}
                          {challenge.status === 'locked' && (
                            <Button variant="outline" disabled>
                              <Lock className="h-4 w-4 ml-2" />
                              قفل شده
                            </Button>
                          )}
                          {challenge.status === 'completed' && (
                            <Button variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                              <CheckCircle className="h-4 w-4 ml-2" />
                              تکمیل شده
                            </Button>
                          )}
                          <Button variant="ghost" className="text-gray-600">
                            جزئیات بیشتر
                          </Button>
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
          {/* جدول رده‌بندی */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 ml-2" />
                جدول رده‌بندی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      user.rank <= 3
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200'
                        : 'border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        <span className="font-bold">{user.rank}</span>
                      </div>
                      <div className="mr-3">
                        <h4 className="font-bold text-gray-800">{user.name}</h4>
                        <p className="text-xs text-gray-600">{user.challenges} چالش</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{user.points} امتیاز</div>
                      <div className="text-xs text-gray-600">
                        <TrendingUp className="h-3 w-3 inline ml-1" />
                        +12%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                مشاهده کامل جدول
                <ChevronRight className="h-5 w-5 mr-2" />
              </Button>
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
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ml-2 ${category.color.split(' ')[0]}`}></div>
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${category.color}`}>
                      {category.count} چالش
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* چالش ویژه */}
          <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">چالش ویژه هفته</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-2">"هفته مهربانی"</h3>
                <p className="text-gray-600 mb-4">
                  هر روز یک کار مهربانانه برای نوجوان خود انجام دهید
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-gray-800">۷</div>
                    <div className="text-xs text-gray-600">روز</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">۵۰۰</div>
                    <div className="text-xs text-gray-600">امتیاز</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">۱۸۹</div>
                    <div className="text-xs text-gray-600">شرکت</div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                  شرکت در چالش
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}