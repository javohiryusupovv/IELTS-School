// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const studentAuth = request.cookies.get("student-auth");
  const adminAuth = request.cookies.get("admin-auth")?.value;
  const path = request.nextUrl.pathname;
  // Agar student-auth cookie yo'q va u /student sahifasiga kirmoqchi bo‘lsa:
  if (!studentAuth && request.nextUrl.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/logstudent", request.url));
  }

  if (!adminAuth && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/reception", request.url));
  }

  // ✅ Agar tizimga kirgan bo‘lsa va login sahifasiga qaytmoqchi bo‘lsa, uni dashboardga qaytaramiz
  if (adminAuth && path === "/reception") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/dashboard/:path*', '/reception'],
};
