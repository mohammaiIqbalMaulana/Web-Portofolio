const locales = ['id', 'en'] as const;
type Locale = (typeof locales)[number];

const defaultLocale: Locale = 'id';

const config = {
  locales: Array.from(locales),
  defaultLocale
};

export default config;


