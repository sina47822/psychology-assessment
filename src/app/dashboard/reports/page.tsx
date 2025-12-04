'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Share2,
  Printer,
  FileText,
  Users,
  Clock,
  Award,
  RefreshCw,
  MoreVertical
} from 'lucide-react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: 1,
      title: 'گزارش ماهانه عملکرد',
      description: 'تحلیل کامل عملکرد ماه گذشته',
      type: 'monthly',
      icon: BarChart3,
      date: 'بهمن ۱۴۰۲',
      status: 'completed',
      downloads: 45,
      size: '2.5 MB',
      color: 'bg-sky-500',
    },
    {
      id: 2,
      title: 'گزارش تحلیلی شخصیت',
      description: 'تحلیل تیپ شخصیتی و ویژگی‌ها',
      type: 'personality',
      icon: PieChart,
      date: 'دی ۱۴۰۲',
      status: 'completed',
      downloads: 32,
      size: '1.8 MB',
      color: 'bg-sky-500',
    },
    {
      id: 3,
      title: 'گزارش پیشرفت تحصیلی',
      description: 'روند پیشرفت درسی و آموزشی',
      type: 'academic',
      icon: TrendingUp,
      date: 'آذر ۱۴۰۲',
      status: 'completed',
      downloads: 28,
      size: '1.2 MB',
      color: 'bg-sky-800',
    },
    {
      id: 4,
      title: 'گزارش سلامت روان',
      description: 'بررسی سلامت روان و عاطفی',
      type: 'mental-health',
      icon: LineChart,
      date: 'آبان ۱۴۰۲',
      status: 'completed',
      downloads: 41,
      size: '3.1 MB',
      color: 'bg-sky-500',
    },
    {
      id: 5,
      title: 'گزارش مهارت‌های اجتماعی',
      description: 'تحلیل مهارت‌های ارتباطی و اجتماعی',
      type: 'social',
      icon: Users,
      date: 'مهر ۱۴۰۲',
      status: 'completed',
      downloads: 23,
      size: '2.1 MB',
      color: 'bg-sky-500',
    },
    {
      id: 6,
      title: 'گزارش جامع سالانه',
      description: 'خلاصه عملکرد یک ساله',
      type: 'annual',
      icon: Award,
      date: 'شهریور ۱۴۰۲',
      status: 'completed',
      downloads: 19,
      size: '4.5 MB',
      color: 'bg-red-500',
    },
  ];

  const stats = {
    totalReports: 6,
    totalDownloads: 188,
    averageScore: 76,
    completionRate: 85,
  };

  const recentActivity = [
    { id: 1, action: 'دانلود گزارش ماهانه', user: 'شما', time: '۲ ساعت پیش' },
    { id: 2, action: 'اشتراک‌گذاری گزارش شخصیت', user: 'شما', time: '۱ روز پیش' },
    { id: 3, action: 'ایجاد گزارش جدید', user: 'سیستم', time: '۳ روز پیش' },
    { id: 4, action: 'دانلود گزارش سلامت روان', user: 'شما', time: '۱ هفته پیش' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-sky-600" />
            گزارش‌ها و تحلیل‌ها
          </h1>
          <p className="text-gray-600 mt-2">
            مشاهده و مدیریت تمامی گزارش‌های ارزیابی و تحلیلی
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
            <RefreshCw className="h-5 w-5" />
            ایجاد گزارش جدید
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">کل گزارش‌ها</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalReports}</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg">
              <FileText className="h-6 w-6 text-sky-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">تعداد دانلود</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalDownloads}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Download className="h-6 w-6 text-sky-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">میانگین نمره</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.averageScore}%</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-sky-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">نرخ تکمیل</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.completionRate}%</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg">
              <Award className="h-6 w-6 text-sky-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">فیلتر گزارش‌ها</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="week">هفته جاری</option>
                  <option value="month">ماه جاری</option>
                  <option value="quarter">سه‌ماهه</option>
                  <option value="year">سال جاری</option>
                  <option value="all">همه زمان‌ها</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                  <option value="all">همه انواع</option>
                  <option value="monthly">ماهانه</option>
                  <option value="personality">شخصیت</option>
                  <option value="academic">تحصیلی</option>
                  <option value="mental-health">سلامت روان</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Printer className="h-5 w-5" />
              چاپ همه
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="h-5 w-5" />
              دانلود همه
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          
          return (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-2 ${report.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${report.color.replace('bg-', 'bg-').replace('-500', '-100')} rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id.toString())}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {report.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {report.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">تاریخ:</span>
                    <span className="font-medium">{report.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">تعداد دانلود:</span>
                    <span className="font-medium">{report.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">حجم:</span>
                    <span className="font-medium">{report.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4" />
                    مشاهده
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    دانلود
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-sky-600" />
            فعالیت‌های اخیر
          </h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-sky-50 to-sky-50 rounded-xl p-6 border border-sky-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            اقدامات سریع
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-sky-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-50 rounded-lg">
                  <Printer className="h-5 w-5 text-sky-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">چاپ گزارش‌ها</p>
                  <p className="text-sm text-gray-600">پرینت تمام گزارش‌ها</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Share2 className="h-5 w-5 text-sky-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">اشتراک‌گذاری</p>
                  <p className="text-sm text-gray-600">اشتراک گزارش با دیگران</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-sky-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-50 rounded-lg">
                  <Download className="h-5 w-5 text-sky-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">دانلود همه</p>
                  <p className="text-sm text-gray-600">دانلود تمام گزارش‌ها</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-50 rounded-lg">
                  <RefreshCw className="h-5 w-5 text-sky-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">بروزرسانی</p>
                  <p className="text-sm text-gray-600">بروزرسانی گزارش‌ها</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}