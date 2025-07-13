import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-location", request.nextUrl.pathname + request.nextUrl.search);

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
