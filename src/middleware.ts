import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './helpers/verifyToken';

export async function middleware(request: NextRequest) {
    // const { pathname } = request.nextUrl;

    // const isPublic = pathname === '/login' || pathname === '/signup';
    // const isPrivate = pathname === '/myPdfs' || pathname === '/downloadPdf' || pathname === '/modifyPdf' || pathname === '/';

    // verify token
    const verifiedToken = await verifyToken(request).catch((err) => {
        console.error(err.message)
    })

    if (!verifiedToken && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/signup') {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    else{
        return NextResponse.next();
    }

    // else if (isPublic && verifiedToken) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    // else {
    //     return NextResponse.next();
    // }



}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/myPdfs(.*)',
        '/downloadPdf(.*)',
        '/modifyPdf(.*)',
    ]
}
