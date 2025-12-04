// lib/utils.ts
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
  if (!/^\d{10}$/.test(code)) return false;
  
  const check = +code[9];
  const sum = code.split('').slice(0, 9).reduce(
    (acc, x, i) => acc + +x * (10 - i), 0
  ) % 11;
  
  return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
}

/**
 * بررسی قدرت رمز عبور
 */
export function checkPasswordStrength(password: string): {
  score: number;
  message: string;
} {
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
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

/**
 * پاک کردن توکن‌ها
 */
export function clearTokens(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

/**
 * دریافت توکن دسترسی
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('access_token');
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

// تابع برای اسکرول به بالای صفحه
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// تابع برای فرمت کردن تاریخ
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '-'; // یا هر مقدار پیش‌فرض دیگر
  
  const d = new Date(date);
  
  // بررسی معتبر بودن تاریخ
  if (isNaN(d.getTime())) {
    console.warn('Invalid date value:', date);
    return '-';
  }
  
  // محدودیت‌های اضافی برای تاریخ‌های بسیار قدیمی یا آینده
  const now = new Date();
  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2100-01-01');
  
  if (d < minDate || d > maxDate) {
    console.warn('Date out of expected range:', date);
    return '-';
  }
  
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

// بررسی معتبر بودن رشته تاریخ
export const isValidDateString = (dateString: string | null | undefined): boolean => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  
  // بررسی فرمت‌های رایج
  const isoRegex = /^\d{4}-\d{2}-\d{2}/;
  const timestampRegex = /^\d+$/;
  
  if (isoRegex.test(dateString)) {
    // بررسی قسمت‌های تاریخ
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
};

// تابع برای فرمت کردن شماره موبایل
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
};


// تابع برای ذخیره داده‌های ارزیابی
export const saveAssessmentData = (
  userId: string,
  demographics: any,
  answers: any,
  totalSelected: number
) => {
  const assessmentData = {
    demographics,
    answers,
    totalSelected,
    completedAt: new Date().toISOString()
  };
  
  localStorage.setItem(`assessment-${userId}`, JSON.stringify(assessmentData));
};

// تابع برای بارگذاری داده‌های ارزیابی
export const loadAssessmentData = (userId: string) => {
  const data = localStorage.getItem(`assessment-${userId}`);
  return data ? JSON.parse(data) : null;
};

import { testUsers, FIXED_OTP, authErrors, passwordRules } from '@/data/authData';
import { User, LoginCredentials, RegisterData, OTPData } from '@/types/types';

// شبیه‌سازی تأخیر شبکه
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// اعتبارسنجی رمز عبور
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < passwordRules.minLength) {
    return { isValid: false, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' };
  }
  
  if (passwordRules.requireUppercase && !/[A-Z]/.test(password)) {
    return { isValid: false, message: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد' };
  }
  
  if (passwordRules.requireLowercase && !/[a-z]/.test(password)) {
    return { isValid: false, message: 'رمز عبور باید حداقل یک حرف کوچک داشته باشد' };
  }
  
  if (passwordRules.requireNumbers && !/\d/.test(password)) {
    return { isValid: false, message: 'رمز عبور باید حداقل یک عدد داشته باشد' };
  }
  
  if (passwordRules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: 'رمز عبور باید حداقل یک نماد ویژه داشته باشد' };
  }
  
  return { isValid: true };
};

// ورود کاربر
export const loginUser = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User; message?: string }> => {
  await simulateNetworkDelay();
  
  const { identifier, password } = credentials;
  
  // جستجوی کاربر
  const user = testUsers.find(u => 
    u.email === identifier || 
    u.username === identifier || 
    u.phone === identifier
  );
  
  if (!user) {
    return { success: false, message: authErrors.userNotFound };
  }
  
  // بررسی رمز عبور (در محیط واقعی باید hash شود)
  if (user.password !== password) {
    return { success: false, message: authErrors.invalidCredentials };
  }
  
  // حذف رمز عبور از داده‌های برگشتی
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    success: true,
    user: {
      ...userWithoutPassword,
      lastLogin: new Date().toISOString()
    }
  };
};

// ثبت نام کاربر
export const registerUser = async (data: RegisterData): Promise<{ success: boolean; user?: User; message?: string }> => {
  await simulateNetworkDelay();
  
  const { email, username, phone, password, confirmPassword, firstName, lastName } = data;
  
  // بررسی مطابقت رمز عبور
  if (password !== confirmPassword) {
    return { success: false, message: authErrors.passwordMismatch };
  }
  
  // اعتبارسنجی رمز عبور
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, message: passwordValidation.message };
  }
  
  // بررسی وجود کاربر
  const existingUser = testUsers.find(u => 
    (email && u.email === email) || 
    (username && u.username === username) || 
    (phone && u.phone === phone)
  );
  
  if (existingUser) {
    return { success: false, message: authErrors.userExists };
  }
  
  // ایجاد کاربر جدید
  const newUser: User = {
    id: Date.now().toString(),
    email,
    username,
    phone,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    isVerified: !phone, // اگر با موبایل ثبت‌نام کرد، نیاز به تایید OTP دارد
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    assessmentCompleted: false
  };
  
  // در محیط واقعی، کاربر باید در دیتابیس ذخیره شود
  // testUsers.push({ ...newUser, password });
 // در اینجا فقط شبیه‌سازی می‌کنیم
  
  return { success: true, user: newUser };
};

// ارسال OTP
export const sendOTP = async (identifier: string): Promise<{ success: boolean; message?: string }> => {
  await simulateNetworkDelay();
  
  // در محیط واقعی، OTP باید به شماره موبایل یا ایمیل ارسال شود
  // در اینجا فقط شبیه‌سازی می‌کنیم
  
  console.log(`OTP ${FIXED_OTP} sent to ${identifier}`);
  
  return { success: true };
};

// تأیید OTP
export const verifyOTP = async (data: OTPData): Promise<{ success: boolean; message?: string }> => {
  await simulateNetworkDelay();
  
  // بررسی OTP
  if (data.otp !== FIXED_OTP) {
    return { success: false, message: authErrors.invalidOTP };
  }
  
  return { success: true };
};

// تغییر رمز عبور
export const changePassword = async (
  userId: string, 
  currentPassword: string, 
  newPassword: string
): Promise<{ success: boolean; message?: string }> => {
  await simulateNetworkDelay();
  
  // اعتبارسنجی رمز عبور جدید
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    return { success: false, message: passwordValidation.message };
  }
  
  // در محیط واقعی، باید رمز عبور فعلی بررسی و جدید ذخیره شود
  // در اینجا فقط شبیه‌سازی می‌کنیم
  
  console.log(`Password changed for user ${userId}`);
  
  return { success: true };
};

// بازیابی رمز عبور
export const resetPassword = async (
  identifier: string, 
  newPassword: string, 
  otp: string
): Promise<{ success: boolean; message?: string }> => {
  await simulateNetworkDelay();
  
  // اعتبارسنجی OTP
  if (otp !== FIXED_OTP) {
    return { success: false, message: authErrors.invalidOTP };
  }
  
  // اعتبارسنجی رمز عبور جدید
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    return { success: false, message: passwordValidation.message };
  }
  
  // در محیط واقعی، رمز عبور کاربر باید تغییر کند
  console.log(`Password reset for ${identifier}`);
  
  return { success: true };
};