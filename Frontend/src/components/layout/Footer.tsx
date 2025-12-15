'use client';

import Link from 'next/link';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Heart, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle,
  HelpCircle,
  FileText,
  Users
} from 'lucide-react';

interface FooterProps {
  simplified?: boolean;
  showPrivacyNotice?: boolean;
}

export default function Footer({ 
  simplified = false,
  showPrivacyNotice = true 
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (simplified) {
    return (
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>
              {showPrivacyNotice && (
                <>
                  تمامی اطلاعات شما محرمانه باقی خواهد ماند و فقط برای ارائه خدمات مشاوره‌ای استفاده می‌شود. |
                </>
              )}
              <span className="mx-2">پشتیبانی: {CONTACT_INFO.supportPhone}</span> |
              <span className="mx-2">نسخه: {APP_INFO.version}</span>
            </p>
            <p className="mt-2 text-xs text-gray-500">
              {CONTACT_INFO.organization} © {currentYear}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* بخش اصلی فوتر */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* درباره سامانه */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">سامانه کوچینگ تیناپ</h3>
                <p className="text-sm text-gray-300">شناخت چالش‌ها، قدم اول برای بهبود است</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              سامانه تخصصی ارزیابی و مشاوره روانشناختی نوجوانان با هدف شناسایی چالش‌های رفتاری و ارائه راهکارهای تخصصی طراحی شده است.
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">دسترسی سریع</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>ارزیابی آنلاین</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>داشبورد کاربری</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/help" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>راهنمای استفاده</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>درباره ما</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-sky-400" />
                <div>
                  <p className="text-sm">تلفن پشتیبانی</p>
                  <p className="font-medium text-white">{CONTACT_INFO.supportPhone}</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-sky-400" />
                <div>
                  <p className="text-sm">ایمیل</p>
                  <p className="font-medium text-white">{CONTACT_INFO.supportEmail}</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Clock className="h-5 w-5 text-sky-400" />
                <div>
                  <p className="text-sm">ساعات پاسخگویی</p>
                  <p className="font-medium text-white">{CONTACT_INFO.supportHours}</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-sky-400" />
                <div>
                  <p className="text-sm">آدرس</p>
                  <p className="font-medium text-white">تهران، دانشگاه تهران</p>
                </div>
              </li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ما را دنبال کنید</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-sky-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-sky-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">
                به خانواده {CONTACT_INFO.organization} بپیوندید
              </p>
              <p className="text-xs text-gray-400">
                دریافت آخرین مقالات و راهکارهای تخصصی
              </p>
            </div>
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* لینک‌های پایانی */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p>
              طراحی شده با <Heart className="inline h-4 w-4 text-red-500" /> برای سلامت روان نوجوانان
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              حریم خصوصی
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              شرایط استفاده
            </Link>
            <Link 
              href="/cookies" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              کوکی‌ها
            </Link>
            <Link 
              href="/sitemap" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              نقشه سایت
            </Link>
          </div>
        </div>
      </div>

      {/* بخش پایانی */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              <p>{CONTACT_INFO.organization} © {currentYear}</p>
            </div>
            
            <div className="text-gray-500 text-sm mt-2 md:mt-0">
              <p>
                نسخه {APP_INFO.version} | آخرین بروزرسانی: {APP_INFO.lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}