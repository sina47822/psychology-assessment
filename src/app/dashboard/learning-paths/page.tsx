// src/app/dashboard/learning-paths/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Clock, Users, Target, Lock, Unlock, Star, TrendingUp, 
  Award, ChevronLeft, ChevronRight, Filter, Search 
} from 'lucide-react';

// داده‌های تستی مسیرها
const LEARNING_PATHS = [
  {
    id: 'communication',
    title: 'ارتباط مؤثر با نوجوان',
    description: 'یادگیری مهارت‌های ارتباطی برای ایجاد رابطه صمیمی و مؤثر با نوجوان',
    category: 'communication',
    duration: 4,
    difficulty: 'beginner',
    enrolledCount: 245,
    progress: 75,
    isActive: true,
    isEnrolled: true,
    coverImage: '/paths/communication.jpg',
    learningObjectives: [
      'یادگیری گوش دادن فعال',
      'مهارت گفتگوی مؤثر',
      'کنترل خشم در ارتباط',
      'ایجاد فضای امن برای گفتگو'
    ],
    pointsReward: 500,
    prerequisites: [],
    tags: ['ارتباطات', 'گفتگو', 'خانواده']
  },
  {
    id: 'emotion-management',
    title: 'مدیریت هیجانات نوجوان',
    description: 'شناخت و مدیریت هیجانات در دوره نوجوانی، کنترل خشم و اضطراب',
    category: 'emotion',
    duration: 4,
    difficulty: 'intermediate',
    enrolledCount: 189,
    progress: 25,
    isActive: true,
    isEnrolled: true,
    coverImage: '/paths/emotion.jpg',
    learningObjectives: [
      'شناخت هیجانات نوجوان',
      'راهکارهای کنترل خشم',
      'مدیریت اضطراب',
      'تقویت هوش هیجانی'
    ],
    pointsReward: 600,
    prerequisites: ['communication'],
    tags: ['هیجانات', 'کنترل خشم', 'اضطراب']
  },
  {
    id: 'discipline',
    title: 'تربیت مسئولیت‌پذیر',
    description: 'ایجاد قوانین مؤثر، تشویق و تنبیه مناسب برای تربیت نوجوان مسئول',
    category: 'discipline',
    duration: 6,
    difficulty: 'advanced',
    enrolledCount: 156,
    progress: 0,
    isActive: false,
    isEnrolled: false,
    coverImage: '/paths/discipline.jpg',
    learningObjectives: [
      'ایجاد قوانین مؤثر',
      'تشویق و تنبیه مناسب',
      'تقویت مسئولیت‌پذیری',
      'مدیریت انتظارات'
    ],
    pointsReward: 800,
    prerequisites: ['communication', 'emotion-management'],
    tags: ['تربیت', 'مسئولیت', 'قوانین']
  },
  {
    id: 'academic-motivation',
    title: 'انگیزه‌بخشی تحصیلی',
    description: 'راهکارهای افزایش انگیزه، مدیریت زمان و پیشرفت تحصیلی نوجوان',
    category: 'academic',
    duration: 4,
    difficulty: 'beginner',
    enrolledCount: 198,
    progress: 0,
    isActive: true,
    isEnrolled: false,
    coverImage: '/paths/academic.jpg',
    learningObjectives: [
      'ایجاد انگیزه تحصیلی',
      'مدیریت زمان',
      'راهکارهای مطالعه مؤثر',
      'همراهی در امتحانات'
    ],
    pointsReward: 550,
    prerequisites: [],
    tags: ['تحصیل', 'انگیزه', 'مطالعه']
  },
  {
    id: 'technology-management',
    title: 'مدیریت فضای مجازی',
    description: 'آموزش استفاده صحیح از تکنولوژی، شبکه‌های اجتماعی و پیشگیری از اعتیاد دیجیتال',
    category: 'technology',
    duration: 4,
    difficulty: 'intermediate',
    enrolledCount: 167,
    progress: 0,
    isActive: false,
    isEnrolled: false,
    coverImage: '/paths/technology.jpg',
    learningObjectives: [
      'مدیریت زمان استفاده از موبایل',
      'شناخت خطرات فضای مجازی',
      'ایجاد قوانین استفاده',
      'آموزش استفاده مفید'
    ],
    pointsReward: 600,
    prerequisites: ['communication'],
    tags: ['تکنولوژی', 'فضای مجازی', 'موبایل']
  },
  {
    id: 'career-guidance',
    title: 'هدایت شغلی و آینده',
    description: 'کشف استعدادها، هدایت تحصیلی-شغلی و برنامه‌ریزی برای آینده نوجوان',
    category: 'career',
    duration: 4,
    difficulty: 'advanced',
    enrolledCount: 145,
    progress: 0,
    isActive: true,
    isEnrolled: false,
    coverImage: '/paths/career.jpg',
    learningObjectives: [
      'کشف استعدادها',
      'هدایت تحصیلی',
      'برنامه‌ریزی شغلی',
      'مشاوره آینده نگری'
    ],
    pointsReward: 700,
    prerequisites: ['communication'],
    tags: ['شغل', 'آینده', 'هدایت']
  }
];

