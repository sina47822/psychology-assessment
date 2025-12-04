'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  Download,
  Star,
  Users,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { 
  CONTACT_INFO, 
  HELP_INFO, 
  RESOURCE_INFO 
} from '@/data/constants';

export default function HelpPage() {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleFaq = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setOpenFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allFaqs = HELP_INFO.faqCategories.flatMap(category =>
    category.questions.map((q, i) => ({
      ...q,
      category: category.id,
      index: i
    }))
  );

  const filteredFaqs = selectedCategory === 'all'
    ? allFaqs
    : allFaqs.filter(faq => faq.category === selectedCategory);

  const searchedFaqs = searchTerm
    ? filteredFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredFaqs;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-sky-50 to-white">
        {/* هیرو */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <HelpCircle className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-bold mb-4">مرکز راهنمایی و پشتیبانی</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                پاسخ به سوالات متداول، راهنماهای آموزشی و ارتباط با پشتیبانی
              </p>
              
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="چه سوالی دارید؟ جستجو کنید..."
                    className="w-full p-4 pr-12 rounded-xl border-0 focus:ring-2 focus:ring-white/30 bg-white/10 placeholder-white/70 text-white"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* راهنماهای سریع */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">راهنماهای سریع</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {HELP_INFO.popularGuides.map((guide, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(guide);
                    setSelectedCategory('all');
                  }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-sky-300 transition-all text-right flex items-center justify-between group"
                >
                  <span className="text-gray-700">{guide}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* سوالات متداول */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">سوالات متداول</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    همه
                  </button>
                  {HELP_INFO.faqCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${selectedCategory === category.id ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {category.id === 'general' && <HelpCircle className="h-4 w-4" />}
                      {category.id === 'assessment' && <FileText className="h-4 w-4" />}
                      {category.id === 'account' && <Users className="h-4 w-4" />}
                      <span>{category.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {searchedFaqs.length > 0 ? (
                  searchedFaqs.map((faq) => {
                    const key = `${faq.category}-${faq.index}`;
                    const isOpen = openFaqs[key];
                    
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.category, faq.index)}
                          className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{faq.question}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                {HELP_INFO.faqCategories.find(c => c.id === faq.category)?.icon || <HelpCircle className="h-4 w-4" />}
                                <span className="mr-2">
                                  {HELP_INFO.faqCategories.find(c => c.id === faq.category)?.title}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="mr-4">
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">هیچ سوالی یافت نشد</h3>
                    <p className="text-gray-600">سعی کنید عبارت جستجوی خود را تغییر دهید.</p>
                  </div>
                )}
              </div>
            </div>

            {/* سایدبار */}
            <div className="space-y-8">
              {/* آموزش‌های ویدیویی */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">آموزش‌های ویدیویی</h3>
                    <p className="text-sm text-gray-600">آموزش تصویری استفاده از سامانه</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {RESOURCE_INFO.videoTutorials.map(tutorial => (
                    <div
                      key={tutorial.id}
                      className="group cursor-pointer"
                      onClick={() => window.open(`/tutorials/${tutorial.id}`, '_blank')}
                    >
                      <div className="relative rounded-lg overflow-hidden">
                        <div className="w-full h-40 bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center">
                          <Video className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 right-3 left-3">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-medium">{tutorial.title}</span>
                            <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {tutorial.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => window.open('/tutorials', '_blank')}
                  className="w-full mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>مشاهده همه آموزش‌ها</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              {/* راهنماهای PDF */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">راهنماهای PDF</h3>
                    <p className="text-sm text-gray-600">دانلود راهنماهای کامل</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {RESOURCE_INFO.guides.map((guide, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => window.open(`/guides/${index + 1}.pdf`, '_blank')}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          {index === 0 && <BookOpen className="h-5 w-5 text-sky-600" />}
                          {index === 1 && <FileText className="h-5 w-5 text-sky-600" />}
                          {index === 2 && <Users className="h-5 w-5 text-sky-600" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">{guide.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{guide.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{guide.size}</span>
                          <Download className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* اطلاعات تماس */}
              <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl border border-sky-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">نیاز به کمک دارید؟</h3>
                    <p className="text-sm text-gray-600">با ما در تماس باشید</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">تلفن پشتیبانی</p>
                      <a
                        href={`tel:${CONTACT_INFO.supportPhone.replace(/-/g, '')}`}
                        className="font-medium text-gray-800 hover:text-sky-600"
                      >
                        {CONTACT_INFO.supportPhone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ایمیل پشتیبانی</p>
                      <a
                        href={`mailto:${CONTACT_INFO.supportEmail}`}
                        className="font-medium text-gray-800 hover:text-sky-600"
                      >
                        {CONTACT_INFO.supportEmail}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ساعات پاسخگویی</p>
                      <p className="font-medium text-gray-800">{CONTACT_INFO.supportHours}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="w-full mt-6 bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>ارسال پیام به پشتیبانی</span>
                </button>
              </div>
            </div>
          </div>

          {/* ویژگی‌های پشتیبانی */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">چرا از پشتیبانی ما راضی هستید؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {HELP_INFO.supportFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      backgroundColor: index === 0 ? '#d1fae5' : 
                                     index === 1 ? '#dbeafe' : 
                                     index === 2 ? '#f3e8ff' : '#fef3c7',
                      color: index === 0 ? '#059669' : 
                            index === 1 ? '#2563eb' : 
                            index === 2 ? '#7c3aed' : '#d97706'
                    }}
                  >
                    {index === 0 && <Clock className="h-6 w-6" />}
                    {index === 1 && <Shield className="h-6 w-6" />}
                    {index === 2 && <CheckCircle className="h-6 w-6" />}
                    {index === 3 && <Star className="h-6 w-6" />}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}