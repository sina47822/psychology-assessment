// providers/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthContextType } from '@/types/types';
import api from '@/lib/api';

// Context ایجاد
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// هوک برای دسترسی آسان
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // بارگذاری اولیه اطلاعات از localStorage
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('access_token');
        const storedSession = localStorage.getItem('session_id');

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setAccessToken(storedToken);
          
          if (storedSession && storedSession !== 'null') {
            setSessionId(storedSession);
            // اضافه کردن session به کوکی برای درخواست‌های بعدی
            document.cookie = `sessionid=${storedSession}; path=/; SameSite=Lax`;
          }
          
          setIsAuthenticated(true);
          
          // بررسی session در سرور
          const sessionValid = await checkSession();
          if (!sessionValid) {
            console.warn('Session is not valid, logging out...');
            logout();
          }
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // بررسی وضعیت سشن در سرور
  const checkSession = async (): Promise<boolean> => {
    try {
      const response = await api.get('/users/debug-session/');
      console.log('🔍 Session check result:', response.data);
      return response.data.user_authenticated;
    } catch (error) {
      console.error('Session check failed:', error);
      return false;
    }
  };

  // login
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/users/login/', {
        username,
        password,
      });

      const { user, access, refresh, session_id } = response.data;

      // ذخیره در localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // ذخیره session_id
      if (session_id) {
        localStorage.setItem('session_id', session_id);
        setSessionId(session_id);
        // اضافه کردن session به کوکی
        document.cookie = `sessionid=${session_id}; path=/; SameSite=Lax`;
      }

      // به‌روزرسانی state
      setUser(user);
      setAccessToken(access);
      setIsAuthenticated(true);

      // بررسی سشن در سرور
      await checkSession();

      return { success: true, user };
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          error: 'خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.',
        };
      }
      return {
        success: false,
        error: error.response?.data?.detail || 'خطا در ورود',
      };
    } finally {
      setIsLoading(false);
    }
  };

  // لاگ‌اوت
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        await api.post('/users/logout/', { refresh: refreshToken });
      }

      // پاک کردن localStorage و کوکی‌ها
      clearAuthData();

      // به‌روزرسانی state
      setUser(null);
      setAccessToken(null);
      setSessionId(null);
      setIsAuthenticated(false);

      // پاک کردن کوکی sessionid
      document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // هدایت به صفحه اصلی
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // حتی در صورت خطا، داده‌های محلی پاک می‌شوند
      clearAuthData();
      setUser(null);
      setAccessToken(null);
      setSessionId(null);
      setIsAuthenticated(false);
      router.push('/');
    }
  };

  // ثبت‌نام
  // providers/AuthProvider.tsx - تابع register
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      console.log('📤 Sending registration data:', userData);
      
      // برای اطمینان، فیلدهای خالی را حذف می‌کنیم
      const cleanedData = { ...userData };
      
      // حذف فیلدهای خالی رشته‌ای
      Object.keys(cleanedData).forEach(key => {
        if (typeof cleanedData[key] === 'string' && cleanedData[key].trim() === '') {
          cleanedData[key] = null;
        }
      });
      
      // حذف فیلد confirm_password اگر خالی است
      if (cleanedData.confirm_password === null) {
        delete cleanedData.confirm_password;
      }
      
      const response = await api.post('/users/register/', cleanedData);
      console.log('✅ Registration response:', response.data);
      
      if (response.data.user && response.data.access) {
        const { user, access, refresh, session_id } = response.data;
        
        // ذخیره در localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        
        // ذخیره session_id
        if (session_id) {
          localStorage.setItem('session_id', session_id);
          setSessionId(session_id);
          
          // تنظیم کوکی sessionid برای مرورگر
          document.cookie = `sessionid=${session_id}; path=/; max-age=86400; SameSite=Lax`;
        }
        
        // تنظیم state
        setUser(user);
        setAccessToken(access);
        setIsAuthenticated(true);
        
        // تنظیم توکن برای درخواست‌های بعدی
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        
        // بررسی سشن در سرور
        await checkSession();
      }
      
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('❌ Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      // هندل کردن خطاهای مختلف
      if (!error.response) {
        return {
          success: false,
          error: { detail: 'خطا در اتصال به سرور' },
        };
      }
      
      if (error.response?.status === 400) {
        return {
          success: false,
          error: error.response.data || { detail: 'داده‌های ورودی نامعتبر است.' },
        };
      }
      
      if (error.response?.status === 500) {
        return {
          success: false,
          error: { detail: 'خطای سرور. لطفاً بعداً تلاش کنید.' },
        };
      }
      
      return {
        success: false,
        error: error.response?.data || { detail: 'خطا در ثبت‌نام' },
      };
    } finally {
      setIsLoading(false);
    }
  };

  // بروزرسانی پروفایل
  const updateProfile = async (profileData: any) => {
    try {
      const response = await api.put('/users/me/', profileData);
      
      // به‌روزرسانی localStorage
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // به‌روزرسانی state
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.response?.data || 'خطا در بروزرسانی پروفایل',
      };
    }
  };

  // پاک کردن داده‌های احراز هویت
  const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('session_id');
  };

  // رفرش توکن
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/users/token/refresh/', {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      
      // ذخیره توکن جدید
      localStorage.setItem('access_token', newAccessToken);
      setAccessToken(newAccessToken);
      
      return newAccessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  // بررسی دوره‌ای سشن
  useEffect(() => {
    if (!isAuthenticated || pathname === '/login' || pathname === '/register') return;

    const checkAuthInterval = setInterval(async () => {
      const isValid = await checkSession();
      if (!isValid) {
        console.log('Session expired, logging out...');
        logout();
      }
    }, 5 * 60 * 1000); // هر 5 دقیقه

    return () => clearInterval(checkAuthInterval);
  }, [isAuthenticated, pathname]);

  // مقدار context
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    login,
    logout,
    register,
    updateProfile,
    refreshAccessToken,
    checkSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};