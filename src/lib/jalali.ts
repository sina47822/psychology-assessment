// src/lib/jalali.ts
import {
  toJalaali,
  toGregorian,
  jalaaliMonthLength,
  isValidJalaaliDate,
  isLeapJalaaliYear,
} from 'jalaali-js';

// تبدیل میلادی به شمسی
export const toPersianDate = (date: Date | string | null): string => {
  if (!date) return '';
  
  try {
    const d = new Date(date);
    const { jy, jm, jd } = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    
    // نام ماه‌های فارسی
    const months = [
      'فروردین', 'اردیبهشت', 'خرداد',
      'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر',
      'دی', 'بهمن', 'اسفند'
    ];
    
    return `${jd} ${months[jm - 1]} ${jy}`;
  } catch {
    return '';
  }
};

// تبدیل میلادی به شمسی با فرمت عددی
export const toPersianNumeric = (date: Date | string | null): string => {
  if (!date) return '';
  
  try {
    const d = new Date(date);
    const { jy, jm, jd } = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
  } catch {
    return '';
  }
};

// تبدیل شمسی به میلادی
export const persianToGregorian = (
  year: number,
  month: number,
  day: number
): { gy: number; gm: number; gd: number } => {
  return toGregorian(year, month, day);
};

// اعتبارسنجی تاریخ شمسی
export const isValidPersianDate = (
  year: number,
  month: number,
  day: number
): boolean => {
  return isValidJalaaliDate(year, month, day);
};

// استخراج تاریخ شمسی از رشته
export const extractPersianDate = (dateStr: string): {
  year: number;
  month: number;
  day: number;
  isValid: boolean;
} | null => {
  if (!dateStr) return null;
  
  // حذف کاراکترهای غیرعددی و جداکننده‌ها
  const cleaned = dateStr.replace(/[^\d۰-۹]/g, '');
  
  // تبدیل اعداد فارسی به انگلیسی
  const persianToEnglish = (str: string): string => {
    return str.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  };
  
  const englishStr = persianToEnglish(cleaned);
  
  if (englishStr.length !== 8) return null;
  
  const year = parseInt(englishStr.substring(0, 4));
  const month = parseInt(englishStr.substring(4, 6));
  const day = parseInt(englishStr.substring(6, 8));
  
  return {
    year,
    month,
    day,
    isValid: isValidPersianDate(year, month, day),
  };
};

// فرمت تاریخ برای input
export const formatForInput = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const date = extractPersianDate(dateStr);
  if (!date || !date.isValid) return dateStr;
  
  return `${date.year}/${date.month.toString().padStart(2, '0')}/${date.day.toString().padStart(2, '0')}`;
};

// تبدیل رشته تاریخ شمسی به میلادی
export const persianStringToDate = (persianDate: string): Date | null => {
  if (!persianDate) return null;
  
  const date = extractPersianDate(persianDate);
  if (!date || !date.isValid) return null;
  
  const gregorian = persianToGregorian(date.year, date.month, date.day);
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
};

// تاریخ امروز به شمسی
export const todayPersian = (): string => {
  const now = new Date();
  const { jy, jm, jd } = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  return `${jy}${jm.toString().padStart(2, '0')}${jd.toString().padStart(2, '0')}`;
};