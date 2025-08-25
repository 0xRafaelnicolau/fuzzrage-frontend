import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    if (isProtectedRoute) {
        // Allow access if auth_success=true query parameter is present
        const authSuccess = req.nextUrl.searchParams.get('auth_success')
        if (authSuccess === 'true') {
            return NextResponse.next()
        }

        const token = req.cookies.get('jwt')?.value

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}