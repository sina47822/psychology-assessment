// app/test/api/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api, { testAPIConnection } from '@/lib/api';

export default function APITestPage() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loginResult, setLoginResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // تست اتصال اولیه
  useEffect(() => {
    const testConnection = async () => {
      const isConnected = await testAPIConnection();
      setConnectionStatus(isConnected ? '✅ Connected' : '❌ Disconnected');
    };
    
    testConnection();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/session/check/');
      setSessionData(response.data);
    } catch (error: any) {
      setSessionData({
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/users/login/', {
        username: 'test', // یک کاربر تستی در دیتابیس داشته باشید
        password: 'test123',
      });
      setLoginResult({ success: true, data: response.data });
      
      // ذخیره در localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('session_id', response.data.session_id);
      
      console.log('Login successful:', response.data);
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setLoginResult({
        success: false,
        error: error.response?.data || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearStorage = () => {
    localStorage.clear();
    setSessionData(null);
    setLoginResult(null);
    alert('LocalStorage cleared!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>API Connection Test</h1>
      
      <div style={{ margin: '20px 0', padding: '10px', background: '#f0f0f0' }}>
        <h2>Connection Status: {connectionStatus}</h2>
        <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={checkSession} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px' }}
        >
          Check Session
        </button>
        
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px' }}
        >
          Test Login
        </button>
        
        <button 
          onClick={clearStorage}
          style={{ padding: '10px', background: '#ffcccc' }}
        >
          Clear Storage
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {sessionData && (
        <div style={{ margin: '20px 0', padding: '10px', background: '#e6f7ff' }}>
          <h3>Session Data:</h3>
          <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        </div>
      )}

      {loginResult && (
        <div style={{ margin: '20px 0', padding: '10px', background: loginResult.success ? '#e6ffe6' : '#ffe6e6' }}>
          <h3>Login Result:</h3>
          <pre>{JSON.stringify(loginResult, null, 2)}</pre>
        </div>
      )}

      <div style={{ margin: '20px 0', padding: '10px', background: '#fff3cd' }}>
        <h3>LocalStorage Status:</h3>
        <ul>
          <li>User: {localStorage.getItem('user') ? '✅ Present' : '❌ Missing'}</li>
          <li>Access Token: {localStorage.getItem('access_token') ? '✅ Present' : '❌ Missing'}</li>
          <li>Refresh Token: {localStorage.getItem('refresh_token') ? '✅ Present' : '❌ Missing'}</li>
          <li>Session ID: {localStorage.getItem('session_id') || '❌ Missing'}</li>
        </ul>
      </div>

      <div style={{ margin: '20px 0', padding: '10px', background: '#d4edda' }}>
        <h3>Debug Steps:</h3>
        <ol>
          <li>مطمئن شوید Django سرور روی پورت 8000 در حال اجراست: <code>python manage.py runserver</code></li>
          <li>مطمئن شوید CORS درست تنظیم شده است</li>
          <li>یک کاربر تستی در دیتابیس داشته باشید</li>
          <li>در کنسول مرورگر، Network tab را چک کنید</li>
        </ol>
      </div>
    </div>
  );
}