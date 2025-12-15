'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Award,
  Star,
  Target,
  Zap,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  Heart,
  MessageSquare,
  BookOpen,
  Clock,
  Crown,
  Gem,
  Sparkles,
  CheckCircle,
  Lock,
  Share2
} from 'lucide-react';
import { useState } from 'react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'مهارت' | 'تداوم' | 'اجتماعی' | 'ویژه';
  rarity: 'معمولی' | 'نادر' | 'کمیاب' | 'افسانه‌ای';
  points: number;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedDate?: string;
}

interface AchievementCategory {
  name: string;
  count: number;
  completed: number;
  icon: React.ReactNode;
  color: string;
}

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const achievementCategories: AchievementCategory[] = [
    { 
      name: 'مهارت', 
      count: 12, 
      completed: 8, 
      icon: <Target className="h-5 w-5" />,
      color: 'from-blue-500 to-sky-500'
    },
    { 
      name: 'تداوم', 
      count: 8, 
      completed: 5, 
      icon: <Zap className="h-5 w-5" />,
      color: 'from-emerald-500 to-green-500'
    },
    { 
      name: 'اجتماعی', 
      count: 10, 
      completed: 6, 
      icon: <Users className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'ویژه', 
      count: 5, 
      completed: 2, 
      icon: <Crown className="h-5 w-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const achievements: Achievement[] = [
    { 
      id: 1, 
      title: 'شروع سفر', 
      description: 'ثبت‌نام در پلتفرم و تکمیل پروفایل',
      icon: <Sparkles className="h-8 w-8" />,
      category: 'ویژه',
      rarity: 'معمولی',
      points: 100,
      progress: 1,
      target: 1,
      unlocked: true,
      unlockedDate: '۱۴۰۳/۰۱/۱۵'
    },
    { 
      id: 2, 
      title: 'تداوم یک هفته‌ای', 
      description: '۷ روز تمرین متوالی',
      icon: <Zap className="h-8 w-8" />,
      category: 'تداوم',
      rarity: 'معمولی',
      points: 200,
      progress: 7,
      target: 7,
      unlocked: true,
      unlockedDate: '۱۴۰۳/۰۱/۲۲'
    },
    { 
      id: 3, 
      title: 'گوش دادن طلایی', 
      description: 'تکمیل ۱۰ تمرین گوش دادن فعال',
      icon: <MessageSquare className="h-8 w-8" />,
      category: 'مهارت',
      rarity: 'نادر',
      points: 300,
      progress: 7,
      target: 10,
      unlocked: false
    },
    { 
      id: 4, 
      title: 'جامعه‌ساز', 
      description: '۱۰ مشارکت مفید در انجمن',
      icon: <Users className="h-8 w-8" />,
      category: 'اجتماعی',
      rarity: 'نادر',
      points: 250,
      progress: 6,
      target: 10,
      unlocked: false
    },
    { 
      id: 5, 
      title: 'خواننده حرفه‌ای', 
      description: 'مطالعه ۲۰ مقاله آموزشی',
      icon: <BookOpen className="h-8 w-8" />,
      category: 'مهارت',
      rarity: 'کمیاب',
      points: 500,
      progress: 12,
      target: 20,
      unlocked: false
    },
    { 
      id: 6, 
      title: 'مدیر زمان', 
      description: 'تکمیل ۵۰ فعالیت در زمان مقرر',
      icon: <Clock className="h-8 w-8" />,
      category: 'تداوم',
      rarity: 'کمیاب',
      points: 600,
      progress: 42,
      target: 50,
      unlocked: false
    },
    { 
      id: 7, 
      title: 'قهرمان ارتباط', 
      description: 'کسب ۱۰۰۰ امتیاز در بخش ارتباط',
      icon: <Heart className="h-8 w-8" />,
      category: 'مهارت',
      rarity: 'افسانه‌ای',
      points: 1000,
      progress: 650,
      target: 1000,
      unlocked: false
    },
    { 
      id: 8, 
      title: 'شوالیه خانواده', 
      description: 'تکمیل تمام چالش‌های خانوادگی',
      icon: <Shield className="h-8 w-8" />,
      category: 'ویژه',
      rarity: 'افسانه‌ای',
      points: 1500,
      progress: 3,
      target: 8,
      unlocked: false
    },
  ];

  const userStats = {
    totalAchievements: 15,
    unlockedAchievements: 8,
    total_points: 2350,
    rank: 'نوآموز',
    nextRank: 'کارآموز',
    progressToNextRank: 65,
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'معمولی': return 'bg-gray-100 text-gray-800';
      case 'نادر': return 'bg-blue-100 text-blue-800';
      case 'کمیاب': return 'bg-purple-100 text-purple-800';
      case 'افسانه‌ای': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'مهارت': return 'bg-blue-100 text-blue-800';
      case 'تداوم': return 'bg-emerald-100 text-emerald-800';
      case 'اجتماعی': return 'bg-purple-100 text-purple-800';
      case 'ویژه': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unlocked') return achievement.unlocked;
    if (activeTab === 'locked') return !achievement.unlocked;
    return achievement.category === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">دستاوردها</h1>
          <p className="text-gray-600">نمایش افتخارات و دستاوردهای شما در مسیر یادگیری</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-to-r from-sky-50 to-blue-50">
            <Trophy className="h-4 w-4 ml-1" />
            {userStats.unlockedAchievements} از {userStats.totalAchievements}
          </Badge>
          <Badge variant="outline" className="bg-gradient-to-r from-yellow-50 to-amber-50">
            <Star className="h-4 w-4 ml-1" />
            {userStats.total_points} امتیاز
          </Badge>
        </div>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">پیشرفت کلی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* رتبه کاربر */}
              <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">رتبه فعلی: {userStats.rank}</h3>
                    <p className="text-gray-600">رتبه بعدی: {userStats.nextRank}</p>
                  </div>
                  <div className="text-center mt-3 md:mt-0">
                    <div className="text-3xl font-bold text-sky-600">{userStats.progressToNextRank}%</div>
                    <div className="text-gray-600">تا رتبه بعدی</div>
                  </div>
                </div>
                <Progress value={userStats.progressToNextRank} className="mt-4" />
              </div>

              {/* دسته‌بندی‌ها */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievementCategories.map((category) => (
                  <Card key={category.name} className="border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mb-3`}>
                          {category.icon}
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">{category.name}</h4>
                        <p className="text-sm text-gray-600">
                          {category.completed} از {category.count}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            style={{ width: `${(category.completed / category.count) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* کارت رتبه */}
        <Card className="border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-2">رتبه شما</h3>
              <div className="text-3xl font-bold text-gray-800 mb-1">{userStats.rank}</div>
              <p className="text-gray-600 mb-4">با {userStats.total_points} امتیاز</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">دستاوردها:</span>
                  <span className="font-bold">{userStats.unlockedAchievements}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">امتیاز کل:</span>
                  <span className="font-bold">{userStats.total_points}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">رتبه بعدی:</span>
                  <span className="font-bold">{userStats.nextRank}</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                مشاهده راه‌های ارتقا
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تب‌ها و لیست دستاوردها */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <TabsList className="grid grid-cols-4 mb-4 md:mb-0">
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="unlocked">کسب شده</TabsTrigger>
            <TabsTrigger value="locked">در حال پیشرفت</TabsTrigger>
            <TabsTrigger value="ویژه">ویژه</TabsTrigger>
          </TabsList>
          <div className="text-sm text-gray-600">
            <Star className="h-4 w-4 inline ml-1 text-yellow-500" />
            مجموع امتیاز قابل کسب: {achievements.reduce((sum, a) => sum + a.points, 0)}
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`border-sky-100 hover:shadow-lg transition-all duration-300 ${
                  achievement.unlocked ? 'ring-2 ring-emerald-200' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    {/* آیکون دستاورد */}
                    <div className={`relative inline-flex mb-3 ${
                      achievement.unlocked ? '' : 'opacity-50'
                    }`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-sky-500 to-blue-500' 
                          : 'bg-gradient-to-r from-gray-300 to-gray-400'
                      }`}>
                        <div className={`${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
                          {achievement.icon}
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* عنوان و توضیحات */}
                    <h3 className={`font-bold mb-1 ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 min-h-[40px]">
                      {achievement.description}
                    </p>

                    {/* اطلاعات دستاورد */}
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <Badge className={getCategoryColor(achievement.category)}>
                        {achievement.category}
                      </Badge>
                    </div>

                    {/* امتیاز */}
                    <div className="flex items-center justify-center mb-3">
                      <Star className="h-4 w-4 text-yellow-500 ml-1" />
                      <span className="font-bold text-gray-800">{achievement.points} امتیاز</span>
                    </div>

                    {/* نوار پیشرفت */}
                    {!achievement.unlocked && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>پیشرفت</span>
                          <span>{achievement.progress} / {achievement.target}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.target) * 100} />
                      </div>
                    )}

                    {/* دکمه‌ها */}
                    {achievement.unlocked ? (
                      <div className="text-center">
                        <div className="text-xs text-emerald-600 mb-2">
                          <Calendar className="h-3 w-3 inline ml-1" />
                          کسب شده در {achievement.unlockedDate}
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Share2 className="h-4 w-4 ml-2" />
                          اشتراک‌گذاری
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full" disabled={achievement.unlocked}>
                        <Lock className="h-4 w-4 ml-2" />
                        در حال پیشرفت
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* آخرین دستاوردها */}
      <Card className="border-sky-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <TrendingUp className="h-5 w-5 ml-2" />
            آخرین دستاوردهای کسب شده
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements
              .filter(a => a.unlocked)
              .slice(0, 3)
              .map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-3 border border-emerald-200 rounded-xl bg-emerald-50">
                  <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                      {achievement.icon}
                    </div>
                    <div className="mr-3">
                      <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.unlockedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 ml-1" />
                      <span className="font-bold text-gray-800">{achievement.points} امتیاز</span>
                    </div>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}