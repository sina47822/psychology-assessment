import { Category } from '@/types/types';
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
  totalSelected: number;
  selectionRules: {
    minTotal: number;
    maxTotal: number;
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
  totalSelected,
  selectionRules
}: QuestionPageProps) {

  const handleCheckboxClick = (questionId: number, isChecked: boolean) => {
    if (isChecked && totalSelected >= selectionRules.maxTotal) {
      return;
    }
    
    onAnswerChange(category.id, questionId, isChecked);
  };

  const getStatusMessage = () => {
    const remaining = selectionRules.maxTotal - totalSelected;
    const needed = selectionRules.minTotal - totalSelected;
    
    if (totalSelected < selectionRules.minTotal) {
      return `حداقل ${needed} مورد دیگر باید انتخاب کنید (مجموعاً ${selectionRules.minTotal} مورد)`;
    }
    
    if (totalSelected >= selectionRules.minTotal && totalSelected < selectionRules.maxTotal) {
      return `می‌توانید تا ${remaining} مورد دیگر انتخاب کنید (تا حداکثر ${selectionRules.maxTotal} مورد)`;
    }
    
    if (totalSelected === selectionRules.maxTotal) {
      return "شما حداکثر موارد مجاز را انتخاب کرده‌اید.";
    }
    
    return "";
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-sky-100 text-sky-800 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              {step}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {category.categoryTitle}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                دسته {step} از {totalSteps}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-sky-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sky-800 font-medium mb-1">راهنمایی انتخاب:</p>
              <p className="text-sky-700 text-sm">
                {category.description}
                <span className="block mt-2 font-bold text-gray-800">
                  وضعیت کلی انتخاب‌ها: {totalSelected} از {selectionRules.maxTotal} مورد
                </span>
                {getStatusMessage() && (
                  <span className={`block mt-1 ${
                    totalSelected >= selectionRules.minTotal ? 'text-sky-500' : 'text-amber-600'
                  }`}>
                    {getStatusMessage()}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2">
        {category.questions.map((question) => {
          const isChecked = answers.includes(question.id);
          const isDisabled = !isChecked && totalSelected >= selectionRules.maxTotal;
          
          return (
            <div
              key={question.id}
              className={`flex items-start p-4 rounded-lg border transition-all duration-200 ${
                isChecked
                  ? 'border-sky-300 bg-sky-50'
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

      <div className={`p-4 rounded-lg border mb-6 ${
        totalSelected >= selectionRules.minTotal && totalSelected <= selectionRules.maxTotal
          ? 'bg-sky-50 border-sky-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-sky-500" />
            <div>
              <p className="text-sky-800 font-medium">وضعیت انتخاب‌ها:</p>
              <p className="text-sky-700 text-sm">
                در این بخش: {answers.length} مورد انتخاب شده است
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sky-700">{totalSelected}</div>
            <div className="text-gray-600 text-sm">کل انتخاب‌ها</div>
          </div>
        </div>
        <p className={`text-sm mt-2 ${
          totalSelected >= selectionRules.minTotal && totalSelected <= selectionRules.maxTotal
            ? 'text-sky-500'
            : 'text-red-600'
        }`}>
          {totalSelected < selectionRules.minTotal
            ? `⚠️ کمتر از حداقل (${selectionRules.minTotal} مورد نیاز)`
            : totalSelected > selectionRules.maxTotal
            ? `⚠️ بیشتر از حداکثر (${selectionRules.maxTotal} مورد مجاز)`
            : '✓ تعداد انتخاب‌ها مناسب است'}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-gray-600 text-center md:text-right order-2 md:order-1">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span>انتخاب‌های این بخش:</span>
              <span className="font-bold text-sky-700">
                {answers.length} / {category.questions.length}
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto order-1 md:order-2">
            <NavigationButtons
              onPrev={onPrev}
              onNext={onNext}
              isFirst={step === 1}
              isLast={step === totalSteps}
              isNextDisabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}