'use client';

import Link from 'next/link';
import { APP_INFO, CONTACT_INFO } from '@/data/constants';
import { 
  Phone, 
  Shield,
  Heart
} from 'lucide-react';

interface FooterProps {
  simplified?: boolean;
}

export default function Footer({ simplified = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left - Logo and Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-500 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-800">
                {CONTACT_INFO.organization} © {currentYear}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span>نسخه {APP_INFO.version}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">آخرین بروزرسانی: {APP_INFO.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* Center - Quick Links */}
          {!simplified && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-sky-600 transition-colors">
                حریم خصوصی
              </Link>
              <Link href="/terms" className="hover:text-sky-600 transition-colors">
                شرایط استفاده
              </Link>
              <Link href="/help" className="hover:text-sky-600 transition-colors">
                راهنمای استفاده
              </Link>
              <Link href="/contact" className="hover:text-sky-600 transition-colors">
                تماس با ما
              </Link>
            </div>
          )}

          {/* Right - Support and Made with Love */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>پشتیبانی: {CONTACT_INFO.supportPhone}</span>
            </div>
            {!simplified && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>ساخته شده با</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span>برای سلامت روان</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            تمامی اطلاعات شما محرمانه باقی خواهد ماند و فقط برای ارائه خدمات مشاوره‌ای استفاده می‌شود.
          </p>
        </div>
      </div>
    </footer>
  );
}