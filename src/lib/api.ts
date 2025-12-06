// lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ایجاد instance از axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Interceptor برای اضافه کردن توکن و session
api.interceptors.request.use(
  (config) => {
    // فقط در سمت کلاینت
    if (typeof window !== 'undefined') {
      // اضافه کردن توکن JWT
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // اضافه کردن session_id از localStorage به صورت دستی در کوکی
      const sessionId = localStorage.getItem('session_id');
      if (sessionId && sessionId !== 'null') {
        // اگر کوکی sessionid وجود ندارد، آن را اضافه می‌کنیم
        if (!document.cookie.includes('sessionid')) {
          document.cookie = `sessionid=${sessionId}; path=/; SameSite=Lax`;
        }
      }
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor برای مدیریت خطاها
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // اگر پاسخ حاوی session_id جدید است، آن را ذخیره کنید
    if (response.data?.session_id) {
      localStorage.setItem('session_id', response.data.session_id);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Check if it's a network error
    if (!error.response) {
      console.error('❌ Network Error:', {
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        },
      });
      console.error('Please check if the server is running and accessible.');
    } else {
      console.error('❌ API Error Details:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
        requestHeaders: error.config?.headers,
      });
    }
    
    const originalRequest = error.config as any;
    
    // اگر خطا 401 بود
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // سعی در رفرش توکن
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
          console.log('Attempting token refresh...');
          const response = await api.post('/users/token/refresh/', {
            refresh: refreshToken,
          });
          
          const newAccessToken = response.data.access;
          
          // ذخیره توکن جدید
          localStorage.setItem('access_token', newAccessToken);
          console.log('Token refreshed successfully');
          
          // تکرار درخواست اصلی با توکن جدید
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // پاک کردن localStorage و ریدایرکت به login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('session_id');
          document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// API Helper Functions
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