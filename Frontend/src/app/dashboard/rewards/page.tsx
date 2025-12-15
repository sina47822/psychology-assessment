// src/app/dashboard/rewards/page.tsx
'use client';

import { useState } from 'react';
import { Gift, Trophy, Star, Target, Zap, Crown, Sparkles, Award } from 'lucide-react';

const REWARDS = [
  {
    id: 1,
    title: 'مشاوره رایگان ۳۰ دقیقه‌ای',
    description: 'یک جلسه مشاوره خصوصی با کارشناس مرکز',
    points: 1000,
    type: 'free_session',
    icon: '🎯',
    isClaimed: false,
    color: 'bg-gradient-to-r from-sky-500 to-sky-500'
  },
  {
    id: 2,
    title: 'کتاب الکترونیکی ویژه',
    description: 'کتاب "رازهای ارتباط با نوجوان"',
    points: 500,
    type: 'ebook',
    icon: '📚',
    isClaimed: true,
    color: 'bg-gradient-to-r from-sky-500 to-sky-500'
  },
  {
    id: 3,
    title: 'تخفیف ۲۰٪ کارگاه',
    description: 'تخفیف برای ثبت‌نام در کارگاه‌های آینده',
    points: 750,
    type: 'discount',
    icon: '🏷️',
    isClaimed: false,
    color: 'bg-gradient-to-r from-sky-500 to-sky-500'
  },
  {
    id: 4,
    title: 'گواهینامه طلایی',
    description: 'گواهینامه رسمی تکمیل مسیر آموزشی',
    points: 1200,
    type: 'certificate',
    icon: '🏆',
    isClaimed: false,
    color: 'bg-gradient-to-r from-sky-500 to-sky-500'
  },
  {
    id: 5,
    title: 'همراهی ویژه مربی',
    description: '۲ هفته همراهی اختصاصی مربی',
    points: 1500,
    type: 'coaching',
    icon: '👥',
    isClaimed: false,
    color: 'bg-gradient-to-r from-sky-500 to-sky-500'
  },
  {
    id: 6,
    title: 'عضویت ویژه انجمن',
    description: 'عضویت در انجمن والدین موفق',
    points: 800,
    type: 'community',
    icon: '🤝',
    isClaimed: false,
    color: 'bg-gradient-to-r from-sky-500 to-sky-500'
  }
];

const ACHIEVEMENTS = [
  { id: 1, title: 'شروع کننده', icon: '🏁', description: 'شروع اولین مسیر', unlocked: true },
  { id: 2, title: 'تداوم ۷ روزه', icon: '🔥', description: '۷ روز متوالی تمرین', unlocked: true },
  { id: 3, title: 'ارتباط‌گر برتر', icon: '💬', description: 'اتمام مسیر ارتباط', unlocked: false },
  { id: 4, title: 'والد آگاه', icon: '👨‍👩‍👧‍👦', description: 'تکمیل ۳ مسیر', unlocked: false },
  { id: 5, title: 'مربی ماه', icon: '⭐', description: '۱۰۰۰ امتیاز کسب کن', unlocked: false },
  { id: 6, title: 'قهرمان تعامل', icon: '🏆', description: 'شرکت در تمام چالش‌ها', unlocked: false },
];

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(850);
  const [activeTab, setActiveTab] = useState('rewards');

  const handleClaimReward = (rewardId: number) => {
    // API call to claim reward
    alert('جایزه درخواست شد!');
  };

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">سیستم جایزه و دستاورد</h1>
            <p className="text-sky-100">
              با تکمیل تمرین‌ها جایزه بگیرید و پیشرفت خود را جشن بگیرید
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="text-center bg-white/20 px-4 py-3 rounded-xl">
              <div className="text-sm">امتیاز شما</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                {userPoints} <Star className="h-6 w-6 text-sky-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="flex space-x-4 rtl:space-x-reverse">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'rewards'
              ? 'bg-sky-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            جوایز
          </div>
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'achievements'
              ? 'bg-sky-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            دستاوردها
          </div>
        </button>
      </div>

      {/* محتوای جوایز */}
      {activeTab === 'rewards' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REWARDS.map(reward => (
              <div 
                key={reward.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  reward.isClaimed ? 'border-sky-300' : 'border-gray-200'
                }`}
              >
                {/* هدر جایزه */}
                <div className={`${reward.color} h-32 relative flex items-center justify-center`}>
                  <div className="text-4xl">{reward.icon}</div>
                  {reward.isClaimed && (
                    <div className="absolute top-4 left-4 bg-white/90 text-sky-800 px-3 py-1 rounded-full text-sm font-bold">
                      دریافت شده ✓
                    </div>
                  )}
                </div>

                {/* محتوا */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {reward.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {reward.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-sky-500" />
                      <span className="font-bold text-gray-800">{reward.points} امتیاز</span>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      userPoints >= reward.points 
                        ? 'bg-sky-100 text-sky-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {userPoints >= reward.points ? 'قابل دریافت' : 'امتیاز کافی نیست'}
                    </div>
                  </div>

                  {/* دکمه دریافت */}
                  <button
                    onClick={() => handleClaimReward(reward.id)}
                    disabled={userPoints < reward.points || reward.isClaimed}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                      reward.isClaimed
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : userPoints >= reward.points
                          ? 'bg-gradient-to-r from-sky-500 to-sky-500 hover:from-sky-700 hover:to-sky-700 text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {reward.isClaimed 
                      ? 'دریافت شده' 
                      : userPoints >= reward.points 
                        ? 'دریافت جایزه' 
                        : `${reward.points - userPoints} امتیاز دیگر`
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* توضیحات */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">چگونه امتیاز کسب کنم؟</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-sky-500" />
                  <span className="font-bold">تمرین روزانه</span>
                </div>
                <p className="text-sm text-gray-600">هر تمرین: ۵۰-۱۰۰ امتیاز</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-sky-500" />
                  <span className="font-bold">چالش هفتگی</span>
                </div>
                <p className="text-sm text-gray-600">هر چالش: ۲۰۰ امتیاز</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-sky-500" />
                  <span className="font-bold">تکمیل مسیر</span>
                </div>
                <p className="text-sm text-gray-600">هر مسیر: ۵۰۰ امتیاز</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* محتوای دستاوردها */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map(achievement => (
            <div 
              key={achievement.id}
              className={`bg-white rounded-xl p-6 border-2 ${
                achievement.unlocked 
                  ? 'border-sky-300 bg-gradient-to-br from-sky-50 to-sky-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-3xl p-3 rounded-lg ${
                  achievement.unlocked ? 'bg-sky-100' : 'bg-gray-100'
                }`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">
                    {achievement.title}
                    {achievement.unlocked && (
                      <Sparkles className="h-4 w-4 text-sky-500 inline-block mr-2" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>
                  
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    achievement.unlocked
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {achievement.unlocked ? (
                      <>
                        <Award className="h-3 w-3" />
                        کسب شده
                      </>
                    ) : 'در حال پیشرفت'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}