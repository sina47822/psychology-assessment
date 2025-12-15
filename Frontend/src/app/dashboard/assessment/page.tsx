// src\app\dashboard\assessment\page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UserWelcomeCard from '@/components/layout/UserWelcomeCard';
import WelcomeScreen from '@/components/WelcomeScreen';
import DemographicsScreen from '@/components/DemographicsScreen';
import QuestionPage from '@/components/QuestionPage';
import ProgressBar from '@/components/ProgressBar';
import SummaryScreen from '@/components/SummaryScreen';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { UserAnswers, DemographicsData } from '@/types/types';
import { selectionRules } from '@/data/welcomeData';
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
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      scrollToTop();
    }
  };

  const handleStart = () => {
    setStep(1);
    scrollToTop();
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
      
      localStorage.setItem(`assessment-completed-${user.id}`, JSON.stringify(submissionData));
    } catch (error) {
      console.error('خطا در ارسال:', error);
      alert('خطا در ثبت پاسخ‌ها. لطفاً مجدداً تلاش کنید.');
    }
  };

  // نمایش صفحه loading در حال بررسی احراز هویت
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">

      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-sky-50">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <UserWelcomeCard 
            showStats={true}
            currentStep={step}
            totalSelected={totalSelected}
            selectionRules={selectionRules}
          />

          <ProgressBar currentStep={step} totalSteps={categories.length + 3} />

          <div className="bg-white rounded-2xl shadow-lg mt-6 p-6 border border-gray-200 min-h-[500px]">
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
        </div>
      </main>
    </div>
  );
}