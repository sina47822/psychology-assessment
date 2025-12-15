'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target, 
  Award, 
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Star,
  Zap,
  TrendingUp,
  Bell
} from 'lucide-react';
import { useState } from 'react';

interface DailyTask {
  id: number;
  title: string;
  description: string;
  time: string;
  duration: string;
  completed: boolean;
  points: number;
  category: string;
}

interface WeeklyGoal {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  color: string;
}

export default function WeeklyPlanPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const daysOfWeek = [
    { name: 'شنبه', date: '۱۴۰۳/۰۳/۰۱', day: 1 },
    { name: 'یکشنبه', date: '۱۴۰۳/۰۳/۰۲', day: 2 },
    { name: 'دوشنبه', date: '۱۴۰۳/۰۳/۰۳', day: 3 },
    { name: 'سه‌شنبه', date: '۱۴۰۳/۰۳/۰۴', day: 4 },
    { name: 'چهارشنبه', date: '۱۴۰۳/۰۳/۰۵', day: 5 },
    { name: 'پنجشنبه', date: '۱۴۰۳/۰۳/۰۶', day: 6 },
    { name: 'جمعه', date: '۱۴۰۳/۰۳/۰۷', day: 7 },
  ];

  const [selectedDay, setSelectedDay] = useState(1);

  const dailyTasks: DailyTask[] = [
    { 
      id: 1, 
      title: 'گفتگوی ۱۵ دقیقه‌ای با نوجوان', 
      description: 'در مورد برنامه‌های هفته صحبت کنید',
      time: '۱۸:۰۰',
      duration: '۱۵ دقیقه',
      completed: true,
      points: 50,
      category: 'ارتباط'
    },
    { 
      id: 2, 
      title: 'مطالعه مقاله "مدیریت تعارض"', 
      description: 'خواندن مقاله و یادداشت برداری',
      time: '۲۰:۰۰',
      duration: '۲۰ دقیقه',
      completed: true,
      points: 30,
      category: 'آموزش'
    },
    { 
      id: 3, 
      title: 'تمرین گوش دادن فعال', 
      description: 'تمرین مهارت گوش دادن در گفتگوی خانوادگی',
      time: '۲۱:۰۰',
      duration: '۱۰ دقیقه',
      completed: false,
      points: 40,
      category: 'مهارت'
    },
    { 
      id: 4, 
      title: 'ثبت تجربیات روزانه', 
      description: 'ثبت نکات مهم در دفتر یادداشت',
      time: '۲۲:۰۰',
      duration: '۵ دقیقه',
      completed: false,
      points: 20,
      category: 'انعکاس'
    },
  ];

  const weeklyGoals: WeeklyGoal[] = [
    { 
      id: 1, 
      title: 'گفتگوی روزانه با نوجوان', 
      description: 'برقراری ارتباط موثر هر روز',
      progress: 7, 
      target: 7, 
      unit: 'روز',
      color: 'from-blue-500 to-sky-500'
    },
    { 
      id: 2, 
      title: 'مطالعه مقالات آموزشی', 
      description: 'خواندن حداقل ۳ مقاله در هفته',
      progress: 2, 
      target: 3, 
      unit: 'مقاله',
      color: 'from-emerald-500 to-green-500'
    },
    { 
      id: 3, 
      title: 'شرکت در چالش‌ها', 
      description: 'شرکت در حداقل ۲ چالش هفتگی',
      progress: 1, 
      target: 2, 
      unit: 'چالش',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 4, 
      title: 'تعامل در انجمن', 
      description: 'شرکت در بحث‌های انجمن',
      progress: 5, 
      target: 7, 
      unit: 'مشارکت',
      color: 'from-orange-500 to-yellow-500'
    },
  ];

  const weeklyStats = [
    { label: 'تکمیل شده', value: '۸/۱۲', percentage: 67, icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'زمان کل', value: '۳.۵ ساعت', percentage: 45, icon: Clock, color: 'text-blue-600' },
    { label: 'امتیاز کسب شده', value: '۳۲۰', percentage: 80, icon: Star, color: 'text-yellow-600' },
    { label: 'تداوم', value: '۱۴ روز', percentage: 100, icon: TrendingUp, color: 'text-purple-600' },
  ];

  const handleTaskToggle = (taskId: number) => {
    // در واقعیت اینجا API call می‌شد
    console.log(`Task ${taskId} toggled`);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">برنامه هفتگی</h1>
          <p className="text-gray-600">برنامه‌ریزی و مدیریت فعالیت‌های هفتگی شما</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrevWeek}>
            هفته قبل
          </Button>
          <Button variant="outline" onClick={handleNextWeek}>
            هفته بعد
          </Button>
          <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600">
            <Plus className="h-5 w-5 ml-2" />
            افزودن فعالیت
          </Button>
        </div>
      </div>

      {/* آمار هفتگی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyStats.map((stat, index) => (
          <Card key={index} className="border-sky-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-sky-600 h-2 rounded-full" 
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 mr-2">{stat.percentage}%</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* تقویم هفتگی */}
        <div className="lg:col-span-2 space-y-6">
          {/* روزهای هفته */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Calendar className="h-5 w-5 ml-2" />
                هفته جاری: ۱۴۰۳/۰۳/۰۱ تا ۱۴۰۳/۰۳/۰۷
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                      selectedDay === day.day
                        ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white border-sky-500 shadow-lg'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{day.name}</span>
                    <span className={`text-lg font-bold mt-1 ${
                      selectedDay === day.day ? 'text-white' : 'text-gray-800'
                    }`}>
                      {day.day}
                    </span>
                    <span className={`text-xs mt-1 ${
                      selectedDay === day.day ? 'text-sky-100' : 'text-gray-500'
                    }`}>
                      {day.date}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* فعالیت‌های روز */}
          <Card className="border-sky-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">
                  فعالیت‌های روز {daysOfWeek.find(d => d.day === selectedDay)?.name}
                </CardTitle>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                  {dailyTasks.filter(t => t.completed).length} از {dailyTasks.length} تکمیل شده
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl transition-all ${
                      task.completed
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-gray-200 hover:border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    <div className="flex-1 mb-3 md:mb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleTaskToggle(task.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                              task.completed
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-gray-300 hover:border-sky-500'
                            }`}
                          >
                            {task.completed && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                          </button>
                          <div>
                            <h3 className={`font-bold ${
                              task.completed ? 'text-emerald-800 line-through' : 'text-gray-800'
                            }`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          </div>
                        </div>
                        <Badge className={`${
                          task.category === 'ارتباط' ? 'bg-blue-100 text-blue-800' :
                          task.category === 'آموزش' ? 'bg-purple-100 text-purple-800' :
                          task.category === 'مهارت' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {task.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 pr-9">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 ml-1" />
                          <span>{task.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>⏱️ {task.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 ml-1 text-yellow-500" />
                          <span>{task.points} امتیاز</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                <Plus className="h-5 w-5 ml-2" />
                افزودن فعالیت جدید
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* سایدبار */}
        <div className="space-y-6">
          {/* اهداف هفتگی */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Target className="h-5 w-5 ml-2" />
                اهداف هفتگی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyGoals.map((goal) => (
                  <div key={goal.id} className="p-3 border border-gray-200 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-800">{goal.title}</h4>
                      <span className="text-sm font-bold text-gray-700">
                        {goal.progress} / {goal.target}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${goal.color}`}
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round((goal.progress / goal.target) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* نکات برنامه‌ریزی */}
          <Card className="border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">نکات برنامه‌ریزی</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="p-1 bg-sky-100 rounded-lg ml-2">
                    <Zap className="h-4 w-4 text-sky-600" />
                  </div>
                  <p className="text-sm text-gray-700">فعالیت‌ها را بر اساس اولویت زمان‌بندی کنید</p>
                </div>
                <div className="flex items-start">
                  <div className="p-1 bg-sky-100 rounded-lg ml-2">
                    <Bell className="h-4 w-4 text-sky-600" />
                  </div>
                  <p className="text-sm text-gray-700">برای فعالیت‌های مهم یادآور تنظیم کنید</p>
                </div>
                <div className="flex items-start">
                  <div className="p-1 bg-sky-100 rounded-lg ml-2">
                    <Award className="h-4 w-4 text-sky-600" />
                  </div>
                  <p className="text-sm text-gray-700">پس از تکمیل هر فعالیت به خود پاداش دهید</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* خلاصه هفته */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">خلاصه هفته</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2">
                  <span className="text-gray-600">کل فعالیت‌ها:</span>
                  <span className="font-bold text-gray-800">۱۲</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-gray-600">تکمیل شده:</span>
                  <span className="font-bold text-emerald-600">۸</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-gray-600">در انتظار:</span>
                  <span className="font-bold text-amber-600">۴</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-gray-600">امتیاز کل:</span>
                  <span className="font-bold text-yellow-600">۳۲۰</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-gray-600">میانگین روزانه:</span>
                  <span className="font-bold text-blue-600">۴۵ دقیقه</span>
                </div>
              </div>
              <Button className="w-full mt-4">
                مشاهده گزارش کامل
                <ChevronRight className="h-5 w-5 mr-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}