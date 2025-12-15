'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Smartphone, User as UserIcon } from 'lucide-react';
import { identifyLoginType } from '@/lib/utils';

interface LoginFormProps {
  onSubmit: (data: { identifier: string; password: string }) => void;
  isLoading: boolean;
  error: string;
}

export default function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ identifier, password });
  };

  const getIdentifierIcon = () => {
    const type = identifyLoginType(identifier);
    switch (type) {
      case 'phone': return <Smartphone className="h-5 w-5" />;
      case 'email': return <Mail className="h-5 w-5" />;
      case 'username': return <UserIcon className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          ایمیل / نام کاربری / شماره موبایل
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {getIdentifierIcon()}
          </div>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="example@email.com یا username یا 09123456789"
            required
            dir="ltr"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          می‌توانید با ایمیل، نام کاربری یا شماره موبایل وارد شوید
        </p>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          رمز عبور
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-12 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="رمز عبور"
            required
            dir="ltr"
          />
        </div>
        <div className="mt-2">
          <Link 
            href="/forgot-password" 
            className="text-sm text-sky-500 hover:text-sky-800 transition-colors"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ${
            isLoading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-sky-700 shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              در حال ورود...
            </span>
          ) : (
            'ورود به سیستم'
          )}
        </button>

        <div className="text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{' '}
          <Link 
            href="/register" 
            className="text-sky-500 font-medium hover:text-sky-800 transition-colors"
          >
            ثبت نام کنید
          </Link>
        </div>
      </div>
    </form>
  );
}