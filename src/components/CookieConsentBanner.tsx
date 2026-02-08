'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type ConsentState = 'accepted' | 'rejected' | 'unset';

const CONSENT_STORAGE_KEY = 'cookie-consent';
const GTM_ID = 'GTM-PMFF72WN';
const GA_ID = 'G-Q6XR0F8VLL';

interface CookieConsentBannerProps {
  locale: Locale;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ locale }) => {
  const [consent, setConsent] = useState<ConsentState>('unset');
  const t = getDictionary(locale);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
    }
  }, []);

  useEffect(() => {
    if (consent !== 'accepted' || typeof window === 'undefined') {
      return;
    }

    if (document.getElementById('gtm-script')) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const gtmScript = document.createElement('script');
    gtmScript.id = 'gtm-script';
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(gtmScript);

    const gaScript = document.createElement('script');
    gaScript.id = 'ga-script';
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gaScript);

    const gaInit = document.createElement('script');
    gaInit.id = 'ga-init';
    gaInit.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(gaInit);
  }, [consent]);

  const handleAccept = () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    setConsent('accepted');
  };

  const handleReject = () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected');
    setConsent('rejected');
  };

  return (
    <>
      {consent === 'accepted' && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}

      {consent === 'unset' && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:bottom-6 md:left-6 md:right-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-foreground">
              <p className="font-semibold">{locale === 'pl' ? 'Używamy ciasteczek' : 'We use cookies'}</p>
              <p className="text-foreground-accent">
                {t.cookies.message}{' '}
                <Link 
                  href={`/${locale}/polityka-prywatnosci`} 
                  className="text-primary hover:underline"
                >
                  {t.footer.privacyPolicy}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleReject}
                className="rounded-full border border-foreground px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-white"
                aria-label={locale === 'pl' ? 'Odrzuć ciasteczka analityczne' : 'Reject analytics cookies'}
              >
                {t.cookies.reject}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                aria-label={locale === 'pl' ? 'Zaakceptuj ciasteczka analityczne' : 'Accept analytics cookies'}
              >
                {t.cookies.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
