"use client";
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{t('title')} <span className="text-primary">Nama Anda</span></h1>
      <p className="text-muted-foreground">{t('subtitle')}</p>
    </main>
  );
}


