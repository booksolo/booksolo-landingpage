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

const GTM_ID = 'GTM-PMFF72WN';
const GA_ID = 'G-L8JGN50FYP';

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <html lang={params.locale}>
      <head>
        {/* Set consent defaults before any tag fires — analytics denied until user accepts */}
        <Script id="gtag-consent-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
        `}</Script>
        {/* GA4 */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
        {/* GTM loads unconditionally — consent mode controls what fires inside it */}
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      </head>
      <body className={`${manrope.className} ${sourceSans.className} antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header locale={params.locale} />
        <main>{children}</main>
        <Footer locale={params.locale} />
        <CookieConsentBanner locale={params.locale} />
      </body>
    </html>
  );
}
