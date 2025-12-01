// کاربران تستی
export const testUsers = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    phone: '09123456789',
    password: 'Test@1234', // رمز تست
    firstName: 'کاربر',
    lastName: 'تست',
    fullName: 'کاربر تست',
    isVerified: true,
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString(),
    assessmentCompleted: false
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
    assessmentCompleted: true
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