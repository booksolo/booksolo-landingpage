'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export default function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getNewPath = (newLocale: Locale) => {
    // Before hydration, use simple locale-only path to avoid mismatch
    // Must include trailing slash to match server-rendered HTML (trailingSlash: true)
    if (!mounted) {
      return `/${newLocale}/`;
    }

    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    // Add trailing slash to match Next.js trailingSlash: true config
    return `/${segments.join('/')}/`;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const newPath = getNewPath(locale);

        return (
          <Link
            key={locale}
            href={newPath}
            className={`
              px-2.5 py-1 rounded text-sm font-semibold transition-colors uppercase
              ${isActive 
                ? 'bg-primary text-black' 
                : 'text-foreground-accent hover:text-foreground hover:bg-gray-100'
              }
            `}
            aria-current={isActive ? 'page' : undefined}
            aria-label={locale === 'en' ? 'Switch to English' : 'Przełącz na Polski'}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
