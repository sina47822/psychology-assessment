'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionPage from '@/components/QuestionPage';
import ProgressBar from '@/components/ProgressBar';
import SummaryScreen from '@/components/SummaryScreen';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { UserAnswers, SelectionRules } from '@/types/types';
import { selectionRules } from '@/data/welcomeData';
import category1 from '@/data/category1.json';
import category2 from '@/data/category2.json';
import category3 from '@/data/category3.json';
import category4 from '@/data/category4.json';
import category5 from '@/data/category5.json';
import category6 from '@/data/category6.json';
import category7 from '@/data/category7.json';
import category8 from '@/data/category8.json';

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
  });

  // ایجاد دسته‌ها با نام پویا از JSON
  const categories = [
    { 
      id: 1, 
      title: category1[0]?.categoryTitle || "سبک زندگی", 
      questions: category1,
      minSelection: selectionRules.minPerCategory,
      maxSelection: selectionRules.maxPerCategory
    },
    { 
      id: 2, 
      title: category2[0]?.categoryTitle || "نظم و انضباط", 
      questions: category2,
      minSelection: selectionRules.minPerCategory,
      maxSelection: Math.min(selectionRules.maxPerCategory, category2.length)
    },
    { 
      id: 3, 
      title: category3[0]?.categoryTitle || "رابطه با خانواده", 
      questions: category3,
      minSelection: selectionRules.minPerCategory,
      maxSelection: selectionRules.maxPerCategory
    },
    { 
      id: 4, 
      title: category4[0]?.categoryTitle || "رابطه با دوستان", 
      questions: category4,
      minSelection: selectionRules.minPerCategory,
      maxSelection: selectionRules.maxPerCategory
    },
    { 
      id: 5, 
      title: category5[0]?.categoryTitle || "تفریحات ناسالم", 
      questions: category5,
      minSelection: selectionRules.minPerCategory,
      maxSelection: Math.min(selectionRules.maxPerCategory, category5.length)
    },
    { 
      id: 6, 
      title: category6[0]?.categoryTitle || "فناوری و رسانه", 
      questions: category6,
      minSelection: selectionRules.minPerCategory,
      maxSelection: selectionRules.maxPerCategory
    },
    { 
      id: 7, 
      title: category7[0]?.categoryTitle || "مدیریت شخصی", 
      questions: category7,
      minSelection: selectionRules.minPerCategory,
      maxSelection: selectionRules.maxPerCategory
    },
    { 
      id: 8, 
      title: category8[0]?.categoryTitle || "مسائل تحصیلی", 
      questions: category8,
      minSelection: selectionRules.minPerCategory,
      maxSelection: Math.min(selectionRules.maxPerCategory, category8.length)
    }
  ];

  // ذخیره در localStorage برای حفظ وضعیت
  useEffect(() => {
    const saved = localStorage.getItem('psychologyAssessmentAnswers');
    if (saved) {
      setUserAnswers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('psychologyAssessmentAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  const handleAnswerChange = (categoryId: number, questionId: number, isChecked: boolean) => {
    setUserAnswers(prev => {
      const categoryAnswers = [...prev[categoryId]];
      const category = categories.find(c => c.id === categoryId);
      
      // بررسی محدودیت حداکثر
      if (isChecked && categoryAnswers.length >= (category?.maxSelection || 5)) {
        return prev;
      }
      
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

  // بررسی اعتبار هر دسته
  const getCategoryValidation = (categoryId: number) => {
    const selectedCount = userAnswers[categoryId]?.length || 0;
    const category = categories.find(c => c.id === categoryId);
    
    return {
      isValid: selectedCount >= (category?.minSelection || 3) && selectedCount <= (category?.maxSelection || 5),
      selectedCount,
      min: category?.minSelection || 3,
      max: category?.maxSelection || 5
    };
  };

  // بررسی اعتبار کل فرم
  const isFormValid = () => {
    let totalSelected = 0;
    
    for (const category of categories) {
      const selectedCount = userAnswers[category.id]?.length || 0;
      totalSelected += selectedCount;
      
      // بررسی هر دسته
      if (selectedCount < category.minSelection || selectedCount > category.maxSelection) {
        return false;
      }
    }
    
    // بررسی کل موارد انتخاب شده
    if (totalSelected < selectionRules.minTotal || totalSelected > selectionRules.maxTotal) {
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (step < categories.length + 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleStart = () => {
    setStep(1);
  };

  const handleReset = () => {
    setStep(0);
    setUserAnswers({
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
    });
    localStorage.removeItem('psychologyAssessmentAnswers');
  };

  const handleSubmitToBackend = async () => {
    console.log('پاسخ‌های کاربر برای ارسال:', userAnswers);
    
    try {
      // شبیه‌سازی ارسال
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('پاسخ‌های شما با موفقیت ثبت شد. نتایج تحلیلی به زودی ارائه خواهد شد.');
      setStep(categories.length + 2);
    } catch (error) {
      console.error('خطا در ارسال:', error);
      alert('خطا در ثبت پاسخ‌ها. لطفاً مجدداً تلاش کنید.');
    }
  };

  // محاسبه کل گزینه‌های انتخاب شده
  const totalSelected = Object.values(userAnswers).flat().length;
  
  // بررسی اینکه آیا فرم معتبر است
  const formValid = isFormValid();

  // برای نمایش صفحه خلاصه بعد از صفحه آخر
  const totalSteps = categories.length + 2;

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            سامانه ارزیابی رفتاری نوجوانان
          </h1>
          <p className="text-gray-600">
            شناخت چالش‌ها، قدم اول برای بهبود است
          </p>
        </header>

        <ProgressBar currentStep={step} totalSteps={totalSteps} />

        <div className="card mt-6 min-h-[500px]">
          {step === 0 && <WelcomeScreen onStart={handleStart} />}
          
          {step > 0 && step <= categories.length && (
            <QuestionPage
              category={categories[step - 1]}
              answers={userAnswers[categories[step - 1].id] || []}
              onAnswerChange={handleAnswerChange}
              step={step}
              totalSteps={categories.length}
              onNext={handleNext}
              onPrev={handlePrev}
              categoryValidation={getCategoryValidation(categories[step - 1].id)}
            />
          )}
          
          {step === categories.length + 1 && (
            <SummaryScreen
              categories={categories}
              userAnswers={userAnswers}
              onReset={handleReset}
              onPrev={() => setStep(categories.length)}
              onSubmit={handleSubmitToBackend}
              totalSelected={totalSelected}
              isFormValid={formValid}
              selectionRules={selectionRules}
            />
          )}
          
          {step === categories.length + 2 && (
            <ConfirmationScreen
              userAnswers={userAnswers}
              totalSelected={totalSelected}
              onReset={handleReset}
            />
          )}
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>تمامی اطلاعات شما محرمانه باقی خواهد ماند و فقط برای ارائه خدمات مشاوره‌ای استفاده می‌شود.</p>
          <p className="mt-1">ورژن ۱.۰.۰ | آخرین بروزرسانی: ۱۴۰۳/۰۱/۱۵</p>
        </footer>
      </div>
    </main>
  );
}