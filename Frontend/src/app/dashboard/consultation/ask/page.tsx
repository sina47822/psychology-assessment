'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, History, Star, CheckCircle, Clock } from 'lucide-react';

export default function ConsultationAskPage() {
  const questions = [
    { 
      title: 'چگونه با نوجوانم درباره استفاده از موبایل صحبت کنم؟', 
      status: 'پاسخ داده شده',
      date: '۱۴۰۲/۰۳/۰۵',
      answer: 'با سلام. بهترین روش برای گفتگو درباره موبایل، تعیین زمان‌های مشخص و توافق روی قوانین است. سعی کنید ابتدا خودتان الگوی خوبی باشید و سپس...'
    },
    { 
      title: 'برای افزایش اعتماد به نفس نوجوان چه کارهایی می‌توانم انجام دهم؟', 
      status: 'در حال بررسی',
      date: '۱۴۰۲/۰۳/۰۶',
      answer: null
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">سوال از مربی</h1>
        <p className="text-gray-600">سوالات خود را از مربیان متخصص بپرسید و پاسخ دریافت کنید</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">سوال جدید</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">موضوع سوال</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="موضوع سوال خود را وارد کنید"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">متن سوال</label>
                <textarea 
                  className="w-full min-h-[200px] px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="سوال خود را با جزئیات شرح دهید..."
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <MessageSquare className="h-4 w-4 inline ml-1" />
                  پاسخ معمولا ظرف ۲۴ ساعت ارسال می‌شود
                </div>
                <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600">
                  <Send className="h-5 w-5 ml-2" />
                  ارسال سوال
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sky-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">راهنما</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gradient-to-r from-sky-50 to-white rounded-xl border border-sky-100">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 ml-2" />
                  <h4 className="font-bold text-gray-800">نکات مهم</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-2 pr-6">
                  <li>• سوالات خود را با جزئیات کامل شرح دهید</li>
                  <li>• از ذکر نام واقعی افراد خودداری کنید</li>
                  <li>• منتظر پاسخ در همین بخش باشید</li>
                </ul>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-100">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-emerald-600 ml-2" />
                  <h4 className="font-bold text-gray-800">زمان پاسخگویی</h4>
                </div>
                <p className="text-sm text-gray-600">
                  سوالات شما توسط اولین مربی available ظرف ۲۴ ساعت پاسخ داده می‌شوند.
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-white rounded-xl border border-yellow-100">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-600 ml-2" />
                  <h4 className="font-bold text-gray-800">سوالات پرتکرار</h4>
                </div>
                <p className="text-sm text-gray-600">
                  قبل از پرسش، بخش سوالات پرتکرار را بررسی کنید.
                </p>
                <Button variant="outline" className="w-full mt-3">مشاهده سوالات پرتکرار</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-sky-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800">سوالات قبلی</CardTitle>
            <Button variant="outline">
              <History className="h-5 w-5 ml-2" />
              مشاهده همه
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 mb-2 md:mb-0">{question.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{question.date}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      question.status === 'پاسخ داده شده' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {question.status}
                    </span>
                  </div>
                </div>
                {question.answer && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-sky-50 to-white rounded-lg border border-sky-100">
                    <div className="flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 text-sky-600 ml-2" />
                      <span className="font-bold text-gray-800">پاسخ مربی:</span>
                    </div>
                    <p className="text-gray-700">{question.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}