import { Category, Question } from '@/types/types';
import NavigationButtons from './NavigationButtons';
import { AlertCircle, Info } from 'lucide-react';

interface QuestionPageProps {
  category: Category;
  answers: number[];
  onAnswerChange: (categoryId: number, questionId: number, isChecked: boolean) => void;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  categoryValidation: {
    isValid: boolean;
    selectedCount: number;
    min: number;
    max: number;
  };
}

export default function QuestionPage({
  category,
  answers,
  onAnswerChange,
  step,
  totalSteps,
  onNext,
  onPrev,
  categoryValidation
}: QuestionPageProps) {

  const handleCheckboxClick = (questionId: number, isChecked: boolean) => {
    if (isChecked && answers.length >= category.maxSelection) {
      return; // جلوگیری از انتخاب بیشتر
    }
    onAnswerChange(category.id, questionId, isChecked);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 text-indigo-800 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              {step}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {category.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                دسته {step} از {totalSteps}
              </p>
            </div>
          </div>
          <div className="text-gray-500 hidden md:block">
            {category.questions.length} مورد
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium mb-1">راهنمایی انتخاب:</p>
              <p className="text-blue-700 text-sm">
                لطفاً بین <span className="font-bold">{category.minSelection}</span> تا <span className="font-bold">{category.maxSelection}</span> مورد از موارد زیر را انتخاب کنید.
                {answers.length < category.minSelection && (
                  <span className="block mt-1 text-red-600">
                    حداقل {category.minSelection - answers.length} مورد دیگر باید انتخاب کنید.
                  </span>
                )}
                {answers.length >= category.minSelection && answers.length < category.maxSelection && (
                  <span className="block mt-1 text-green-600">
                    ✓ می‌توانید تا {category.maxSelection - answers.length} مورد دیگر انتخاب کنید.
                  </span>
                )}
                {answers.length === category.maxSelection && (
                  <span className="block mt-1 text-amber-600">
                    ⚠️ شما حداکثر موارد را انتخاب کرده‌اید.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2">
        {category.questions.map((question: Question) => {
          const isChecked = answers.includes(question.id);
          const isDisabled = !isChecked && answers.length >= category.maxSelection;
          
          return (
            <div
              key={question.id}
              className={`flex items-start p-4 rounded-lg border transition-all duration-200 ${
                isChecked
                  ? 'border-indigo-300 bg-indigo-50'
                  : isDisabled
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 bg-white hover:shadow-md'
              }`}
            >
              <input
                type="checkbox"
                id={`question-${question.id}`}
                checked={isChecked}
                onChange={(e) => handleCheckboxClick(question.id, e.target.checked)}
                disabled={isDisabled}
                className={`checkbox-custom ml-3 mt-1 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <label
                htmlFor={`question-${question.id}`}
                className={`flex-1 text-gray-800 text-lg cursor-pointer select-none ${
                  isDisabled ? 'text-gray-400 cursor-not-allowed' : ''
                }`}
              >
                {question.text}
                {isDisabled && !isChecked && (
                  <span className="text-red-500 text-sm mr-2">(امکان انتخاب بیشتر نیست)</span>
                )}
              </label>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            <div>
              <p className="text-amber-800 font-medium">وضعیت انتخاب:</p>
              <p className="text-amber-700 text-sm">
                {answers.length} از {category.questions.length} مورد انتخاب شده است
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            categoryValidation.isValid 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {categoryValidation.isValid ? 'معتبر ✓' : 'نامعتبر ✗'}
          </div>
        </div>
        {!categoryValidation.isValid && (
          <p className="text-red-600 text-sm mt-2 pr-9">
            {answers.length < category.minSelection
              ? `حداقل ${category.minSelection} مورد باید انتخاب کنید. (${category.minSelection - answers.length} مورد باقی مانده)`
              : answers.length > category.maxSelection
              ? `حداکثر ${category.maxSelection} مورد می‌توانید انتخاب کنید.`
              : 'تعداد انتخاب‌ها نامعتبر است.'}
          </p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-gray-600 text-center md:text-right order-2 md:order-1">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span>انتخاب‌های این بخش:</span>
              <span className="font-bold text-indigo-700">
                {answers.length} / {category.maxSelection}
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto order-1 md:order-2">
            <NavigationButtons
              onPrev={onPrev}
              onNext={onNext}
              isFirst={step === 1}
              isLast={step === totalSteps}
              isNextDisabled={!categoryValidation.isValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}