import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'سامانه ارزیابی رفتاری و روانشناسی نوجوانان',
  description: 'پروژه ارزیابی و سنجش رفتاری برای نوجوانان',
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
      </head>
      <body className="bg-gray-50">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}