import createMiddleware from 'next-intl/middleware';
import nextIntlConfig from './next-intl.config';
import {authGuard} from '@/middleware-auth';
import type {NextRequest} from 'next/server';

const i18nMiddleware = createMiddleware(nextIntlConfig);

export default async function middleware(req: NextRequest) {
  // Jalankan i18n middleware dahulu
  const i18nResponse = await i18nMiddleware(req as any);
  // Proteksi /admin setelah i18n menentukan locale di URL
  const url = new URL(req.url);
  const path = url.pathname;
  if (/^\/(id|en)\/admin(\/.*)?$/.test(path)) {
    return authGuard(req);
  }
  return i18nResponse;
}

export const config = {
  matcher: ['/', '/(id|en)/:path*']
};


