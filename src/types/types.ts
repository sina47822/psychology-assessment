// src/types/types.ts

export interface Question {
  id: number;
  text: string;
  category: string;
  categoryTitle: string;
}

export interface Category {
  categoryTitle: string;
  id: number;
  title: string;
  questions: Question[];
  description: string;
}

export interface UserAnswers {
  [categoryId: number]: number[];
}

export interface DemographicsData {
  age: string;
  education: string;
  occupation: string;
  livingWith: string;
  fatherLiving: boolean;
  motherLiving: boolean;
  fatherAge: string;
  fatherEducation: string;
  fatherOccupation: string;
  motherAge: string;
  motherEducation: string;
  motherOccupation: string;
  province: string;
  city: string;
  maritalStatus: string;
}

export interface WelcomeData {
  title: string;
  subtitle: string;
  description: string;
  instructions: string[];
}

export interface SelectionRules {
  minTotal: number;
  maxTotal: number;
}

// User اصلی که در کل اپلیکیشن استفاده می‌شود
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
    demographics: DemographicsData;
    answers: UserAnswers;
    completedAt: string;
    totalSelected: number;
  };
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

// انواع Context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<{
    success: boolean;
    user?: User;
    error?: string;
  }>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<{
    success: boolean;
    data?: any;
    error?: any;
  }>;
  updateProfile: (profileData: any) => Promise<{
    success: boolean;
    user?: User;
    error?: any;
  }>;
  refreshAccessToken: () => Promise<string | null>;
  checkSession: () => Promise<boolean>;
}

// انواع API
export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

// انواع فرم‌ها
export interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  national_code: string;
  birth_date: string;
  gender: string;
  terms: boolean;
}

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  national_code: string;
  birth_date: string;
  gender: string;
  province: string;
  city: string;
  address: string;
  avatar?: File;
}

// انواع مسیرها
export interface RouteConfig {
  path: string;
  name: string;
  requiresAuth: boolean;
  roles?: string[];
}

// AuthUser مخصوص API که از بکند می‌آید
export interface AuthUser {
  id: string | number;
  username: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  is_verified?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  date_joined?: string;
  last_login?: string;
  profile?: {
    avatar?: string;
    bio?: string;
    [key: string]: any;
  };
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  email?: string;
  username?: string;
  phone?: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  national_code?: string;
  birth_date?: string;
  gender?: string;
}

export interface OTPData {
  phone?: string;
  email?: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  refresh: string;
  access: string;
  session_id?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface LoginResponse {
  user: AuthUser;  // از AuthUser استفاده می‌کنیم
  access: string;
  refresh: string;
  detail?: string;
}

export interface OTPResponse {
  message: string;
  access_token?: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh?: string;
}

export type SocialMediaPlatforms = {
  telegram: string;
  instagram: string;
  linkedin: string;
  aparat: string;
  rubika: string;
};