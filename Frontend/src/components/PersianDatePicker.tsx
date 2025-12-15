// src/components/PersianDatePicker.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { 
  toJalaali,
  toGregorian,
  jalaaliMonthLength,
  isValidJalaaliDate,
  isLeapJalaaliYear
} from 'jalaali-js';

interface PersianDatePickerProps {
  value?: string; // فرمت: 13700101
  onChange: (date: string) => void;
  onClose: () => void;
}

export default function PersianDatePicker({ value, onChange, onClose }: PersianDatePickerProps) {
  const [selectedYear, setSelectedYear] = useState<number>(1370);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // ماه‌های فارسی
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد',
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر',
    'دی', 'بهمن', 'اسفند'
  ];

  // روزهای هفته
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  // مقداردهی اولیه بر اساس value
  useEffect(() => {
    if (value && value.length === 8) {
      const year = parseInt(value.substring(0, 4));
      const month = parseInt(value.substring(4, 6));
      const day = parseInt(value.substring(6, 8));
      
      if (isValidJalaaliDate(year, month, day)) {
        setSelectedYear(year);
        setSelectedMonth(month);
        setSelectedDay(day);
      }
    } else {
      // تنظیم تاریخ امروز به شمسی
      const today = new Date();
      const { jy, jm, jd } = toJalaali(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      setSelectedYear(jy);
      setSelectedMonth(jm);
      setSelectedDay(jd);
    }
  }, [value]);

  // تعداد روزهای ماه
  const daysInMonth = jalaaliMonthLength(selectedYear, selectedMonth);

  // روز اول ماه چه روزی از هفته است
  const firstDayOfMonth = (): number => {
    // محاسبه روز هفته برای اولین روز ماه
    const { gy, gm, gd } = toGregorian(selectedYear, selectedMonth, 1);
    const date = new Date(gy, gm - 1, gd);
    let day = date.getDay(); // 0: یکشنبه, 6: جمعه
    
    // تبدیل به تقویم فارسی (شنبه = 0)
    day = (day + 1) % 7;
    return day;
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setSelectedDay(null);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const dateStr = `${selectedYear}${selectedMonth.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
    onChange(dateStr);
    onClose();
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedDay(null);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
    setSelectedDay(null);
  };

  // تولید لیست سال‌ها (۱۳۰۰ تا ۱۴۲۰)
  const years = Array.from({ length: 121 }, (_, i) => 1300 + i);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-72">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="flex gap-2">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="px-2 py-1 border border-gray-300 rounded text-center"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-2 py-1 border border-gray-300 rounded text-center"
          >
            {persianMonths.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* روزهای هفته */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-sm font-bold text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* روزهای ماه */}
      <div className="grid grid-cols-7 gap-1">
        {/* سلول‌های خالی قبل از روز اول */}
        {Array.from({ length: firstDayOfMonth() }, (_, i) => (
          <div key={`empty-${i}`} className="h-8"></div>
        ))}

        {/* روزهای ماه */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            className={`h-8 flex items-center justify-center rounded text-sm transition-colors
              ${selectedDay === day
                ? 'bg-sky-500 text-white'
                : 'hover:bg-sky-100 text-gray-700'
              }
              ${day === new Date().getDate() && 
                selectedYear === toJalaali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).jy &&
                selectedMonth === toJalaali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).jm
                ? 'border border-sky-300'
                : ''
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>

      {/* دکمه‌های اکشن */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => {
            const today = new Date();
            const { jy, jm, jd } = toJalaali(
              today.getFullYear(),
              today.getMonth() + 1,
              today.getDate()
            );
            const dateStr = `${jy}${jm.toString().padStart(2, '0')}${jd.toString().padStart(2, '0')}`;
            onChange(dateStr);
            onClose();
          }}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          امروز
        </button>
        
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          بستن
        </button>
      </div>
    </div>
  );
}