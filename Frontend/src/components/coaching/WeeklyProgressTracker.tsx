// src/components/coaching/WeeklyProgressTracker.tsx
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';

interface WeeklyProgress {
  week: number;
  title: string;
  completedTasks: number;
  totalTasks: number;
  points: number;
  status: 'completed' | 'in-progress' | 'locked' | 'upcoming';
}

interface WeeklyProgressTrackerProps {
  pathId: string;
  currentWeek: number;
  onWeekSelect?: (week: number) => void;
}

export default function WeeklyProgressTracker({ 
  pathId, 
  currentWeek,
  onWeekSelect 
}: WeeklyProgressTrackerProps) {
  const [weeks, setWeeks] = useState<WeeklyProgress[]>([
    { week: 1, title: 'آشنایی و شروع', completedTasks: 7, totalTasks: 7, points: 350, status: 'completed' },
    { week: 2, title: 'تمرین ارتباط', completedTasks: 7, totalTasks: 7, points: 350, status: 'completed' },
    { week: 3, title: 'گفتگوی مؤثر', completedTasks: 3, totalTasks: 7, points: 150, status: 'in-progress' },
    { week: 4, title: 'تثبیت مهارت', completedTasks: 0, totalTasks: 7, points: 0, status: 'upcoming' },
  ]);

  const totalWeeks = weeks.length;
  const completedWeeks = weeks.filter(w => w.status === 'completed').length;
  const progressPercentage = (completedWeeks / totalWeeks) * 100;

  const getWeekColor = (status: WeeklyProgress['status']) => {
    switch (status) {
      case 'completed': return 'bg-sky-500 border-sky-500';
      case 'in-progress': return 'bg-sky-500 border-sky-500 animate-pulse';
      case 'upcoming': return 'bg-gray-300 border-gray-400';
      case 'locked': return 'bg-gray-200 border-gray-300';
      default: return 'bg-gray-200 border-gray-300';
    }
  };

  const getWeekIcon = (status: WeeklyProgress['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-white" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-white" />;
      default: return <Star className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">پیشرفت هفتگی</h2>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-sky-500" />
          <span className="text-sm text-gray-600">
            {completedWeeks} از {totalWeeks} هفته تکمیل شده
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-1">
          <span>پیشرفت کلی</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-sky-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Weekly timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300"></div>
        
        <div className="grid grid-cols-4 gap-4 relative z-10">
          {weeks.map((weekData) => (
            <div key={weekData.week} className="text-center">
              <button
                onClick={() => onWeekSelect && onWeekSelect(weekData.week)}
                disabled={weekData.status === 'locked'}
                className={`w-12 h-12 rounded-full border-4 flex items-center justify-center mx-auto mb-3 transition-all ${
                  weekData.status !== 'locked' ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed'
                } ${getWeekColor(weekData.status)}`}
              >
                {getWeekIcon(weekData.status)}
              </button>
              
              <div className="text-center">
                <div className="font-bold text-gray-800">هفته {weekData.week}</div>
                <div className="text-xs text-gray-600 mt-1">{weekData.title}</div>
                
                <div className="mt-2 text-xs">
                  <div className="text-gray-500">
                    {weekData.completedTasks}/{weekData.totalTasks} تمرین
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-sky-500" />
                    <span className="font-medium">{weekData.points}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Week details */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">هفته جاری: {weeks[currentWeek - 1]?.title}</h3>
          <span className="text-sm bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
            در حال انجام
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">تمرین‌های تکمیل شده</span>
            <span className="font-bold">
              {weeks[currentWeek - 1]?.completedTasks} از {weeks[currentWeek - 1]?.totalTasks}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">امتیاز کسب شده</span>
            <span className="font-bold flex items-center gap-1">
              <Star className="h-4 w-4 text-sky-500" />
              {weeks[currentWeek - 1]?.points}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">روزهای باقی‌مانده</span>
            <span className="font-bold">
              {7 - (weeks[currentWeek - 1]?.completedTasks || 0)} روز
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}