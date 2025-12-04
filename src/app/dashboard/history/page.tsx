'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  FileText,
  Calendar,
  Clock,
  Download,
  Eye,
  Trash2,
  Filter,
  Search,
  ChevronRight,
  BarChart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  CalendarDays,
  User,
  Printer,
  Share2,
  Star,
  FileBarChart
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AssessmentRecord {
  id: string;
  title: string;
  date: string;
  duration: string;
  score: number;
  totalQuestions: number;
  answered: number;
  status: 'completed' | 'in-progress' | 'pending';
  categoryScores: {
    [key: string]: number;
  };
  notes?: string;
}

export default function AssessmentHistoryPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [filteredAssessments, setFilteredAssessments] = useState<AssessmentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // هدایت به لاگین اگر کاربر لاگین نکرده
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // بارگذاری تاریخچه ارزیابی‌ها
  useEffect(() => {
    if (!user) return;
    
    const loadAssessmentHistory = () => {
      setLoading(true);
      
      // شبیه‌سازی بارگذاری داده
      setTimeout(() => {
        const mockAssessments: AssessmentRecord[] = [
          {
            id: '1',
            title: 'ارزیابی جامع رفتاری',
            date: '2024-01-15',
            duration: '45 دقیقه',
            score: 85,
            totalQuestions: 80,
            answered: 72,
            status: 'completed',
            categoryScores: {
              'اضطراب': 78,
              'افسردگی': 82,
              'پرخاشگری': 65,
              'اعتماد به نفس': 90,
              'روابط اجتماعی': 88,
              'تمرکز': 75,
              'خانواده': 85,
              'مدرسه': 80
            },
            notes: 'ارزیابی با دقت بالا تکمیل شد. نیاز به پیگیری در زمینه پرخاشگری'
          },
          {
            id: '2',
            title: 'ارزیابی سلامت روان',
            date: '2023-12-10',
            duration: '35 دقیقه',
            score: 72,
            totalQuestions: 60,
            answered: 60,
            status: 'completed',
            categoryScores: {
              'اضطراب': 65,
              'افسردگی': 70,
              'استرس': 68,
              'خواب': 80,
              'تغذیه': 75
            }
          },
          {
            id: '3',
            title: 'ارزیابی تحصیلی',
            date: '2023-11-25',
            duration: '25 دقیقه',
            score: 90,
            totalQuestions: 40,
            answered: 40,
            status: 'completed',
            categoryScores: {
              'تمرکز': 88,
              'انگیزه': 92,
              'مدیریت زمان': 85,
              'یادگیری': 95
            }
          },
          {
            id: '4',
            title: 'ارزیابی مهارت‌های اجتماعی',
            date: '2023-10-30',
            duration: '40 دقیقه',
            score: 78,
            totalQuestions: 50,
            answered: 50,
            status: 'completed',
            categoryScores: {
              'ارتباط مؤثر': 80,
              'همکاری': 75,
              'حل تعارض': 70,
              'همدلی': 85
            }
          },
          {
            id: '5',
            title: 'ارزیابی فعلی',
            date: new Date().toISOString().split('T')[0],
            duration: '20 دقیقه',
            score: 0,
            totalQuestions: 80,
            answered: 45,
            status: 'in-progress',
            categoryScores: {}
          }
        ];
        
        setAssessments(mockAssessments);
        setFilteredAssessments(mockAssessments);
        setLoading(false);
      }, 1000);
    };
    
    loadAssessmentHistory();
  }, [user]);

  // فیلتر کردن ارزیابی‌ها
  useEffect(() => {
    let filtered = assessments;
    
    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter(assessment =>
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.date.includes(searchTerm)
      );
    }
    
    // فیلتر بر اساس وضعیت
    if (statusFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.status === statusFilter);
    }
    
    // فیلتر بر اساس تاریخ
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(assessment => {
            const assessmentDate = new Date(assessment.date);
            return assessmentDate >= today;
          });
          break;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          filtered = filtered.filter(assessment => {
            const assessmentDate = new Date(assessment.date);
            return assessmentDate >= weekAgo;
          });
          break;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          filtered = filtered.filter(assessment => {
            const assessmentDate = new Date(assessment.date);
            return assessmentDate >= monthAgo;
          });
          break;
      }
    }
    
    setFilteredAssessments(filtered);
  }, [searchTerm, statusFilter, dateFilter, assessments]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
            <CheckCircle className="h-3 w-3 ml-1" />
            تکمیل شده
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 ml-1" />
            در حال انجام
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-3 w-3 ml-1" />
            در انتظار
          </span>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-sky-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleDeleteAssessment = (id: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این ارزیابی را حذف کنید؟')) {
      setAssessments(prev => prev.filter(assessment => assessment.id !== id));
    }
  };

  const handleViewDetails = (assessment: AssessmentRecord) => {
    setSelectedAssessment(assessment);
  };

  const exportAssessment = (assessment: AssessmentRecord) => {
    const data = {
      assessment,
      user: {
        id: user?.id,
        name: user?.fullName
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-${assessment.id}-${assessment.date}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printAssessment = (assessment: AssessmentRecord) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>گزارش ارزیابی: ${assessment.title}</title>
            <style>
              body { font-family: Tahoma, sans-serif; direction: rtl; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .info { margin-bottom: 20px; }
              .score { font-size: 24px; font-weight: bold; margin: 20px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
              th { background-color: #f5f5f5; }
              @media print {
                body { padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${assessment.title}</h1>
              <p>تاریخ: ${formatDate(assessment.date)}</p>
              <p>کاربر: ${user?.fullName}</p>
            </div>
            
            <div class="info">
              <p>مدت زمان: ${assessment.duration}</p>
              <p>تعداد سوالات: ${assessment.totalQuestions}</p>
              <p>تعداد پاسخ‌ها: ${assessment.answered}</p>
              <div class="score">نمره کلی: ${assessment.score}/100</div>
            </div>
            
            ${assessment.categoryScores && Object.keys(assessment.categoryScores).length > 0 ? `
              <h2>نتایج به تفکیک دسته‌بندی</h2>
              <table>
                <thead>
                  <tr>
                    <th>دسته‌بندی</th>
                    <th>نمره</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(assessment.categoryScores).map(([category, score]) => `
                    <tr>
                      <td>${category}</td>
                      <td>${score}/100</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}
            
            ${assessment.notes ? `
              <h2>توضیحات و پیشنهادات</h2>
              <p>${assessment.notes}</p>
            ` : ''}
            
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const calculateStats = () => {
    const completed = assessments.filter(a => a.status === 'completed').length;
    const totalScore = assessments.filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.score, 0);
    const avgScore = completed > 0 ? Math.round(totalScore / completed) : 0;
    const totalTime = assessments.reduce((sum, a) => {
      const minutes = parseInt(a.duration) || 0;
      return sum + minutes;
    }, 0);
    
    return { completed, avgScore, totalTime };
  };

  const stats = calculateStats();

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userName={user.fullName} />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {/* هدر صفحه */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center">
                  <FileBarChart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">تاریخچه ارزیابی‌ها</h1>
                  <p className="text-gray-600">نمایش کلیه ارزیابی‌های انجام شده توسط شما</p>
                </div>
              </div>
              
              <button
                onClick={() => router.push('/')}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>ارزیابی جدید</span>
              </button>
            </div>

            {/* آمار کلی */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">تعداد ارزیابی‌ها</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                  </div>
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-sky-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">میانگین نمره</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.avgScore}%</p>
                  </div>
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-sky-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">کل زمان صرف شده</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalTime} دقیقه</p>
                  </div>
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-sky-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* فیلترها */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>فیلترها</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      جستجو
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="جستجوی عنوان یا تاریخ..."
                        className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وضعیت
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="all">همه وضعیت‌ها</option>
                      <option value="completed">تکمیل شده</option>
                      <option value="in-progress">در حال انجام</option>
                      <option value="pending">در انتظار</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      بازه زمانی
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="all">همه زمان‌ها</option>
                      <option value="today">امروز</option>
                      <option value="week">هفته گذشته</option>
                      <option value="month">ماه گذشته</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setDateFilter('all');
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    حذف فیلترها
                  </button>
                </div>
              </div>
            </div>

            {/* لیست ارزیابی‌ها */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">در حال بارگذاری تاریخچه...</p>
                  </div>
                </div>
              ) : filteredAssessments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">ارزیابی‌ای یافت نشد</h3>
                  <p className="text-gray-600 mb-4">هیچ ارزیابی مطابق با فیلترهای انتخاب شده پیدا نشد.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setDateFilter('all');
                    }}
                    className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    مشاهده همه ارزیابی‌ها
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600">
                      نمایش <span className="font-bold">{filteredAssessments.length}</span> ارزیابی
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredAssessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-gray-800 mb-1">{assessment.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <Calendar className="h-4 w-4 ml-1" />
                                    {formatDate(assessment.date)}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 ml-1" />
                                    {assessment.duration}
                                  </span>
                                  <span className="flex items-center">
                                    <BarChart className="h-4 w-4 ml-1" />
                                    {assessment.answered}/{assessment.totalQuestions} سوال
                                  </span>
                                </div>
                              </div>
                              {getStatusBadge(assessment.status)}
                            </div>
                            
                            {assessment.status === 'completed' && (
                              <div className="flex items-center space-x-4 mt-3">
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(assessment.score)}`}>
                                  نمره: {assessment.score}%
                                </div>
                                
                                {assessment.score >= 80 && (
                                  <div className="flex items-center text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star key={star} className="h-4 w-4 fill-current" />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <button
                              onClick={() => handleViewDetails(assessment)}
                              className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                              title="مشاهده جزئیات"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            
                            <button
                              onClick={() => exportAssessment(assessment)}
                              className="p-2 text-sky-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="دریافت گزارش"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                            
                            <button
                              onClick={() => printAssessment(assessment)}
                              className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                              title="چاپ گزارش"
                            >
                              <Printer className="h-5 w-5" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteAssessment(assessment.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="حذف ارزیابی"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* دکمه ادامه ارزیابی در حال انجام */}
                        {assessment.status === 'in-progress' && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <button
                              onClick={() => router.push(`/?continue=${assessment.id}`)}
                              className="w-full bg-gradient-to-r from-sky-600 to-sky-600 text-white py-2 px-4 rounded-lg hover:from-sky-700 hover:to-sky-700 transition-colors flex items-center justify-center space-x-2"
                            >
                              <ChevronRight className="h-4 w-4" />
                              <span>ادامه ارزیابی</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* جزئیات ارزیابی انتخاب شده */}
              {selectedAssessment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-800">{selectedAssessment.title}</h2>
                            <p className="text-gray-600">{formatDate(selectedAssessment.date)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedAssessment(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <XCircle className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">مدت زمان</p>
                          <p className="font-medium text-gray-800">{selectedAssessment.duration}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">تعداد سوالات</p>
                          <p className="font-medium text-gray-800">{selectedAssessment.answered}/{selectedAssessment.totalQuestions}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">وضعیت</p>
                          <div className="mt-1">{getStatusBadge(selectedAssessment.status)}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">نمره کلی</p>
                          <p className="font-bold text-2xl text-gray-800">{selectedAssessment.score}%</p>
                        </div>
                      </div>
                      
                      {Object.keys(selectedAssessment.categoryScores).length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-bold text-gray-800 mb-4">نتایج به تفکیک دسته‌بندی</h3>
                          <div className="space-y-3">
                            {Object.entries(selectedAssessment.categoryScores).map(([category, score]) => (
                              <div key={category} className="flex items-center justify-between">
                                <span className="text-gray-700">{category}</span>
                                <div className="flex items-center space-x-4">
                                  <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-full rounded-full ${
                                        score >= 80 ? 'bg-sky-800' :
                                        score >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${score}%` }}
                                    ></div>
                                  </div>
                                  <span className="font-medium text-gray-800 w-10">{score}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedAssessment.notes && (
                        <div className="mb-6">
                          <h3 className="font-bold text-gray-800 mb-2">یادداشت‌ها و پیشنهادات</h3>
                          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                            <p className="text-gray-700">{selectedAssessment.notes}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                          onClick={() => printAssessment(selectedAssessment)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                        >
                          <Printer className="h-4 w-4" />
                          <span>چاپ گزارش</span>
                        </button>
                        <button
                          onClick={() => exportAssessment(selectedAssessment)}
                          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>دریافت گزارش</span>
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard?assessment=${selectedAssessment.id}`)}
                          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-2"
                        >
                          <BarChart className="h-4 w-4" />
                          <span>مشاهده تحلیل</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer simplified={true} />
    </div>
  );
}