'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  User,
  Mail as MailIcon,
  PhoneCall,
  Map,
  Building,
  Globe,
  Shield,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { 
  CONTACT_INFO, 
  DEPARTMENT_INFO, 
  RESOURCE_INFO 
} from '@/data/constants';

const contactMethods = [
  {
    title: 'تلفن تماس',
    description: 'برای مشاوره فوری',
    value: CONTACT_INFO.supportPhone,
    icon: <Phone className="h-6 w-6" />,
    color: 'bg-sky-100 text-sky-600',
    action: 'tel',
    hours: CONTACT_INFO.supportHours
  },
  {
    title: 'پست الکترونیکی',
    description: 'برای پیام‌های رسمی',
    value: CONTACT_INFO.supportEmail,
    icon: <Mail className="h-6 w-6" />,
    color: 'bg-sky-100 text-sky-600',
    action: 'mailto'
  },
  {
    title: 'آدرس مرکز',
    description: 'دفتر مرکزی تهران',
    value: CONTACT_INFO.address,
    icon: <MapPin className="h-6 w-6" />,
    color: 'bg-sky-100 text-sky-600',
    action: 'map'
  }
];

const departments = [
  DEPARTMENT_INFO.technical,
  DEPARTMENT_INFO.counseling,
  DEPARTMENT_INFO.partnership
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: DEPARTMENT_INFO.technical.name
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('لطفا فیلدهای ضروری را تکمیل کنید');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // شبیه‌سازی ارسال فرم
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('فرم ارسال شد:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: DEPARTMENT_INFO.technical.name
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('خطا در ارسال پیام. لطفا مجددا تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactMethodClick = (method: typeof contactMethods[0]) => {
    switch (method.action) {
      case 'tel':
        window.open(`tel:${method.value.replace(/-/g, '')}`);
        break;
      case 'mailto':
        window.open(`mailto:${method.value}`);
        break;
      case 'map':
        window.open('https://maps.google.com/?q=' + encodeURIComponent(method.value));
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        {/* هیرو */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <MessageSquare className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-bold mb-4">تماس با ما</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                ما اینجا هستیم تا به سوالات شما پاسخ دهیم و راهنمایی‌های لازم را ارائه کنیم.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* روش‌های تماس */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">روش‌های ارتباطی</h2>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <button
                      key={index}
                      onClick={() => handleContactMethodClick(method)}
                      className="w-full p-4 bg-gray-50 hover:bg-sky-50 rounded-xl border border-gray-200 hover:border-sky-300 transition-all text-right flex items-start space-x-4 group"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${method.color}`}>
                        {method.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-800">{method.title}</h3>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-sky-600" />
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{method.description}</p>
                        <p className="font-medium text-gray-800">{method.value}</p>
                        {method.hours && (
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{method.hours}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4">ساعات کاری</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">شنبه تا چهارشنبه</span>
                      <span className="font-medium">{CONTACT_INFO.workingHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">پنجشنبه</span>
                      <span className="font-medium">{CONTACT_INFO.workingHours.thursday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">جمعه</span>
                      <span className="font-medium">{CONTACT_INFO.workingHours.friday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* دپارتمان‌ها */}
              <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-2xl border border-sky-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">دپارتمان‌های تخصصی</h3>
                
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <h4 className="font-bold text-gray-800 mb-2">{dept.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <PhoneCall className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{dept.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MailIcon className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{dept.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* فرم تماس */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">پیام خود را ارسال کنید</h2>
                  <p className="text-gray-600">
                    فرم زیر را تکمیل کنید و ما در اسرع وقت با شما تماس خواهیم گرفت.
                  </p>
                </div>

                {submitSuccess && (
                  <div className="bg-blue-50 border border-green-200 text-sky-700 px-4 py-3 rounded-lg mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">پیام شما با موفقیت ارسال شد</p>
                        <p className="text-sm mt-1">کارشناسان ما به زودی با شما تماس خواهند گرفت.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">خطا در ارسال پیام</p>
                        <p className="text-sm mt-1">{submitError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-red-500">*</span> نام و نام خانوادگی
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                          placeholder="نام کامل خود را وارد کنید"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-red-500">*</span> آدرس ایمیل
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <MailIcon className="h-5 w-5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره تماس
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Phone className="h-5 w-5" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        موضوع
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                        placeholder="موضوع پیام خود را وارد کنید"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      دپارتمان مربوطه
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                    >
                      {departments.map((dept, index) => (
                        <option key={index} value={dept.name}>{dept.name}</option>
                      ))}
                      <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-500">*</span> متن پیام
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition resize-none"
                      placeholder="پیام خود را با جزئیات بنویسید..."
                      required
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-2">
                      حداکثر ۱۰۰۰ کاراکتر. تعداد کاراکترهای نوشته شده: {formData.message.length}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded mr-2"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-700">
                        با <a href="/privacy" className="text-sky-600 hover:text-sky-800">حریم خصوصی</a> و 
                        <a href="/terms" className="text-sky-600 hover:text-sky-800"> شرایط استفاده</a> موافقم.
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-6 rounded-lg font-bold hover:from-sky-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -mr-2 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        در حال ارسال...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2" />
                        ارسال پیام
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* نقشه و اطلاعات تکمیلی */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* نقشه */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-100 rounded-lg flex items-center justify-center">
                    <Map className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">موقعیت مکانی</h3>
                    <p className="text-sm text-gray-600">دفتر مرکزی تهران</p>
                  </div>
                </div>
              </div>
              
              <div className="h-96 bg-gray-100 relative">
                {/* شبیه‌سازی نقشه */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">دانشگاه تهران</h4>
                    <p className="text-gray-600">تهران، دانشکده روانشناسی</p>
                    <button
                      onClick={() => window.open('https://maps.google.com/?q=' + encodeURIComponent(CONTACT_INFO.address), '_blank')}
                      className="mt-4 bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>مشاهده در نقشه</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <span>ساختمان دانشکده روانشناسی، طبقه سوم</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>شنبه تا چهارشنبه {CONTACT_INFO.workingHours.weekdays}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{CONTACT_INFO.supportPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* سوالات متداول تماس */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">سوالات متداول</h3>
                  <p className="text-sm text-gray-600">پاسخ‌های سریع به سوالات رایج</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {RESOURCE_INFO.faqContacts.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">اطلاعات شما محرمانه است</p>
                      <p className="text-sm text-gray-600">ما از حریم خصوصی شما محافظت می‌کنیم</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => window.location.href = '/help'}
                    className="text-sky-600 hover:text-sky-800 flex items-center space-x-2"
                  >
                    <span>راهنمای بیشتر</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-2xl border border-sky-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ما را در شبکه‌های اجتماعی دنبال کنید</h2>
              <p className="text-gray-600">آخرین اخبار، مقالات و رویدادها</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
                {([
                    ['telegram', CONTACT_INFO.socialMedia.telegram],
                    ['instagram', CONTACT_INFO.socialMedia.instagram],
                    ['linkedin', CONTACT_INFO.socialMedia.linkedin],
                    ['aparat', CONTACT_INFO.socialMedia.aparat],
                    ['rubika', CONTACT_INFO.socialMedia.rubika]
                ] as const).map(([platform, url], index) => {
                    const platformConfigs = {
                    telegram: { name: 'تلگرام', color: 'bg-sky-500', icon: '📱' },
                    instagram: { name: 'اینستاگرام', color: 'bg-pink-600', icon: '📸' },
                    linkedin: { name: 'لینکدین', color: 'bg-sky-700', icon: '💼' },
                    aparat: { name: 'آپارات', color: 'bg-red-600', icon: '🎥' },
                    rubika: { name: 'روبیکا', color: 'bg-sky-600', icon: '💬' }
                    };
                    
                    const platformInfo = platformConfigs[platform];
                    
                return (
                  <a
                    key={index}
                    href={url}
                    className="flex flex-col items-center group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={`w-16 h-16 ${platformInfo.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                      {platformInfo.icon}
                    </div>
                    <span className="font-medium text-gray-800">{platformInfo.name}</span>
                  </a>
                );
              })}
            </div>
            
            <div className="text-center mt-8 pt-8 border-t border-sky-200">
              <p className="text-gray-600 mb-4">برای دریافت آخرین مطالب و مقالات تخصصی</p>
              <div className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
                <button className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors">
                  عضویت
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}