import {getRequestConfig} from 'next-intl/server';

const SUPPORTED_LOCALES = ['id', 'en'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: SupportedLocale = 'id';

export default getRequestConfig(async ({locale}) => {
  const safeLocale = (SUPPORTED_LOCALES as readonly string[]).includes(locale as string)
    ? (locale as SupportedLocale)
    : DEFAULT_LOCALE;

  const messages = (await import(`./messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages
  };
});


