import { UserAnswers } from '@/types/types';
import { CheckCircle, Home, FileText, Phone, Mail } from 'lucide-react';

interface ConfirmationScreenProps {
  userAnswers: UserAnswers;
  totalSelected: number;
  onReset: () => void;
}

export default function ConfirmationScreen({
  userAnswers,
  totalSelected,
  onReset
}: ConfirmationScreenProps) {
  
  const downloadAnswers = () => {
    const dataStr = JSON.stringify(userAnswers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'پاسخ‌های_ارزیابی_رفتاری_نوجوانان.json';
    link.click();
  };

  return (
    <div className="p-6 text-center">
      <div className="mb-10">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          پاسخ‌های شما با موفقیت ثبت شد!
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          از صرف وقت و مشارکت ارزشمند شما سپاسگزاریم. پاسخ‌های شما برای تحلیل تخصصی ارسال شد.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-lg mx-auto mb-8">
          <h3 className="font-bold text-xl text-gray-800 mb-3">اطلاعات ارسالی شما:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-700">{totalSelected}</div>
              <div className="text-gray-600">تعداد موارد انتخاب شده</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-700">{Object.keys(userAnswers).length}</div>
              <div className="text-gray-600">تعداد دسته‌بندی‌ها</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6">مراحل بعدی:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-blue-600 font-bold">۱</div>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">تحلیل تخصصی</h4>
            <p className="text-gray-600 text-sm">پاسخ‌های شما توسط متخصصین روانشناسی نوجوانان تحلیل خواهد شد.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-purple-600 font-bold">۲</div>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">ارائه گزارش</h4>
            <p className="text-gray-600 text-sm">گزارش تحلیل و راهکارهای پیشنهادی برای شما ارسال می‌شود.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-green-600 font-bold">۳</div>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">مشاوره تخصصی</h4>
            <p className="text-gray-600 text-sm">در صورت نیاز، امکان مشاوره تخصصی برای شما فراهم می‌شود.</p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-3">راه‌های ارتباطی:</h4>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-700">۰۲۱-۱۲۳۴۵۶۷۸</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-700">support@teen-assessment.ir</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
        <button
          onClick={downloadAnswers}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <FileText className="h-5 w-5" />
          دانلود پاسخ‌های من
        </button>
        
        <button
          onClick={onReset}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Home className="h-5 w-5" />
          شروع ارزیابی جدید
        </button>
      </div>

      <div className="mt-10 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700">
          <strong>توجه:</strong> نتایج تحلیل طی ۲۴ تا ۴۸ ساعت آینده از طریق ایمیل یا پیامک برای شما ارسال خواهد شد.
          در صورت عدم دریافت، لطفاً با پشتیبانی تماس بگیرید.
        </p>
      </div>
    </div>
  );
}