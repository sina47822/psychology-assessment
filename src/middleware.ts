import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl
  
  // مسیرهای عمومی که بدون لاگین قابل دسترسی هستند
  const publicPaths = ['/login', '/register', '/forgot-password', '/verify-otp']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // اگر کاربر لاگین نکرده و به صفحه غیر عمومی می‌رود، به صفحه login هدایت شود
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // اگر کاربر لاگین کرده و به صفحه login/register می‌رود، به dashboard هدایت شود
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}