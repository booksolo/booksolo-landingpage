import type { Metadata } from 'next';
import Script from 'next/script';
import { Source_Sans_3, Manrope } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

import '../globals.css';

const manrope = Manrope({ subsets: ['latin', 'latin-ext'] });
const sourceSans = Source_Sans_3({ subsets: ['latin', 'latin-ext'] });

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const t = getDictionary(params.locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <html lang={params.locale}>
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.booksolo.eu" crossOrigin="anonymous" />
      </head>
      <body className={`${manrope.className} ${sourceSans.className} antialiased`}>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
        <Header locale={params.locale} />
        <main>{children}</main>
        <Footer locale={params.locale} />
        <CookieConsentBanner locale={params.locale} />
      </body>
    </html>
  );
}
