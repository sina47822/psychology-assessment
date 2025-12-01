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