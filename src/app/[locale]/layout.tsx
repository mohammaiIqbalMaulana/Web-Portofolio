import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Inter} from 'next/font/google';
import '../globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Portofolio',
  description: 'Portofolio Web'
};

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  if (!['id', 'en'].includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{locale: 'id'}, {locale: 'en'}];
}


