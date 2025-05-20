import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const studentAuth = request.cookies.get("student-auth");
  const adminAuthRaw = request.cookies.get("admin-auth")?.value;
  const path = request.nextUrl.pathname;

  // 1. Student auth tekshiruvi
  if (!studentAuth && path.startsWith("/student")) {
    return NextResponse.redirect(new URL("/logstudent", request.url));
  }

  // 2. Admin auth mavjud emas — dashboard yoki crm sahifalariga yo‘naltirmaslik
  if (
    !adminAuthRaw &&
    (path.startsWith("/dashboard") || path.startsWith("/crm"))
  ) {
    return NextResponse.redirect(new URL("/reception", request.url));
  }

  // 3. Agar admin bo‘lsa va reception sahifasiga kirmoqchi bo‘lsa, uni tegishli panelga yo‘naltiramiz
  if (adminAuthRaw && path === "/reception") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (path.startsWith("/crm")) {
    try {
      const decoded = decodeURIComponent(adminAuthRaw!);
      const parsed = JSON.parse(decoded);
      const role = parsed?.role;

      if (role !== "owner" && role !== "coinx") {
        return NextResponse.redirect(new URL("/reception", request.url));
      }
    } catch (error) {
      console.error("Invalid CRM access", error);
      return NextResponse.redirect(new URL("/reception", request.url));
    }
  }

  // 4. CRM sahifasiga faqat owner kirishi kerak

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/dashboard/:path*",
    "/reception",
    "/crm/:path*",
  ],
};
