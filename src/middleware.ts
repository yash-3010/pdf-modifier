import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './helpers/verifyToken';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = pathname === '/login' || pathname === '/signup';

    // verify token
    const verifiedToken = await verifyToken(request).catch((err) => {
        console.error(err.message)
      })

      console.log(verifiedToken);

    if(!isPublic && verifiedToken===undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(isPublic && !verifiedToken===undefined) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/signup',
        '/login',
        
        '/downloadPdf(.*)',
        '/modifyPdf(.*)',
    ]
}
