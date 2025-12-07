// app/test/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export default function TestPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('Test page loaded');
    addLog(`User: ${user ? 'Logged in' : 'Not logged in'}`);
    addLog(`Loading: ${isLoading}`);
    addLog(`Token: ${localStorage.getItem('access_token') ? 'Present' : 'Missing'}`);
    addLog(`User data: ${localStorage.getItem('user')}`);
  }, [user, isLoading]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Test Authentication</h1>
      
      <div className="mb-6">
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-sky-500 text-white px-4 py-2 rounded mr-4"
        >
          Go to Dashboard
        </button>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Storage
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Auth State</h2>
          <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
          <p>Loading: {isLoading ? '⏳ Yes' : '✅ No'}</p>
          <p>Token: {localStorage.getItem('access_token') ? '✅ Present' : '❌ Missing'}</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">User Info</h2>
          <pre className="text-xs">
            {JSON.stringify(user, null, 2) || 'No user data'}
          </pre>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Logs</h2>
        <div className="h-64 overflow-y-auto bg-gray-50 p-2 rounded">
          {logs.map((log, index) => (
            <div key={index} className="text-sm font-mono border-b py-1">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}