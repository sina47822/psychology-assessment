// lib/utils.ts
import { toPersianDate, toPersianNumeric, persianStringToDate } from './jalali';

export interface PasswordStrength {
  score: number;
  message: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  email?: string;
  username: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  national_code?: string;
  birth_date?: string;
  gender?: string;
}

export interface OTPData {
  identifier: string;
  otp: string;
  purpose?: 'register' | 'login' | 'reset';
}

export interface AuthResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | Record<string, any>;
}

export interface UserProfile {
  education_level: string | null;
  field_of_study: string | null;
  occupation: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relation: string | null;
  preferred_language: string;
  timezone: string;
  notify_new_assessment: boolean;
  notify_results_ready: boolean;
  notify_workshop: boolean;
  notify_newsletter: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  national_code: string | null;
  birth_date: string | null;
  gender: string | null;
  province: string | null;
  city: string | null;
  address: string | null;
  is_verified: boolean;
  is_parent: boolean;
  is_staff: boolean;
  avatar: string | null;
  email_notifications: boolean;
  sms_notifications: boolean;
  two_factor_auth: boolean;
  last_login: string | null;
  last_activity: string | null;
  created_at: string;
  updated_at: string;
  profile: UserProfile;
  assessmentCompleted: boolean;
  assessmentData?: {
    demographics: any;
    answers: any;
    completedAt: string;
    totalSelected: number;
  };
}

export interface DemographicsData {
  [key: string]: any;
}

export interface UserAnswers {
  [key: string]: any;
}

/**
 * شناسایی نوع شناسه ورودی (ایمیل، شماره تلفن یا نام کاربری)
 */
export function identifyLoginType(identifier: string): 'email' | 'phone' | 'username' {
  // حذف فاصله‌ها
  const cleanIdentifier = identifier.trim();
  
  // بررسی ایمیل
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(cleanIdentifier)) {
    return 'email';
  }
  
  // بررسی شماره تلفن ایرانی
  const phoneRegex = /^(\+98|0)?9\d{9}$/;
  const cleanPhone = cleanIdentifier.replace(/\D/g, '');
  if (phoneRegex.test(cleanPhone)) {
    return 'phone';
  }
  
  // در غیر این صورت نام کاربری
  return 'username';
}

/**
 * فرمت کردن شماره تلفن ایرانی
 */
export function formatIranianPhone(phone: string): string {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `+98 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `+98 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * بررسی معتبر بودن کد ملی
 */
export function isValidNationalCode(code: string): boolean {
  if (!code) return false;
  
  const cleaned = code.replace(/\D/g, '');
  
  if (!/^\d{10}$/.test(cleaned)) return false;
  
  const check = parseInt(cleaned[9]);
  const sum = cleaned
    .split('')
    .slice(0, 9)
    .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;
  
  return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
}

/**
 * بررسی قدرت رمز عبور
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, message: 'رمز عبور وارد نشده' };
  }
  
  let score = 0;
  const messages: string[] = [];

  if (password.length >= 8) score += 1;
  else messages.push('حداقل ۸ کاراکتر');

  if (/[a-z]/.test(password)) score += 1;
  else messages.push('حروف کوچک');

  if (/[A-Z]/.test(password)) score += 1;
  else messages.push('حروف بزرگ');

  if (/\d/.test(password)) score += 1;
  else messages.push('اعداد');

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else messages.push('نمادهای خاص');

  let message = '';
  if (score <= 2) message = 'ضعیف';
  else if (score <= 3) message = 'متوسط';
  else if (score <= 4) message = 'قوی';
  else message = 'خیلی قوی';

  return {
    score,
    message: messages.length > 0 ? `نیاز به: ${messages.join(', ')}` : message
  };
}

/**
 * ذخیره توکن در localStorage
 */
export function saveTokens(access: string, refresh: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }
}

/**
 * پاک کردن توکن‌ها
 */
export function clearTokens(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('session_id');
    localStorage.removeItem('user');
  }
}

/**
 * دریافت توکن دسترسی
 */
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

/**
 * بررسی اعتبار توکن
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * تابع برای اسکرول به بالای صفحه
 */
