export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Log incoming requests
  console.log('Middleware handling:', pathname);

  // If it's an API request, let it through
  if (pathname.startsWith('/api/')) {
    return;
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|favicon.ico).*)'
  ],
} 