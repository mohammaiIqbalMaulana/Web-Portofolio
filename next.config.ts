import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Hubungkan dengan request config next-intl (lokasi file)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
