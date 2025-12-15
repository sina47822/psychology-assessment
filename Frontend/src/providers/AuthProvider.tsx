// src/providers/AuthProvider.tsx - نسخه تستی
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthContextType } from '@/types/types';
import { TEST_USERS, FIXED_OTP, NETWORK_DELAY, AUTH_ERRORS } from '@/data/constants';

// شبیه‌سازی تأخیر شبکه
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

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
  const [is_authenticated, setis_authenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // بارگذاری اولیه اطلاعات از localStorage
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        await simulateNetworkDelay();
        
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('access_token');
        const storedSession = localStorage.getItem('session_id');

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setAccessToken(storedToken);
          
          if (storedSession && storedSession !== 'null') {
            setSessionId(storedSession);
          }
          
          setis_authenticated(true);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // login - نسخه تستی
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await simulateNetworkDelay();
      
      // در محیط تستی، هر رمزی قابل قبول است
      // یا کاربران مشخصی را چک می‌کنیم
      let foundUser: User | undefined = TEST_USERS.find(u => 
        u.username === username || 
        u.email === username || 
        u.phone === username
      );

      if (!foundUser) {
        // ایجاد یک کاربر تستی جدید
        foundUser = {
          id: Date.now(),
          username,
          email: username.includes('@') ? username : `${username}@example.com`,
          phone: username.startsWith('09') ? username : '09123456789',
          first_name: 'کاربر',
          last_name: 'تستی',
          full_name: 'کاربر تستی',
          national_code: '0012345678',
          birth_date: '1380-01-01',
          gender: 'male' as 'male' | 'female' | null,
          province: 'تهران',
          city: 'تهران',
          address: 'تهران',
          is_verified: true,
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
            education_level: 'دیپلم',
            field_of_study: 'ریاضی',
            occupation: 'دانشجو',
            emergency_contact_name: 'پدر',
            emergency_contact_phone: '09123456788',
            emergency_contact_relation: 'پدر',
            preferred_language: 'fa',
            timezone: 'Asia/Tehran',
            notify_new_assessment: true,
            notify_results_ready: true,
            notify_workshop: true,
            notify_newsletter: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          assessmentCompleted: false,
          level: 'beginner',
          total_points: '0'
        };
      }

      // ایجاد توکن تستی
      const mockAccessToken = `mock_access_token_${Date.now()}`;
      const mockRefreshToken = `mock_refresh_token_${Date.now()}`;
      const mockSessionId = `mock_session_${Date.now()}`;

      // ذخیره در localStorage
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('access_token', mockAccessToken);
      localStorage.setItem('refresh_token', mockRefreshToken);
      localStorage.setItem('session_id', mockSessionId);

      // به‌روزرسانی state
      setUser(foundUser);
      setAccessToken(mockAccessToken);
      setSessionId(mockSessionId);
      setis_authenticated(true);

      console.log('✅ Test login successful:', foundUser.username);

      return { success: true, user: foundUser };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || AUTH_ERRORS.invalidCredentials,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // لاگ‌اوت - نسخه تستی
  const logout = async () => {
    try {
      await simulateNetworkDelay();
      
      // پاک کردن localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('session_id');

      // به‌روزرسانی state
      setUser(null);
      setAccessToken(null);
      setSessionId(null);
      setis_authenticated(false);

      console.log('✅ Test logout successful');
      
      // هدایت به صفحه اصلی
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // حتی در صورت خطا، داده‌های محلی پاک می‌شوند
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('session_id');
      setUser(null);
      setAccessToken(null);
      setSessionId(null);
      setis_authenticated(false);
      router.push('/');
    }
  };

  // ثبت‌نام - نسخه تستی
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      await simulateNetworkDelay();
      
      console.log('📤 Test registration data:', userData);
      
      // ایجاد کاربر جدید
      const newUser: User = {
        id: Date.now(),
        username: userData.username,
        email: userData.email || `${userData.username}@example.com`,
        phone: userData.phone || '09123456789',
        first_name: userData.first_name || 'کاربر',
        last_name: userData.last_name || 'جدید',
        full_name: `${userData.first_name || 'کاربر'} ${userData.last_name || 'جدید'}`,
        national_code: userData.national_code || null,
        birth_date: userData.birth_date || null,
        gender: userData.gender || null,
        province: null,
        city: null,
        address: null,
        is_verified: true, // در تست، همه کاربران تأیید شده‌اند
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
        assessmentCompleted: false,
        level: 'beginner',
        total_points: '0'
      };

      // ایجاد توکن تستی
      const mockAccessToken = `mock_access_token_${Date.now()}`;
      const mockRefreshToken = `mock_refresh_token_${Date.now()}`;
      const mockSessionId = `mock_session_${Date.now()}`;

      // ذخیره در localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('access_token', mockAccessToken);
      localStorage.setItem('refresh_token', mockRefreshToken);
      localStorage.setItem('session_id', mockSessionId);

      // به‌روزرسانی state
      setUser(newUser);
      setAccessToken(mockAccessToken);
      setSessionId(mockSessionId);
      setis_authenticated(true);

      console.log('✅ Test registration successful:', newUser.username);

      return { 
        success: true, 
        data: {
          user: newUser,
          access: mockAccessToken,
          refresh: mockRefreshToken,
          session_id: mockSessionId
        } 
      };
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      return {
        success: false,
        error: error.message || 'خطا در ثبت‌نام',
      };
    } finally {
      setIsLoading(false);
    }
  };

  // بروزرسانی پروفایل - نسخه تستی
  const updateProfile = async (profileData: any) => {
    try {
      await simulateNetworkDelay();
      
      if (!user) {
        throw new Error('User not found');
      }

      // به‌روزرسانی کاربر
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // به‌روزرسانی state
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.message || 'خطا در بروزرسانی پروفایل',
      };
    }
  };

  // رفرش توکن - نسخه تستی
  const refreshAccessToken = async () => {
    try {
      await simulateNetworkDelay();
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // ایجاد توکن جدید
      const newAccessToken = `mock_access_token_${Date.now()}`;
      
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

  // بررسی سشن - نسخه تستی
  const checkSession = async (): Promise<boolean> => {
    try {
      await simulateNetworkDelay();
      
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      
      // اگر توکن و کاربر وجود دارند، سشن معتبر است
      return !!(token && storedUser);
    } catch (error) {
      console.error('Session check failed:', error);
      return false;
    }
  };

  // مقدار context
  const contextValue: AuthContextType = {
    user,
    is_authenticated,
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