const CATEGORIES = [
  { id: 'all', name: 'همه مسیرها', icon: '📚', count: 6 },
  { id: 'communication', name: 'ارتباطات', icon: '💬', count: 2 },
  { id: 'emotion', name: 'هیجانات', icon: '😊', count: 1 },
  { id: 'discipline', name: 'تربیت', icon: '👨‍👩‍👧‍👦', count: 1 },
  { id: 'academic', name: 'تحصیلی', icon: '🎓', count: 1 },
  { id: 'technology', name: 'تکنولوژی', icon: '📱', count: 1 },
  { id: 'career', name: 'شغلی', icon: '💼', count: 1 }
];

const DIFFICULTY_LEVELS = [
  { id: 'all', name: 'همه سطوح' },
  { id: 'beginner', name: 'مقدماتی', color: 'bg-sky-100 text-sky-800' },
  { id: 'intermediate', name: 'متوسط', color: 'bg-blue-100 text-blue-800' },
  { id: 'advanced', name: 'پیشرفته', color: 'bg-sky-100 text-sky-800' }
];

export default function LearningPathsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // فیلتر کردن مسیرها
  const filteredPaths = LEARNING_PATHS.filter(path => {
    // فیلتر دسته‌بندی
    if (selectedCategory !== 'all' && path.category !== selectedCategory) {
      return false;
    }
    
    // فیلتر سطح دشواری
    if (selectedDifficulty !== 'all' && path.difficulty !== selectedDifficulty) {
      return false;
    }
    
    // فیلتر جستجو
    if (searchQuery && !path.title.includes(searchQuery) && !path.description.includes(searchQuery)) {
      return false;
    }
    
    return true;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { text: 'مقدماتی', color: 'bg-sky-100 text-sky-800' };
      case 'intermediate':
        return { text: 'متوسط', color: 'bg-blue-100 text-blue-800' };
      case 'advanced':
        return { text: 'پیشرفته', color: 'bg-sky-100 text-sky-800' };
      default:
        return { text: 'نامشخص', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryObj = CATEGORIES.find(c => c.id === category);
    return categoryObj?.icon || '📚';
  };

  return (
    <div className="space-y-8">
      {/* هدر */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              مسیرهای آموزشی تخصصی
            </h1>
            <p className="text-sky-100 text-lg max-w-3xl">
              مسیرهای مرحله‌ای و برنامه‌ریزی شده برای تبدیل شدن به والدینی توانمند و آگاه
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                <Users className="h-5 w-5" />
                <span>۱۱۰۰+ والد همراه</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                <Award className="h-5 w-5" />
                <span>۹۴٪ رضایت کاربران</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                <TrendingUp className="h-5 w-5" />
                <span>۸۵٪ پیشرفت قابل‌اندازه‌گیری</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">۶+</div>
              <div className="text-sm">مسیر تخصصی</div>
            </div>
          </div>
        </div>
      </div>

      {/* فیلترها و جستجو */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-800">فیلتر مسیرها</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجوی مسیر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-6 h-6">
                  <div className="bg-gray-600 rounded"></div>
                  <div className="bg-gray-600 rounded"></div>
                  <div className="bg-gray-600 rounded"></div>
                  <div className="bg-gray-600 rounded"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              >
                <div className="space-y-1 w-6 h-6">
                  <div className="h-1 bg-gray-600 rounded"></div>
                  <div className="h-1 bg-gray-600 rounded"></div>
                  <div className="h-1 bg-gray-600 rounded"></div>
                  <div className="h-1 bg-gray-600 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">دسته‌بندی</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* سطح دشواری */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">سطح دشواری</h3>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedDifficulty === level.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* نمایش مسیرها */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {filteredPaths.length} مسیر یافت شد
          </h2>
          <div className="text-sm text-gray-600">
            مرتب‌سازی:
            <select className="mr-2 border-none bg-transparent focus:ring-0">
              <option>محبوب‌ترین</option>
              <option>جدیدترین</option>
              <option>ساده‌ترین</option>
              <option>کوتاه‌ترین</option>
            </select>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map(path => (
              <PathCard key={path.id} path={path} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPaths.map(path => (
              <PathCard key={path.id} path={path} viewMode="list" />
            ))}
          </div>
        )}
      </div>

      {/* راهنمای انتخاب */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          چگونه مسیر مناسب را انتخاب کنم؟
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">نیاز خود را مشخص کنید</h3>
            <p className="text-gray-600 text-sm">
              ابتدا بزرگترین چالش خود در ارتباط با نوجوان را شناسایی کنید
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">از پایه شروع کنید</h3>
            <p className="text-gray-600 text-sm">
              مسیرهای مقدماتی را ابتدا بگذرانید، سپس به سراغ سطوح بالاتر بروید
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">تداوم داشته باشید</h3>
            <p className="text-gray-600 text-sm">
              مهمترین عامل موفقیت، تداوم در تمرین‌های روزانه است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// کامپوننت کارت مسیر
function PathCard({ path, viewMode }: { path: any; viewMode: 'grid' | 'list' }) {
  const difficulty = getDifficultyBadge(path.difficulty);
  
  if (viewMode === 'grid') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
        path.isActive ? 'border-transparent hover:border-sky-200' : 'border-gray-200 opacity-75'
      }`}>
        {/* هدر */}
        <div className="relative h-48 bg-gradient-to-r from-sky-500 to-sky-600">
          {!path.isActive && (
            <div className="absolute inset-0 bg-sky-500/50 flex items-center justify-center">
              <Lock className="h-12 w-12 text-white" />
            </div>
          )}
          
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficulty.color}`}>
              {difficulty.text}
            </span>
          </div>
          
          <div className="absolute top-4 left-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {path.duration} هفته
            </span>
          </div>
          
          <div className="absolute bottom-4 right-4">
            <span className="text-4xl">{getCategoryIcon(path.category)}</span>
          </div>
        </div>

        {/* محتوا */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800">{path.title}</h3>
            {path.isEnrolled && (
              <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded">
                ثبت‌نام شده
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-4">{path.description}</p>
          
          {/* اهداف یادگیری */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">اهداف یادگیری:</h4>
            <ul className="space-y-1">
              {path.learningObjectives.slice(0, 3).map((obj: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                  <span className="truncate">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* آمار */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{path.enrolledCount} نفر</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{path.pointsReward} امتیاز</span>
            </div>
          </div>
          
          {/* پیشرفت */}
          {path.isEnrolled && path.progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>پیشرفت شما</span>
                <span>{path.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* دکمه‌ها */}
          <div className="flex gap-2">
            <Link
              href={`/dashboard/learning-paths/${path.id}`}
              className="flex-1 text-center bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {path.isEnrolled ? 'ادامه یادگیری' : 'مشاهده جزئیات'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // حالت لیست
  return (
    <div className={`bg-white rounded-xl shadow border-2 p-6 ${
      path.isActive ? 'border-transparent' : 'border-gray-200 opacity-75'
    }`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* تصویر */}
        <div className="md:w-1/4">
          <div className="relative h-48 md:h-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600">
            {!path.isActive && (
              <div className="absolute inset-0 bg-sky-500/50 flex items-center justify-center rounded-xl">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${difficulty.color}`}>
                {difficulty.text}
              </span>
            </div>
          </div>
        </div>
        
        {/* محتوا */}
        <div className="md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{path.title}</h3>
              <p className="text-gray-600">{path.description}</p>
            </div>
            
            <div className="mt-2 md:mt-0">
              {path.isEnrolled ? (
                <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
                  <Star className="h-4 w-4" />
                  ثبت‌نام شده
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <Clock className="h-4 w-4" />
                  {path.duration} هفته
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">سطح</div>
              <div className={`font-medium ${difficulty.color.includes('green') ? 'text-sky-700' : difficulty.color.includes('blue') ? 'text-blue-700' : 'text-sky-700'}`}>
                {difficulty.text}
              </div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">مدت زمان</div>
              <div className="font-medium text-gray-800">{path.duration} هفته</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">شرکت‌کنندگان</div>
              <div className="font-medium text-gray-800">{path.enrolledCount} نفر</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">امتیاز</div>
              <div className="font-medium text-gray-800 flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {path.pointsReward}
              </div>
            </div>
          </div>
          
          {/* پیشرفت */}
          {path.isEnrolled && path.progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>پیشرفت شما</span>
                <span>{path.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {path.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <Link
              href={`/dashboard/learning-paths/${path.id}`}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {path.isEnrolled ? 'ادامه یادگیری →' : 'شروع مسیر →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// تابع کمکی برای دریافت رنگ سطح دشواری
function getDifficultyBadge(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return { text: 'مقدماتی', color: 'bg-sky-100 text-sky-800' };
    case 'intermediate':
      return { text: 'متوسط', color: 'bg-blue-100 text-blue-800' };
    case 'advanced':
      return { text: 'پیشرفته', color: 'bg-sky-100 text-sky-800' };
    default:
      return { text: 'نامشخص', color: 'bg-gray-100 text-gray-800' };
  }
}

// تابع کمکی برای دریافت آیکون دسته‌بندی
function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    'communication': '💬',
    'emotion': '😊',
    'discipline': '👨‍👩‍👧‍👦',
    'academic': '🎓',
    'technology': '📱',
    'career': '💼'
  };
  return icons[category] || '📚';
}