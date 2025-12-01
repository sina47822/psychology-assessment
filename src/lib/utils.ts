// تابع برای اسکرول به بالای صفحه
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// تابع برای فرمت کردن تاریخ
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
};

// تابع برای فرمت کردن شماره موبایل
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
};

// تابع برای تشخیص نوع شناسه ورود
export const identifyLoginType = (identifier: string): 'email' | 'username' | 'phone' => {
  if (/^09\d{9}$/.test(identifier)) return 'phone';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) return 'email';
  return 'username';
};

// تابع برای ذخیره داده‌های ارزیابی
export const saveAssessmentData = (
  userId: string,
  demographics: any,
  answers: any,
  totalSelected: number
) => {
  const assessmentData = {
    demographics,
    answers,
    totalSelected,
    completedAt: new Date().toISOString()
  };
  
  localStorage.setItem(`assessment-${userId}`, JSON.stringify(assessmentData));
};

// تابع برای بارگذاری داده‌های ارزیابی
export const loadAssessmentData = (userId: string) => {
  const data = localStorage.getItem(`assessment-${userId}`);
  return data ? JSON.parse(data) : null;
};