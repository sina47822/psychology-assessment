// src/lib/api.ts - نسخه تستی
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// شبیه‌سازی API بدون نیاز به سرور واقعی
const createMockApi = () => {
  const mockResponses = new Map();
  
  const api: Partial<AxiosInstance> = {
    defaults: {
      headers: {
        common: {}
      }
    },
    
    get: async (url: string, config?: AxiosRequestConfig): Promise<any> => {
      console.log(`📥 Mock GET: ${url}`);
      
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // پاسخ‌های از پیش تعریف شده برای endpointهای مختلف
      if (url.includes('/users/me/')) {
        const user = localStorage.getItem('user');
        return {
          data: user ? JSON.parse(user) : null,
          status: 200,
          statusText: 'OK'
        };
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
          statusText: 'OK'
        };
      }
      
      // پاسخ پیش‌فرض
      return {
        data: { message: 'Mock GET response' },
        status: 200,
        statusText: 'OK'
      };
    },
    
    post: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
      console.log(`📤 Mock POST: ${url}`, data);
      
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // پاسخ‌های از پیش تعریف شده
      if (url.includes('/users/login/')) {
        // همیشه موفق
        return {
          data: {
            user: {
              id: Date.now(),
              username: data?.username || 'testuser',
              email: 'test@example.com',
              first_name: 'کاربر',
              last_name: 'تستی'
            },
            access: `mock_access_token_${Date.now()}`,
            refresh: `mock_refresh_token_${Date.now()}`,
            session_id: `mock_session_${Date.now()}`
          },
          status: 200,
          statusText: 'OK'
        };
      }
      
      if (url.includes('/users/register/')) {
        // همیشه موفق
        return {
          data: {
            user: {
              id: Date.now(),
              ...data,
              is_verified: true
            },
            access: `mock_access_token_${Date.now()}`,
            refresh: `mock_refresh_token_${Date.now()}`,
            session_id: `mock_session_${Date.now()}`
          },
          status: 201,
          statusText: 'Created'
        };
      }
      
      if (url.includes('/users/logout/')) {
        // همیشه موفق
        return {
          data: { message: 'Logged out successfully' },
          status: 200,
          statusText: 'OK'
        };
      }
      
      // پاسخ پیش‌فرض
      return {
        data: { message: 'Mock POST response' },
        status: 200,
        statusText: 'OK'
      };
    },
    
    put: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
      console.log(`📝 Mock PUT: ${url}`, data);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        data: { ...data, updated_at: new Date().toISOString() },
        status: 200,
        statusText: 'OK'
      };
    },
    
    interceptors: {
      request: {
        use: (onFulfilled?: any, onRejected?: any) => {
          // شبیه‌سازی interceptor
        }
      },
      response: {
        use: (onFulfilled?: any, onRejected?: any) => {
          // شبیه‌سازی interceptor
        }
      }
    }
  };
  
  return api as AxiosInstance;
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

// API Helper Functions - Mock versions
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/users/login/', { username, password }),
  
  register: (userData: any) =>
    api.post('/users/register/', userData),
  
  logout: () =>
    api.post('/users/logout/'),
  
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