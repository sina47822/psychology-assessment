'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  Share2,
  Printer,
  Calendar,
  Clock,
  Eye,
  FileText,
  Users,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  Target,
  Brain,
  Heart,
  Users as UsersIcon,
  BookOpen,
  Zap
} from 'lucide-react';

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'comparison'>('overview');
  
  const assessmentResults = {
    overallScore: 78,
    completionDate: '۱۴۰۲/۱۰/۱۵',
    duration: '۲۵ دقیقه',
    status: 'completed',
    categories: [
      { name: 'شخصیت', score: 82, color: 'bg-sky-500', icon: Brain },
      { name: 'هوش هیجانی', score: 76, color: 'bg-sky-500', icon: Heart },
      { name: 'مهارت‌های اجتماعی', score: 85, color: 'bg-sky-800', icon: UsersIcon },
      { name: 'پیشرفت تحصیلی', score: 72, color: 'bg-sky-500', icon: BookOpen },
      { name: 'تمرکز و توجه', score: 68, color: 'bg-red-500', icon: Target },
      { name: 'انرژی و انگیزه', score: 79, color: 'bg-sky-500', icon: Zap },
    ],
    strengths: [
      'برقراری ارتباط اجتماعی',
      'همدلی و درک دیگران',
      'خلاقیت و نوآوری',
      'کار تیمی',
    ],
    areasForImprovement: [
      'مدیریت زمان',
      'تمرکز در کارهای طولانی',
      'کنترل استرس',
      'برنامه‌ریزی بلندمدت',
    ],
    recommendations: [
      'شرکت در کارگاه‌های مدیریت زمان',
      'تمرین تمرکز روزانه به مدت ۱۵ دقیقه',
      'مشاوره فردی برای مدیریت استرس',
      'برنامه‌ریزی هفتگی با کمک والدین',
    ],
  };

  const previousResults = [
    { date: '۱۴۰۲/۰۹/۱۰', score: 72, change: '+6' },
    { date: '۱۴۰۲/۰۸/۰۵', score: 68, change: '+10' },
    { date: '۱۴۰۲/۰۷/۱۲', score: 65, change: '+13' },
    { date: '۱۴۰۲/۰۶/۲۰', score: 70, change: '+8' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-sky-500';
    if (score >= 60) return 'text-sky-500';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'عالی';
    if (score >= 60) return 'متوسط';
    return 'نیاز به بهبود';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Award className="h-8 w-8 text-sky-500" />
            نتایج ارزیابی
          </h1>
          <p className="text-gray-600 mt-2">
            تحلیل و بررسی جامع نتایج ارزیابی رفتاری
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition-colors">
            <Download className="h-5 w-5" />
            دانلود گزارش
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition-colors">
            <Printer className="h-5 w-5" />
            چاپ نتایج
          </button>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">نمره کلی ارزیابی</h2>
                <p className="text-sky-100">نتایج تحلیل جامع رفتاری</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <div className="text-5xl font-bold mb-2">{assessmentResults.overallScore}</div>
                <div className={`px-3 py-1 rounded-full text-sm ${getScoreColor(assessmentResults.overallScore)} bg-white/20 backdrop-blur-sm`}>
                  {getScoreLabel(assessmentResults.overallScore)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>تاریخ تکمیل: {assessmentResults.completionDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>مدت زمان: {assessmentResults.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>وضعیت: تکمیل شده</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${assessmentResults.overallScore * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{assessmentResults.overallScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-sky-500 text-sky-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                مرور کلی
              </div>
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'detailed'
                  ? 'border-sky-500 text-sky-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                تحلیل جزئی
              </div>
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'comparison'
                  ? 'border-sky-500 text-sky-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                مقایسه روند
              </div>
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Categories Grid */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">نتایج بر اساس دسته‌بندی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assessmentResults.categories.map((category, index) => {
                    const Icon = category.icon;
                    
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${category.color.replace('500', '100')} rounded-lg`}>
                              <Icon className={`h-5 w-5 ${category.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className="font-medium text-gray-800">{category.name}</span>
                          </div>
                          <div className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                            {category.score}%
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${category.score}%` }}
                          ></div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          {getScoreLabel(category.score)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-sky-500" />
                    نقاط قوت
                  </h3>
                  <ul className="space-y-3">
                    {assessmentResults.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky-500 mt-0.5" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-sky-500" />
                    حوزه‌های بهبود
                  </h3>
                  <ul className="space-y-3">
                    {assessmentResults.areasForImprovement.map((area, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-sky-500 mt-0.5" />
                        <span className="text-gray-700">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'detailed' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">تحلیل تخصصی</h3>
                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <p className="text-gray-700">
                      بر اساس نتایج ارزیابی، عملکرد شما در حوزه‌های مختلف رفتاری و شخصیتی به شرح زیر است:
                    </p>
                    
                    <div className="mt-6 space-y-6">
                      {assessmentResults.categories.map((category, index) => (
                        <div key={index} className="border-l-4 border-sky-200 pl-4 py-2">
                          <h4 className="font-semibold text-gray-800 mb-2">{category.name}</h4>
                          <p className="text-gray-600 text-sm">
                            نمره {category.score}% نشان‌دهنده عملکرد {category.score >= 80 ? 'عالی' : category.score >= 60 ? 'متوسط' : 'نیاز به بهبود'} در این حوزه است.
                            {category.name === 'شخصیت' && ' شما فردی اجتماعی و خلاق با توانایی‌های ارتباطی قوی هستید.'}
                            {category.name === 'هوش هیجانی' && ' درک احساسات خود و دیگران در سطح خوبی قرار دارد.'}
                            {category.name === 'مهارت‌های اجتماعی' && ' توانایی شما در برقراری ارتباط بسیار خوب است.'}
                            {category.name === 'پیشرفت تحصیلی' && ' نیاز به بهبود در برنامه‌ریزی و مدیریت زمان دارید.'}
                            {category.name === 'تمرکز و توجه' && ' تمرکز در کارهای طولانی‌مدت نیاز به تقویت دارد.'}
                            {category.name === 'انرژی و انگیزه' && ' سطح انرژی و انگیزه شما در حد مطلوب است.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-sky-500" />
                  توصیه‌های تخصصی
                </h3>
                <ul className="space-y-3">
                  {assessmentResults.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="p-2 bg-sky-100 rounded-lg">
                        <FileText className="h-4 w-4 text-sky-500" />
                      </div>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">روند تغییرات</h3>
                
                <div className="space-y-4">
                  {previousResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{result.score}</div>
                          <div className="text-xs text-gray-500">نمره</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">ارزیابی {index + 1}</div>
                          <div className="text-sm text-gray-600">{result.date}</div>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        result.change.startsWith('+') 
                          ? 'bg-sky-100 text-sky-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.change} تغییر
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl p-6 border border-sky-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">نتیجه‌گیری</h3>
                <p className="text-gray-700">
                  با مقایسه نتایج فعلی با ارزیابی‌های قبلی، مشاهده می‌شود که پیشرفت مثبت و مداومی داشته‌اید.
                  نمره کلی شما از ۶۵ به ۷۸ افزایش یافته که نشان‌دهنده رشد ۱۳ درصدی است.
                  این روند مثبت ادامه‌دار خواهد بود با توجه به توصیه‌ها و برنامه‌های بهبود.
                </p>
                
                <div className="mt-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-500 mb-2">+۱۳%</div>
                    <div className="text-gray-600">پیشرفت کلی</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/dashboard/reports"
          className="flex-1 bg-sky-500 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-3"
        >
          <FileText className="h-5 w-5" />
          مشاهده گزارش کامل
        </Link>
        
        <button className="flex-1 bg-sky-500 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-3">
          <Share2 className="h-5 w-5" />
          اشتراک‌گذاری نتایج
        </button>
        
        <Link
          href="/dashboard"
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
        >
          <Eye className="h-5 w-5" />
          بازگشت به داشبورد
        </Link>
      </div>
    </div>
  );
}