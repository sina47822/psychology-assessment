'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Target, Award, Trophy, Flag } from 'lucide-react';

const milestones = [
  { title: 'شروع سفر', description: 'ثبت‌نام در پلتفرم', date: '۱۴۰۲/۰۱/۱۵', achieved: true, icon: Flag, color: 'text-blue-500' },
  { title: 'اولین تمرین', description: 'تکمیل اولین تمرین روزانه', date: '۱۴۰۲/۰۱/۱۶', achieved: true, icon: Target, color: 'text-green-500' },
  { title: 'تداوم یک هفته‌ای', description: '۷ روز تمرین متوالی', date: '۱۴۰۲/۰۱/۲۲', achieved: true, icon: Trophy, color: 'text-purple-500' },
  { title: 'کسب ۵۰۰ امتیاز', description: 'جمع‌آوری ۵۰۰ امتیاز', date: '۱۴۰۲/۰۲/۰۵', achieved: true, icon: Star, color: 'text-yellow-500' },
  { title: 'تکمیل مسیر اول', description: 'اتمام اولین مسیر یادگیری', date: '۱۴۰۲/۰۲/۲۰', achieved: false, icon: Award, color: 'text-pink-500' },
  { title: 'شرکت در وبینار', description: 'شرکت در اولین وبینار', date: '۱۴۰۲/۰۳/۱۰', achieved: false, icon: CheckCircle, color: 'text-indigo-500' },
];

export default function ProgressMilestonesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">نقاط عطف</h1>
        <p className="text-gray-600">دستاوردها و موفقیت‌های شما در مسیر یادگیری</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone, index) => (
          <Card key={index} className={`border-sky-100 hover:shadow-lg transition-shadow ${
            !milestone.achieved ? 'opacity-75' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${milestone.achieved ? 'bg-sky-100' : 'bg-gray-100'}`}>
                    <milestone.icon className={`h-6 w-6 ${milestone.color}`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800">{milestone.title}</CardTitle>
                </div>
                {milestone.achieved && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{milestone.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">تاریخ: {milestone.date}</span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  milestone.achieved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {milestone.achieved ? 'کسب شده' : 'در انتظار'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-sky-100 bg-gradient-to-r from-sky-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">پیش‌بینی دستاورد بعدی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">تکمیل مسیر اول</h3>
              <p className="text-gray-600">با ادامه روند فعلی، این دستاورد را در ۱۰ روز آینده کسب خواهید کرد.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600">۱۰</div>
              <div className="text-gray-600">روز مانده</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}