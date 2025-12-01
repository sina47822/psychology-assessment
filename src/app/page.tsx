'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import DemographicsScreen from '@/components/DemographicsScreen';
import QuestionPage from '@/components/QuestionPage';
import ProgressBar from '@/components/ProgressBar';
import SummaryScreen from '@/components/SummaryScreen';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { UserAnswers, DemographicsData } from '@/types/types';
import { selectionRules } from '@/data/welcomeData';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { scrollToTop } from '@/lib/utils';
import category1 from '@/data/category1.json';
import category2 from '@/data/category2.json';
import category3 from '@/data/category3.json';
import category4 from '@/data/category4.json';
import category5 from '@/data/category5.json';
import category6 from '@/data/category6.json';
import category7 from '@/data/category7.json';
import category8 from '@/data/category8.json';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [step, setStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
  });
  
  const [demographics, setDemographics] = useState<DemographicsData>({
    livingWith: '',
    fatherLiving: false,
    fatherAge: '',
    fatherEducation: '',
    fatherOccupation: '',
    motherLiving: false,
    motherAge: '',
    motherEducation: '',
    motherOccupation: '',
    province: '',
    city: '',
    maritalStatus: ''
  });

  // هدایت به لاگین اگر کاربر لاگین نکرده
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // بارگذاری دسته‌ها از JSON
  const categories = [
    { ...category1, id: 1 },
    { ...category2, id: 2 },
    { ...category3, id: 3 },
    { ...category4, id: 4 },
    { ...category5, id: 5 },
    { ...category6, id: 6 },
    { ...category7, id: 7 },
    { ...category8, id: 8 }
  ];

  // ذخیره در localStorage برای حفظ وضعیت
  useEffect(() => {
    if (!user) return;
    
    const savedAnswers = localStorage.getItem(`assessment-answers-${user.id}`);
    const savedDemographics = localStorage.getItem(`assessment-demographics-${user.id}`);
    
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
    if (savedDemographics) {
      const parsed = JSON.parse(savedDemographics);
      setDemographics(parsed);
      
      const fatherLiving = parsed.livingWith?.includes('پدر') || false;
      const motherLiving = parsed.livingWith?.includes('مادر') || false;
      
      setDemographics(prev => ({
        ...prev,
        fatherLiving,
        motherLiving
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`assessment-answers-${user.id}`, JSON.stringify(userAnswers));
  }, [userAnswers, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`assessment-demographics-${user.id}`, JSON.stringify(demographics));
  }, [demographics, user]);

  const handleAnswerChange = (categoryId: number, questionId: number, isChecked: boolean) => {
    setUserAnswers(prev => {
      const categoryAnswers = [...prev[categoryId]];
      
      if (isChecked) {
        if (!categoryAnswers.includes(questionId)) {
          return { ...prev, [categoryId]: [...categoryAnswers, questionId] };
        }
      } else {
        return { ...prev, [categoryId]: categoryAnswers.filter(id => id !== questionId) };
      }
      
      return prev;
    });
  };

  const handleDemographicsChange = (field: keyof DemographicsData, value: string) => {
    setDemographics(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === 'livingWith') {
        const fatherLiving = value.includes('پدر');
        const motherLiving = value.includes('مادر');
        
        return {
          ...newData,
          fatherLiving,
          motherLiving,
          ...(!fatherLiving && {
            fatherAge: '',
            fatherEducation: '',
            fatherOccupation: ''
          }),
          ...(!motherLiving && {
            motherAge: '',
            motherEducation: '',
            motherOccupation: ''
          })
        };
      }
      
      return newData;
    });
  };

  // بررسی اعتبار فرم دموگرافیک
  const isDemographicsValid = () => {
    const baseFieldsValid = demographics.livingWith && demographics.province && demographics.city && demographics.maritalStatus;
    
    if (!baseFieldsValid) return false;
    
    if (demographics.fatherLiving) {
      if (!demographics.fatherAge || !demographics.fatherEducation || !demographics.fatherOccupation) {
        return false;
      }
    }
    
    if (demographics.motherLiving) {
      if (!demographics.motherAge || !demographics.motherEducation || !demographics.motherOccupation) {
        return false;
      }
    }
    
    return true;
  };

  // محاسبه کل گزینه‌های انتخاب شده
  const totalSelected = Object.values(userAnswers).flat().length;
  
  // بررسی اعتبار کل فرم
  const isFormValid = () => {
    return totalSelected >= selectionRules.minTotal && totalSelected <= selectionRules.maxTotal;
  };

  const handleNext = () => {
    if (step < categories.length + 2) {
      setStep(step + 1);
      scrollToTop(); // اسکرول به بالای صفحه
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      scrollToTop(); // اسکرول به بالای صفحه
    }
  };

  const handleStart = () => {
    setStep(1);
    scrollToTop(); // اسکرول به بالای صفحه
  };

  const handleReset = () => {
    setStep(0);
    setUserAnswers({
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
    });
    setDemographics({
      livingWith: '',
      fatherLiving: false,
      fatherAge: '',
      fatherEducation: '',
      fatherOccupation: '',
      motherLiving: false,
      motherAge: '',
      motherEducation: '',
      motherOccupation: '',
      province: '',
      city: '',
      maritalStatus: ''
    });
    
    if (user) {
      localStorage.removeItem(`assessment-answers-${user.id}`);
      localStorage.removeItem(`assessment-demographics-${user.id}`);
    }
  };

  const handleSubmitToBackend = async () => {
    if (!user) return;
    
    const submissionData = {
      userId: user.id,
      demographics,
      answers: userAnswers,
      totalSelected,
      timestamp: new Date().toISOString(),
      summary: {
        categories: categories.map(category => ({
          title: category.categoryTitle,
          selected: userAnswers[category.id]?.length || 0
        }))
      }
    };
    
    console.log('داده‌های ارسالی:', submissionData);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('پاسخ‌های شما با موفقیت ثبت شد. نتایج تحلیلی به زودی ارائه خواهد شد.');
      setStep(categories.length + 3);
      
      // ذخیره در localStorage
      localStorage.setItem(`assessment-completed-${user.id}`, JSON.stringify(submissionData));
    } catch (error) {
      console.error('خطا در ارسال:', error);
      alert('خطا در ثبت پاسخ‌ها. لطفاً مجدداً تلاش کنید.');
    }
  };

  // مراحل: 0=خوش‌آمدگویی, 1=دموگرافیک, 2-9=سوالات, 10=خلاصه, 11=تأیید
  const totalSteps = categories.length + 3;

  // نمایش صفحه loading در حال بررسی احراز هویت
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <p className="text-sm text-gray-600">خوش آمدید،</p>
              <p className="font-bold text-gray-800">{user?.fullName}</p>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              سامانه ارزیابی رفتاری نوجوانان
            </h1>
          </div>
          <p className="text-gray-600">
            شناخت چالش‌ها، قدم اول برای بهبود است
          </p>
        </header>

        <ProgressBar currentStep={step} totalSteps={categories.length + 3} />

        <div className="card mt-6 min-h-[500px]">
          {step === 0 && <WelcomeScreen onStart={handleStart} />}
          
          {step === 1 && (
            <DemographicsScreen
              demographics={demographics}
              onChange={handleDemographicsChange}
              onNext={handleNext}
              onPrev={handlePrev}
              isValid={isDemographicsValid()}
            />
          )}
          
          {step > 1 && step <= categories.length + 1 && (
            <QuestionPage
              category={categories[step - 2]}
              answers={userAnswers[categories[step - 2].id] || []}
              onAnswerChange={handleAnswerChange}
              step={step - 1}
              totalSteps={categories.length}
              onNext={handleNext}
              onPrev={handlePrev}
              totalSelected={totalSelected}
              selectionRules={selectionRules}
            />
          )}
          
          {step === categories.length + 2 && (
            <SummaryScreen
              categories={categories}
              userAnswers={userAnswers}
              demographics={demographics}
              onReset={handleReset}
              onPrev={() => {
                setStep(categories.length + 1);
                scrollToTop();
              }}
              onSubmit={handleSubmitToBackend}
              totalSelected={totalSelected}
              isFormValid={isFormValid()}
              selectionRules={selectionRules}
            />
          )}
          
          {step === categories.length + 3 && (
            <ConfirmationScreen
              demographics={demographics}
              userAnswers={userAnswers}
              totalSelected={totalSelected}
              onReset={handleReset}
            />
          )}
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>تمامی اطلاعات شما محرمانه باقی خواهد ماند و فقط برای ارائه خدمات مشاوره‌ای استفاده می‌شود.</p>
          <p className="mt-1">
            ورژن {APP_INFO.version} | آخرین بروزرسانی: {APP_INFO.lastUpdate} | 
            پشتیبانی: {CONTACT_INFO.supportPhone}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {CONTACT_INFO.organization} © {APP_INFO.currentYear}
          </p>
        </footer>
      </div>
    </main>
  );
}