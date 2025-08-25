import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    if (isProtectedRoute) {
        if (path.startsWith('/dashboard')) {
            const auth = req.nextUrl.searchParams.get('auth_success')

            if (auth === 'true') {
                return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
            }
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