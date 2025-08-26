import createMiddleware from 'next-intl/middleware';
import nextIntlConfig from './next-intl.config';
import {authGuard} from '@/middleware-auth';

const i18nMiddleware = createMiddleware(nextIntlConfig);

export default async function middleware(req: Request) {
  // Jalankan i18n middleware dahulu
  // @ts-expect-error Next types
  const i18nResponse = await i18nMiddleware(req);
  // Proteksi /admin setelah i18n menentukan locale di URL
  const url = new URL(req.url);
  const path = url.pathname;
  if (/^\/(id|en)\/admin(\/.*)?$/.test(path)) {
    // @ts-expect-error Next types
    return authGuard(req as any);
  }
  return i18nResponse;
}

export const config = {
  matcher: ['/', '/(id|en)/:path*']
};


