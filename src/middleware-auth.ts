import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';

export async function authGuard(req: NextRequest) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  if (!token) {
    const url = req.nextUrl;
    const locale = url.pathname.split('/')[1] || 'id';
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}