export const scrollToTop = (): void => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

/**
 * تابع برای فرمت کردن تاریخ
 */
export const formatDate = (
  date: Date | string | null, 
  format: 'jalali' | 'numeric' | 'full' = 'full'
): string => {
  if (!date) return '';
  
  try {
    if (format === 'jalali') {
      return toPersianNumeric(date);
    } else if (format === 'numeric') {
      return toPersianDate(date);
    } else {
      // فرمت کامل
      const jalali = toPersianNumeric(date);
      const persian = toPersianDate(date);
      return `${persian} (${jalali})`;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * بررسی معتبر بودن رشته تاریخ
 */
export const isValidDateString = (dateString: string | null | undefined): boolean => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;
    
    // بررسی فرمت‌های رایج
    const isoRegex = /^\d{4}-\d{2}-\d{2}/;
    const timestampRegex = /^\d+$/;
    
    if (isoRegex.test(dateString)) {
      const parts = dateString.split('-');
      if (parts.length < 3) return false;
      
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      
      if (year < 1900 || year > 2100) return false;
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

/**
 * تابع برای فرمت کردن شماره موبایل
 */
export const formatPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
  }
  
  return phone;
};

/**
 * تابع برای ذخیره داده‌های ارزیابی
 */
export const saveAssessmentData = (
  userId: string | number,
  demographics: any,
  answers: any,
  totalSelected: number
): void => {
  if (typeof window !== 'undefined') {
    const assessmentData = {
      demographics,
      answers,
      totalSelected,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`assessment-${userId}`, JSON.stringify(assessmentData));
  }
};

/**
 * تابع برای بارگذاری داده‌های ارزیابی
 */
export const loadAssessmentData = (userId: string | number): any => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(`assessment-${userId}`);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

// Import constants
const authErrors = {
  userNotFound: 'کاربر یافت نشد',
  invalidCredentials: 'نام کاربری یا رمز عبور نادرست است',
  passwordMismatch: 'رمز عبور و تأیید آن مطابقت ندارند',
  userExists: 'این کاربر قبلاً ثبت‌نام کرده است',
  invalidOTP: 'کد تأیید نادرست است',
};

const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

const testUsers: User[] = []; // می‌توانید داده‌های تست را اینجا قرار دهید

const FIXED_OTP = '123456'; // OTP ثابت برای تست

// شبیه‌سازی تأخیر شبکه
const simulateNetworkDelay = (): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, 500));

// اعتبارسنجی رمز عبور
export const validatePassword = (
  password: string
): { isValid: boolean; message?: string } => {
  if (password.length < passwordRules.minLength) {
    return { 
      isValid: false, 
      message: `رمز عبور باید حداقل ${passwordRules.minLength} کاراکتر باشد` 
    };
  }
  
  if (passwordRules.requireUppercase && !/[A-Z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد' 
    };
  }
  
  if (passwordRules.requireLowercase && !/[a-z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'رمز عبور باید حداقل یک حرف کوچک داشته باشد' 
    };
  }
  
  if (passwordRules.requireNumbers && !/\d/.test(password)) {
    return { 
      isValid: false, 
      message: 'رمز عبور باید حداقل یک عدد داشته باشد' 
    };
  }
  
  if (passwordRules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { 
      isValid: false, 
      message: 'رمز عبور باید حداقل یک نماد ویژه داشته باشد' 
    };
  }
  
  return { isValid: true };
};

// ورود کاربر (شبیه‌سازی)
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse<User>> => {
  await simulateNetworkDelay();
  
  const { identifier, password } = credentials;
  
  // جستجوی کاربر
  const user = testUsers.find(u => 
    u.email === identifier || 
    u.username === identifier || 
    u.phone === identifier
  );
  
  if (!user) {
    return { 
      success: false, 
      message: authErrors.userNotFound 
    };
  }
  
  // در محیط واقعی باید hash شده رمز عبور بررسی شود
  // اینجا فقط شبیه‌سازی است
  
  return {
    success: true,
    data: {
      ...user,
      last_login: new Date().toISOString()
    }
  };
};

