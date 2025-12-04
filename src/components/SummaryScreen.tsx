import { Category, UserAnswers, DemographicsData } from '@/types/types';
import { Check, FileText, Download, RotateCcw, AlertCircle, ChevronRight, User, BarChart } from 'lucide-react';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';

interface SummaryScreenProps {
  categories: Category[];
  userAnswers: UserAnswers;
  demographics: DemographicsData;
  onReset: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  totalSelected: number;
  isFormValid: boolean;
  selectionRules: {
    minTotal: number;
    maxTotal: number;
  };
}

export default function SummaryScreen({
  categories,
  userAnswers,
  demographics,
  onReset,
  onPrev,
  onSubmit,
  totalSelected,
  isFormValid,
  selectionRules
}: SummaryScreenProps) {
  
  const getCategoryStats = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    const selectedCount = userAnswers[categoryId]?.length || 0;
    
    return { category, selectedCount };
  };

  const downloadData = () => {
    const data = {
      demographics,
      answers: userAnswers,
      summary: {
        totalSelected,
        categories: categories.map(category => ({
          title: category.categoryTitle,
          selectedCount: userAnswers[category.id]?.length || 0
        })),
        isValid: isFormValid
      },
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ارزیابی_رفتاری_${new Date().toLocaleDateString('fa-IR')}.json`;
    link.click();
  };

  const renderParentInfo = (parentType: 'father' | 'mother') => {
    if (!demographics[parentType === 'father' ? 'fatherLiving' : 'motherLiving']) {
      return null;
    }
    
    const prefix = parentType === 'father' ? 'پدر' : 'مادر';
    
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-sky-50">
        <h4 className="font-bold text-gray-800 mb-2">اطلاعات {prefix}:</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">سن:</span>
            <span className="font-medium">{demographics[`${parentType}Age`]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">تحصیلات:</span>
            <span className="font-medium">{demographics[`${parentType}Education`]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">شغل:</span>
            <span className="font-medium">{demographics[`${parentType}Occupation`]}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-sky-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">خلاصه و بررسی نهایی</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          لطفاً پاسخ‌های خود را مرور کرده و در صورت تأیید، برای دریافت تحلیل تخصصی ارسال نمایید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-sky-50 to-sky-50 p-6 rounded-xl border border-sky-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">اطلاعات کلی</h3>
            <User className="h-8 w-8 text-sky-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">نحوه زندگی:</span>
              <span className="font-bold text-gray-800">{demographics.livingWith}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">موقعیت جغرافیایی:</span>
              <span className="font-bold text-gray-800">{demographics.province} - {demographics.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">وضعیت تاهل:</span>
              <span className="font-bold text-gray-800">{demographics.maritalStatus}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-pink-50 p-6 rounded-xl border border-sky-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">آمار کلی انتخاب‌ها</h3>
            <BarChart className="h-8 w-8 text-sky-600" />
          </div>
          <div className="text-center py-4">
            <div className="text-5xl font-bold text-sky-700 mb-2">{totalSelected}</div>
            <div className="text-gray-600">مورد انتخاب شده در کل</div>
            <div className={`mt-2 text-sm font-medium ${isFormValid ? 'text-sky-600' : 'text-red-600'}`}>
              {isFormValid 
                ? `✓ در محدوده مجاز (${selectionRules.minTotal}-${selectionRules.maxTotal})` 
                : `✗ خارج از محدوده مجاز`}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">والدین</h3>
            <User className="h-8 w-8 text-sky-600" />
          </div>
          <div className="space-y-4">
            {renderParentInfo('father')}
            {renderParentInfo('mother')}
          </div>
        </div>
      </div>

      {!isFormValid && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 font-medium mb-2">خطا در تعداد انتخاب‌ها:</p>
              <p className="text-red-700">
                شما {totalSelected} مورد انتخاب کرده‌اید. لطفاً بین {selectionRules.minTotal} تا {selectionRules.maxTotal} مورد انتخاب کنید.
                {totalSelected < selectionRules.minTotal && (
                  <span className="block mt-1">حداقل {selectionRules.minTotal - totalSelected} مورد دیگر نیاز است.</span>
                )}
                {totalSelected > selectionRules.maxTotal && (
                  <span className="block mt-1">{totalSelected - selectionRules.maxTotal} مورد باید حذف شود.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6">جزئیات انتخاب‌های شما در ۸ دسته:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => {
            const stats = getCategoryStats(category.id);
            const selectedQuestions = category.questions.filter(q => 
              userAnswers[category.id]?.includes(q.id)
            );
            
            return (
              <div key={category.id} className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-lg text-gray-800">{category.categoryTitle}</h4>
                    <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-bold">
                      {stats.selectedCount} / {category.questions.length}
                    </span>
                  </div>
                </div>
                
                {selectedQuestions.length > 0 ? (
                  <ul className="space-y-2 pr-4 max-h-40 overflow-y-auto">
                    {selectedQuestions.map(question => (
                      <li key={question.id} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-sky-800 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{question.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-center py-4">هیچ موردی انتخاب نشده است</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
        <button
          onClick={onPrev}
          className="btn-secondary flex items-center justify-center gap-2 order-4 md:order-1"
        >
          <ChevronRight className="h-5 w-5" />
          بازگشت به ویرایش
        </button>
        
        <button
          onClick={onReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 order-3 md:order-2"
        >
          <RotateCcw className="h-5 w-5" />
          شروع مجدد
        </button>
        
        <button
          onClick={downloadData}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 order-2 md:order-3"
        >
          <Download className="h-5 w-5" />
          دانلود پاسخ‌ها
        </button>
        
        <button
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`btn-primary flex items-center justify-center gap-2 ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          } order-1 md:order-4`}
        >
          تأیید و ارسال نتایج
        </button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-center">
          <strong>توجه:</strong> این نتایج صرفاً بر اساس پاسخ‌های شما تولید شده و جایگزین مشاوره تخصصی نیست. 
          برای ارزیابی دقیق‌تر و دریافت راهکارهای تخصصی، با مشاور نوجوان مشورت نمایید.
        </p>
        <p className="text-yellow-700 text-center text-sm mt-2">
          سیستم نسخه {APP_INFO.version} | آخرین بروزرسانی: {APP_INFO.lastUpdate}
        </p>
      </div>
    </div>
  );
}