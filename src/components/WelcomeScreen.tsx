import { welcomeData } from '@/data/welcomeData';
import { PlayCircle, Shield, Clock, CheckCircle, Users, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="text-center py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-700 mb-4">
          {welcomeData.title}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 mb-6">
          {welcomeData.subtitle}
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
          {welcomeData.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-sky-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">محرمانگی اطلاعات</h3>
          <p className="text-gray-600">تمامی پاسخ‌های شما کاملاً محرمانه نگهداری می‌شود.</p>
        </div>

        <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-sky-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">زمان مورد نیاز</h3>
          <p className="text-gray-600">ارزیابی کامل حدود ۱۰-۱۲ دقیقه زمان می‌برد.</p>
        </div>

        <div className="bg-sky-50 p-6 rounded-xl border border-pink-100">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-sky-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">هدف ما</h3>
          <p className="text-gray-600">کمک به بهبود روابط و سلامت روانی نوجوانان</p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6">روند کار:</h3>
        <div className="space-y-4 text-right max-w-2xl mx-auto">
          {welcomeData.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-sky-500 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-lg">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 font-medium mb-2">توجه مهم:</p>
        <p className="text-yellow-700 text-sm">
          این پرسشنامه برای نوجوانان ۱۲ تا ۱۸ سال طراحی شده است. لطفاً بر اساس رفتارهای مشاهده شده در یک ماه گذشته پاسخ دهید.
        </p>
      </div>

      <button
        onClick={onStart}
        className="btn-primary text-lg px-10 py-4 mx-auto flex items-center gap-2"
      >
        <PlayCircle className="h-6 w-6" />
        شروع ارزیابی
      </button>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          این پرسشنامه بر اساس استانداردهای روانشناسی نوجوانان طراحی شده و جایگزین مشاوره تخصصی نیست.
        </p>
      </div>
    </div>
  );
}