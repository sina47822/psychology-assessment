import { UserAnswers, DemographicsData } from '@/types/types';
import { CheckCircle, Home, FileText, Phone, Mail, User } from 'lucide-react';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';

interface ConfirmationScreenProps {
  demographics: DemographicsData;
  userAnswers: UserAnswers;
  totalSelected: number;
  onReset: () => void;
}

export default function ConfirmationScreen({
  demographics,
  userAnswers,
  totalSelected,
  onReset
}: ConfirmationScreenProps) {
  
  const downloadData = () => {
    const data = {
      demographics,
      answers: userAnswers,
      totalSelected,
      timestamp: new Date().toISOString(),
      systemInfo: {
        version: APP_INFO.version,
        lastUpdate: APP_INFO.lastUpdate,
        buildDate: APP_INFO.buildDate
      }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ارزیابی_رفتاری_${new Date().toLocaleDateString('fa-IR')}.json`;
    link.click();
  };

  return (
    <div className="p-6 text-center">
      <div className="mb-10">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-sky-100 rounded-full mb-6">
          <CheckCircle className="h-12 w-12 text-sky-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ارزیابی شما با موفقیت تکمیل شد!
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          از مشارکت ارزشمند شما در این پروژه پژوهشی سپاسگزاریم. اطلاعات شما برای تحلیل تخصصی ثبت شد.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <User className="h-6 w-6 text-sky-500" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">اطلاعات ثبت شده</h4>
            <p className="text-gray-600 text-sm">
              اطلاعات دموگرافیک و {totalSelected} مورد انتخاب شده از شما ثبت گردید.
            </p>
          </div>
          
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-2xl font-bold text-sky-500">{totalSelected}</div>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">تعداد انتخاب‌ها</h4>
            <p className="text-gray-600 text-sm">
              شما در مجموع {totalSelected} مورد از چالش‌های رفتاری را انتخاب کرده‌اید.
            </p>
          </div>
          
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="h-6 w-6 text-sky-500" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">تأیید نهایی</h4>
            <p className="text-gray-600 text-sm">
              فرم شما به صورت کامل تأیید و برای تحلیل ارسال شد.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-3">مراحل بعدی:</h4>
        <div className="text-right space-y-2 max-w-2xl mx-auto">
          <p className="text-gray-700">
            <span className="font-bold">۱. تحلیل داده‌ها:</span> اطلاعات شما توسط تیم متخصصین روانشناسی تحلیل می‌شود.
          </p>
          <p className="text-gray-700">
            <span className="font-bold">۲. تهیه گزارش:</span> گزارشی از تحلیل داده‌های شما تهیه خواهد شد.
          </p>
          <p className="text-gray-700">
            <span className="font-bold">۳. ارائه راهکار:</span> راهکارهای عملی متناسب با وضعیت ارائه می‌شود.
          </p>
        </div>
      </div>

      <div className="mb-8 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-3">راه‌های ارتباطی:</h4>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-sky-500" />
            <span className="text-gray-700">{CONTACT_INFO.supportPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-sky-500" />
            <span className="text-gray-700">{CONTACT_INFO.supportEmail}</span>
          </div>
          <div className="text-gray-700 text-sm">
            ساعت پاسخگویی: {CONTACT_INFO.supportHours}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
        <button
          onClick={downloadData}
          className="bg-sky-500 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <FileText className="h-5 w-5" />
          دانلود نسخه اطلاعات من
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
          <strong>توجه:</strong> نتایج تحلیل طی ۴۸ تا ۷۲ ساعت آینده از طریق ایمیل یا پیامک برای شما ارسال خواهد شد.
          در صورت عدم دریافت، لطفاً با پشتیبانی تماس بگیرید.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          {CONTACT_INFO.organization} © {APP_INFO.currentYear}
          <br />
          سیستم نسخه {APP_INFO.version} | آخرین بروزرسانی: {APP_INFO.lastUpdate}
        </div>
      </div>
    </div>
  );
}