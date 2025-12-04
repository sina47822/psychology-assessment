'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Users,
  Target,
  Award,
  Heart,
  Shield,
  BarChart,
  Lightbulb,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  Star,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { ABOUT_INFO, CONTACT_INFO, APP_INFO } from '@/data/constants';

const teamMembers = ABOUT_INFO.team.map((member, index) => ({
  ...member,
  image: `https://images.unsplash.com/photo-${index === 0 ? '1559839734' : index === 1 ? '1582750433449' : index === 2 ? '1507003211169' : '1494790108755'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
}));

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* هیرو */}
        <div className="relative bg-gradient-to-r from-sky-600 to-sky-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" 
                        fill="currentColor" fillOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8">
                <Users className="h-12 w-12" />
              </div>
              <h1 className="text-5xl font-bold mb-6">درباره ما</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                <span className="font-bold">{CONTACT_INFO.organization}</span> مجموعه‌ای متشکل از متخصصان روانشناسی، 
                مشاوران و توسعه‌دهندگان فناوری است که با هدف بهبود سلامت روان نوجوانان فعالیت می‌کند.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-bold">مأموریت ما:</span> {ABOUT_INFO.mission}
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-bold">چشم‌انداز ما:</span> {ABOUT_INFO.vision}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* دستاوردها */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {ABOUT_INFO.achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <Users className="h-6 w-6 text-sky-600" />}
                  {index === 1 && <Star className="h-6 w-6 text-yellow-600" />}
                  {index === 2 && <Clock className="h-6 w-6 text-sky-600" />}
                  {index === 3 && <Award className="h-6 w-6 text-sky-600" />}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{achievement.number}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>

          {/* داستان ما */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">داستان ما</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                آغاز این مسیر از مشاهده چالش‌های فراوان نوجوانان و خانواده‌های آنان شروع شد.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-sky-50 to-sky-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">چرا این سامانه را ایجاد کردیم؟</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {ABOUT_INFO.story}
                  </p>
                  <ul className="space-y-3">
                    {[
                      'دسترسی به خدمات ارزیابی را برای همه فراهم کند',
                      'بر اساس استانداردهای علمی و بین‌المللی طراحی شده باشد',
                      'حریم خصوصی کاربران را به طور کامل حفظ کند',
                      'نتایج قابل فهم و راهکارهای عملی ارائه دهد'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-sky-500 ml-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-sky-500 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-sky-600 rounded-xl flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">اهداف ما</h3>
                      <p className="text-gray-600">برنامه‌های آینده</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {ABOUT_INFO.goals.map((goal, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        <span className="text-gray-700">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ارزش‌های ما */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">ارزش‌های ما</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                این ارزش‌ها چراغ راه ما در ارائه خدمات به کاربران است
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ABOUT_INFO.values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-sky-300 transition-all text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Heart className="h-6 w-6 text-red-500" />}
                    {index === 1 && <Shield className="h-6 w-6 text-sky-600" />}
                    {index === 2 && <BarChart className="h-6 w-6 text-sky-600" />}
                    {index === 3 && <Lightbulb className="h-6 w-6 text-yellow-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* تیم ما */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">تیم متخصص ما</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                متخصصان با تجربه ما همواره همراه شما هستند
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                        <p className="text-sky-600 font-medium">{member.role}</p>
                      </div>
                      <div className="bg-sky-50 text-sky-600 text-xs px-2 py-1 rounded-full">
                        {member.experience} سابقه
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">تخصص: {member.specialty}</p>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        پروفایل
                      </button>
                      <button className="flex-1 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm">
                        پیام
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* نقاط عطف */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">نقاط عطف</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                مسیر پیشرفت و توسعه ما
              </p>
            </div>
            
            <div className="relative">
              {/* خط زمان */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-sky-500 to-sky-500 hidden md:block"></div>
              
              <div className="space-y-12 md:space-y-0">
                {ABOUT_INFO.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
                  >
                    <div className="flex flex-col md:flex-row items-center">
                      {index % 2 === 0 ? (
                        <>
                          <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                              <div className="text-sky-600 font-bold text-2xl mb-2">{milestone.year}</div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                              <p className="text-gray-600">{milestone.description}</p>
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div className="w-8 h-8 bg-sky-500 rounded-full border-4 border-white shadow-lg"></div>
                          </div>
                          <div className="md:w-1/2"></div>
                        </>
                      ) : (
                        <>
                          <div className="md:w-1/2"></div>
                          <div className="hidden md:block">
                            <div className="w-8 h-8 bg-sky-500 rounded-full border-4 border-white shadow-lg"></div>
                          </div>
                          <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                              <div className="text-sky-600 font-bold text-2xl mb-2">{milestone.year}</div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                              <p className="text-gray-600">{milestone.description}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* فراخوان اقدام */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-3xl p-12 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">به خانواده ما بپیوندید</h2>
              <p className="text-xl opacity-90 mb-8">
                همکاران، متخصصان و علاقه‌مندان حوزه سلامت روان نوجوانان
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/careers'}
                  className="bg-white text-sky-600 px-8 py-3 rounded-lg hover:bg-sky-50 transition-colors font-bold"
                >
                  فرصت‌های شغلی
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  همکاری با ما
                </button>
                <button
                  onClick={() => window.location.href = '/partnership'}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  مشارکت سازمانی
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