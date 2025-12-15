import { Category, UserAnswers } from '@/types/types';
import { Check, FileText, Download, RotateCcw, AlertCircle } from 'lucide-react';

interface SummaryScreenProps {
  categories: Category[];
  userAnswers: UserAnswers;
  onReset: () => void;
  onSubmit: () => void;
  totalSelected: number;
}

export default function SummaryScreen({
  categories,
  userAnswers,
  onReset,
  onSubmit,
  totalSelected
}: SummaryScreenProps) {
  
  const getCategoryStats = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    const selectedCount = userAnswers[categoryId]?.length || 0;
    const totalCount = category?.questions.length || 0;
    
    return { category, selectedCount, totalCount };
  };

  const downloadAnswers = () => {
    const dataStr = JSON.stringify(userAnswers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'پاسخ‌های_ارزیابی_روانشناسی.json';
    link.click();
  };

  const isSubmissionDisabled = totalSelected < 4;

  return (
    <div className="p-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-sky-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">تأیید پاسخ‌های شما</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          لطفاً پاسخ‌های خود را مرور کرده و در صورت تأیید، ارسال نمایید.
        </p>
      </div>

      {isSubmissionDisabled && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium mb-1">توجه:</p>
            <p className="text-red-700 text-sm">
              شما تنها {totalSelected} گزینه انتخاب کرده‌اید. برای ارسال نتایج، باید حداقل 4 گزینه انتخاب کنید.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-sky-50 to-sky-50 p-6 rounded-xl border border-sky-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">آمار کلی</h3>
            <FileText className="h-8 w-8 text-sky-500" />
          </div>
          <div className="text-center py-4">
            <div className="text-5xl font-bold text-sky-700 mb-2">{totalSelected}</div>
            <div className="text-gray-600">مورد انتخاب شده در کل</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-sky-50 p-6 rounded-xl border border-sky-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">دسته‌بندی‌ها</h3>
            <Check className="h-8 w-8 text-sky-500" />
          </div>
          <div className="space-y-3">
            {categories.map(category => {
              const stats = getCategoryStats(category.id);
              return (
                <div key={category.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{stats.category?.title}</span>
                  <span className="font-bold text-gray-800">
                    {stats.selectedCount} / {stats.totalCount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6">جزئیات پاسخ‌های شما:</h3>
        <div className="space-y-6">
          {categories.map(category => {
            const stats = getCategoryStats(category.id);
            const selectedQuestions = category.questions.filter(q => 
              userAnswers[category.id]?.includes(q.id)
            );
            
            return (
              <div key={category.id} className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg text-gray-800">{category.title}</h4>
                  <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
                    {stats.selectedCount} مورد
                  </span>
                </div>
                
                {selectedQuestions.length > 0 ? (
                  <ul className="space-y-2 pr-4">
                    {selectedQuestions.map(question => (
                      <li key={question.id} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-sky-500 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{question.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center py-4">هیچ موردی انتخاب نشده است</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
        <button
          onClick={onReset}
          className="btn-secondary flex items-center justify-center gap-2 order-3 md:order-1"
        >
          <RotateCcw className="h-5 w-5" />
          شروع مجدد ارزیابی
        </button>
        
        <button
          onClick={downloadAnswers}
          className="bg-sky-500 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 order-2"
        >
          <Download className="h-5 w-5" />
          دانلود پاسخ‌ها
        </button>
        
        <button
          onClick={onSubmit}
          disabled={isSubmissionDisabled}
          className={`btn-primary flex items-center justify-center gap-2 ${
            isSubmissionDisabled ? 'opacity-50 cursor-not-allowed' : ''
          } order-1 md:order-3`}
        >
          تأیید و ارسال نتایج
        </button>
      </div>

      <div className="mt-10 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <p className="text-sky-800 text-center">
          <strong>توجه:</strong> این نتایج صرفاً بر اساس پاسخ‌های شما تولید شده و جایگزین تشخیص تخصصی روانشناس نیست. 
          برای ارزیابی دقیق‌تر و دریافت راهکارهای تخصصی، با روانشناس مشورت نمایید.
        </p>
      </div>
    </div>
  );
}