// ثبت نام کاربر (شبیه‌سازی)
export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse<User>> => {
  await simulateNetworkDelay();
  
  const { password, confirmPassword } = data;
  
  // بررسی مطابقت رمز عبور
  if (password !== confirmPassword) {
    return { 
      success: false, 
      message: authErrors.passwordMismatch 
    };
  }
  
  // اعتبارسنجی رمز عبور
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { 
      success: false, 
      message: passwordValidation.message 
    };
  }
  
  // بررسی وجود کاربر
  const existingUser = testUsers.find(u => 
    (data.email && u.email === data.email) || 
    (data.username && u.username === data.username) || 
    (data.phone && u.phone === data.phone)
  );
  
  if (existingUser) {
    return { 
      success: false, 
      message: authErrors.userExists 
    };
  }
  
  // ایجاد کاربر جدید
  const newUser: User = {
    id: Date.now(),
    email: data.email || null,
    username: data.username,
    phone: data.phone || null,
    first_name: data.first_name,
    last_name: data.last_name,
    full_name: `${data.first_name} ${data.last_name}`,
    national_code: data.national_code || null,
    birth_date: data.birth_date || null,
    gender: data.gender || null,
    province: null,
    city: null,
    address: null,
    is_verified: !data.phone, // اگر با موبایل ثبت‌نام کرد، نیاز به تایید OTP دارد
    is_parent: false,
    is_staff: false,
    avatar: null,
    email_notifications: true,
    sms_notifications: true,
    two_factor_auth: false,
    last_login: new Date().toISOString(),
    last_activity: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile: {
      education_level: null,
      field_of_study: null,
      occupation: null,
      emergency_contact_name: null,
      emergency_contact_phone: null,
      emergency_contact_relation: null,
      preferred_language: 'fa',
      timezone: 'Asia/Tehran',
      notify_new_assessment: true,
      notify_results_ready: true,
      notify_workshop: true,
      notify_newsletter: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    assessmentCompleted: false
  };
  
  return { 
    success: true, 
    data: newUser 
  };
};

// ارسال OTP (شبیه‌سازی)
export const sendOTP = async (
  identifier: string
): Promise<AuthResponse<{ otp?: string }>> => {
  await simulateNetworkDelay();
  
  console.log(`OTP ${FIXED_OTP} sent to ${identifier}`);
  
  return { 
    success: true, 
    data: { otp: FIXED_OTP } 
  };
};

// تأیید OTP (شبیه‌سازی)
export const verifyOTP = async (
  data: OTPData
): Promise<AuthResponse> => {
  await simulateNetworkDelay();
  
  // بررسی OTP
  if (data.otp !== FIXED_OTP) {
    return { 
      success: false, 
      message: authErrors.invalidOTP 
    };
  }
  
  return { success: true };
};

// تغییر رمز عبور (شبیه‌سازی)
export const changePassword = async (
  userId: string | number,
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> => {
  await simulateNetworkDelay();
  
  // اعتبارسنجی رمز عبور جدید
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    return { 
      success: false, 
      message: passwordValidation.message 
    };
  }
  
  console.log(`Password changed for user ${userId}`);
  
  return { success: true };
};

// بازیابی رمز عبور (شبیه‌سازی)
export const resetPassword = async (
  identifier: string,
  newPassword: string,
  otp: string
): Promise<AuthResponse> => {
  await simulateNetworkDelay();
  
  // اعتبارسنجی OTP
  if (otp !== FIXED_OTP) {
    return { 
      success: false, 
      message: authErrors.invalidOTP 
    };
  }
  
  // اعتبارسنجی رمز عبور جدید
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    return { 
      success: false, 
      message: passwordValidation.message 
    };
  }
  
  console.log(`Password reset for ${identifier}`);
  
  return { success: true };
};

/**
 * تابع کمکی برای اطمینان از ایمن بودن دسترسی به localStorage
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    }
  },
  
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  },
  
  clear: (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  }
};

/**
 * ایجاد slug از رشته فارسی
 */
export const createSlug = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * فرمت کردن عدد با جداکننده هزارگان فارسی
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num);
};

/**
 * کوتاه کردن متن با طول مشخص
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}