// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { APP_INFO, CONTACT_INFO } from '@/data/constants'
import { AuthProvider } from '@/providers/AuthProvider'

export const metadata: Metadata = {
  title: 'سامانه ارزیابی رفتاری نوجوانان',
  description: 'پروژه ارزیابی و سنجش رفتاری برای نوجوانان',
  keywords: ['روانشناسی', 'نوجوانان', 'ارزیابی', 'مشاوره'],
  authors: [{ name: 'مرکز مشاوره نوجوانان' }],
  creator: CONTACT_INFO.organization,
  publisher: CONTACT_INFO.organization,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vazirmatn@33.003/font.css" />
        <meta name="version" content={APP_INFO.version} />
        <meta name="last-update" content={APP_INFO.lastUpdate} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // بررسی session در localStorage هنگام لود صفحه
              (function() {
                const sessionId = localStorage.getItem('session_id');
                if (sessionId && sessionId !== 'null') {
                  // کوکی sessionid را به صورت خودکار برای تمام درخواست‌ها اضافه می‌کنیم
                  document.cookie = 'sessionid=' + sessionId + '; path=/; SameSite=Lax';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-gray-50">
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-50">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}