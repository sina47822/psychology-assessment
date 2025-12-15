// src/lib/api.ts - نسخه ساده‌شده
import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse
} from 'axios';

// شبیه‌سازی API بدون نیاز به سرور واقعی
const createMockApi = (): AxiosInstance => {
  // ایجاد یک شیء mock با حداقل متدهای مورد نیاز
  const mockApi = {
    defaults: {
      headers: {
        common: {},
        get: {},
        post: {},
        put: {},
        patch: {},
        delete: {},
      }
    },
    
    interceptors: {
      request: {
        use: (onFulfilled?: any, onRejected?: any, options?: any) => 0,
        eject: (id: number) => {},
        clear: () => {}
      },
      response: {
        use: (onFulfilled?: any, onRejected?: any, options?: any) => 0,
        eject: (id: number) => {},
        clear: () => {}
      }
    },
    
    get: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      console.log(`📥 Mock GET: ${url}`);
      
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // پاسخ‌های از پیش تعریف شده برای endpointهای مختلف
      if (url.includes('/users/me/')) {
        const user = localStorage.getItem('user');
        return {
          data: user ? JSON.parse(user) : null,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: config || {}
        } as AxiosResponse;
      }
      
      if (url.includes('/users/debug-session/')) {
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user');
        return {
          data: {
            user_authenticated: !!(token && user),
            session_info: {
              exists: !!localStorage.getItem('session_id')
            }
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: config || {}
        } as AxiosResponse;
      }
      
      // پاسخ پیش‌فرض
      return {
        data: { message: 'Mock GET response' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config || {}
      } as AxiosResponse;
    },
    
    post: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      console.log(`📤 Mock POST: ${url}`, data);
      
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // پاسخ‌های از پیش تعریف شده
      if (url.includes('/users/login/')) {
        // همیشه موفق
        const mockUser = {
          id: Date.now(),
          username: data?.username || 'testuser',
          email: 'test@example.com',
          first_name: 'کاربر',
          last_name: 'تستی',
          full_name: 'کاربر تستی',
          is_verified: true,
          is_parent: true,
          is_staff: false,
          profile: {
            education_level: 'دیپلم',
            field_of_study: null,
            occupation: 'آزاد',
            preferred_language: 'fa',
            timezone: 'Asia/Tehran'
          },
          assessmentCompleted: false,
          level: 'beginner',
          total_points: '0'
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return {
          data: {
            user: mockUser,
            access: `mock_access_token_${Date.now()}`,
            refresh: `mock_refresh_token_${Date.now()}`,
            session_id: `mock_session_${Date.now()}`
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: config || {}
        } as AxiosResponse;
      }
      
      if (url.includes('/users/register/')) {
        // همیشه موفق
        const mockUser = {
          id: Date.now(),
          ...data,
          full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          is_verified: true,
          is_parent: true,
          is_staff: false,
          profile: {
            education_level: data.education_level || null,
            field_of_study: data.field_of_study || null,
            occupation: data.occupation || null,
            preferred_language: 'fa',
            timezone: 'Asia/Tehran'
          },
          assessmentCompleted: false,
          level: 'beginner',
          total_points: '0'
        };
        
        return {
          data: {
            user: mockUser,
            access: `mock_access_token_${Date.now()}`,
            refresh: `mock_refresh_token_${Date.now()}`,
            session_id: `mock_session_${Date.now()}`
          },
          status: 201,
          statusText: 'Created',
          headers: {},
          config: config || {}
        } as AxiosResponse;
      }
      
      if (url.includes('/users/logout/')) {
        // همیشه موفق
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        return {
          data: { message: 'Logged out successfully' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: config || {}
        } as AxiosResponse;
      }
      
      // پاسخ پیش‌فرض
      return {
        data: { message: 'Mock POST response' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config || {}
      } as AxiosResponse;
    },
    
    put: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      console.log(`📝 Mock PUT: ${url}`, data);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        data: { ...data, updated_at: new Date().toISOString() },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config || {}
      } as AxiosResponse;
    },
    
    delete: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      console.log(`🗑️ Mock DELETE: ${url}`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        data: { message: 'Deleted successfully' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config || {}
      } as AxiosResponse;
    },
    
    request: async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      // برای متدهای دیگر
      const method = config.method?.toLowerCase() || 'get';
      const url = config.url || '';
      
      console.log(`🌐 Mock ${method.toUpperCase()}: ${url}`);
      
      // این یک پیاده‌سازی ساده است
      return {
        data: { message: 'Mock response' } as T,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      } as AxiosResponse<T>;
    }
  };
  
  return mockApi as AxiosInstance;
};

// استفاده از mock API در محیط توسعه
const isDevelopment = process.env.NODE_ENV === 'development';
export const api = isDevelopment ? createMockApi() : axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// اضافه کردن تایپ User (مطابق با types.ts)
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
  profile: {
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
  };
  assessmentCompleted: boolean;
  assessmentData?: any;
  level: string;
  total_points: string;
}

// API Helper Functions - Mock versions
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/users/login/', { username, password }),
  
  register: (userData: any) =>
    api.post('/users/register/', userData),
  
  logout: () =>
    api.post('/users/logout/'),
  
  // اصلاح متد getProfile به me برای سازگاری با auth-context
  me: () =>
    api.get('/users/me/'),
  
  getProfile: () =>
    api.get('/users/me/'),
  
  updateProfile: (data: any) =>
    api.put('/users/me/', data),
  
  requestOTP: (data: any) =>
    api.post('/users/otp/request/', data),
  
  verifyOTP: (data: any) =>
    api.post('/users/otp/verify/', data),
  
  resetPassword: (data: any) =>
    api.post('/users/password/reset/', data),
  
  confirmPasswordReset: (data: any) =>
    api.post('/users/password/reset/confirm/', data),
  
  checkSession: () =>
    api.get('/users/session/check/'),
  
  debugSession: () =>
    api.get('/users/debug-session/'),
};

export default api;