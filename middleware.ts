import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    if (isProtectedRoute) {
        const token = req.cookies.get('jwt')?.value
        const header = req.headers.get('Set-Cookie')

        if (!token && !header) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}