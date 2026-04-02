import { updateSession } from './app/utils/supabase/middleware'

export async function middleware(request) {
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next.js internals.
     * The pattern below skips _next/static, _next/image, favicon.ico,
     * and any file with an extension (e.g. .svg, .png).
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
