import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = {
  window: 60 * 1000, // 1 minute
  maxRequests: {
    authenticated: 500,
    unauthenticated: 50,
  },
};

const cache = new Map();

export function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const token = request.cookies.get("auth-token");
  const key = `${ip}-${token ? "auth" : "unauth"}`;
  const now = Date.now();

  // Rate limiting
  const requestLog = cache.get(key) || [];
  const recentRequests = requestLog.filter((time) => time > now - rateLimit.window);
  const maxRequests = token ? rateLimit.maxRequests.authenticated : rateLimit.maxRequests.unauthenticated;

  if (recentRequests.length >= maxRequests) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Too many requests. Please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  recentRequests.push(now);
  cache.set(key, recentRequests);

  // Clean up old entries
  if (cache.size > 10000) {
    const oldestAllowedTime = now - rateLimit.window;
    for (const [key, times] of cache.entries()) {
      const validTimes = times.filter((time) => time > oldestAllowedTime);
      if (validTimes.length === 0) {
        cache.delete(key);
      } else {
        cache.set(key, validTimes);
      }
    }
  }

  // Auth check for dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      const redirectUrl = new URL("/get-started", request.url);
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
