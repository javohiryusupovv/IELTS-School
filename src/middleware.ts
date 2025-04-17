// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const studentAuth = request.cookies.get("student-auth");

  // Agar student-auth cookie yo'q va u /student sahifasiga kirmoqchi bo‘lsa:
  if (!studentAuth && request.nextUrl.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/logstudent", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*'], // faqat /student ostidagi sahifalarni tekshiradi
};
