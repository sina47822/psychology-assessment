// src/data/authData.ts
// کاربران تستی
export const testUsers = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    phone: '09123456789',
    password: 'Test@1234',
    firstName: 'کاربر',
    lastName: 'تست',
    fullName: 'کاربر تست',
    isVerified: true,
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString(),
    assessmentCompleted: false,
    assessmentData: null
  },
  {
    id: '2',
    username: 'parent_user',
    email: 'parent@example.com',
    phone: '09129876543',
    password: 'Parent@123',
    firstName: 'والد',
    lastName: 'نمونه',
    fullName: 'والد نمونه',
    isVerified: true,
    createdAt: '2024-01-15',
    lastLogin: new Date().toISOString(),
    assessmentCompleted: true,
    assessmentData: {
      demographics: {
        age: '16-18 سال',
        education: 'متوسطه دوم',
        occupation: 'دانش‌آموز',
        livingWith: 'با پدر و مادر',
        fatherAge: '41 تا 50 سال',
        fatherEducation: 'کارشناسی',
        fatherOccupation: 'مهندس',
        motherAge: '41 تا 50 سال',
        motherEducation: 'کارشناسی',
        motherOccupation: 'کارمند',
        maritalStatus: 'متاهل',
        province: 'تهران',
        city: 'تهران'
      },
      answers: {
        1: [1, 3],
        2: [2, 4],
        3: [1],
        4: [2, 3],
        5: [1, 4],
        6: [2],
        7: [3],
        8: [1, 2]
      },
      completedAt: '2024-01-20T10:30:00Z'
    }
  }
];

// OTP ثابت برای توسعه (در تولید باید از سرویس واقعی استفاده شود)
export const FIXED_OTP = '123456';

// قوانین رمز عبور
export const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
};

// پیام‌های خطای احراز هویت
export const authErrors = {
  invalidCredentials: 'ایمیل/نام کاربری/شماره موبایل یا رمز عبور اشتباه است',
  userNotFound: 'کاربری با این مشخصات یافت نشد',
  userExists: 'کاربر با این ایمیل/نام کاربری/شماره موبایل قبلاً ثبت‌نام کرده است',
  invalidOTP: 'کد تایید اشتباه است',
  otpExpired: 'کد تایید منقضی شده است',
  passwordMismatch: 'رمز عبور و تأیید رمز عبور مطابقت ندارند',
  weakPassword: 'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک، عدد و نماد باشد'
};

// مدت زمان اعتبار OTP (دقیقه)
export const OTP_EXPIRY_MINUTES = 5;

// تنظیمات جلسه
export const SESSION_SETTINGS = {
  tokenExpiry: '24h',
  refreshTokenExpiry: '7d',
  maxLoginAttempts: 5,
  lockoutDuration: 15 // دقیقه
};