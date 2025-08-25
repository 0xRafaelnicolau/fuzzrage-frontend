import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/data'

const protectedRoutes = ['/dashboard']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    if (isProtectedRoute) {
        const user = await getUser()

        if (!user) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}