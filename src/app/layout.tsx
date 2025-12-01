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
      </head>
      <body className="bg-gray-50">
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}