'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgressChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">نمودارهای پیشرفت</h1>
        <p className="text-gray-600">تحلیل و نمایش گرافیکی پیشرفت شما</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">فعالیت هفتگی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-600">نمودار فعالیت هفتگی</p>
                <p className="text-sm text-gray-500 mt-2">(نمایش داده‌های واقعی نیاز به پیاده سازی نمودار دارد)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">روند پیشرفت ماهانه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <p className="text-gray-600">نمودار روند پیشرفت</p>
                <p className="text-sm text-gray-500 mt-2">(پیاده‌سازی با کتابخانه‌های نموداری مانند Recharts)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">توزیع مهارت‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-4">🥧</div>
                <p className="text-gray-600">نمودار دایره‌ای مهارت‌ها</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">مقایسه با میانگین</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-4">⚖️</div>
                <p className="text-gray-600">نمودار مقایسه‌ای</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">هدفیابی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <p className="text-gray-600">نمودار دستیابی به اهداف</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}