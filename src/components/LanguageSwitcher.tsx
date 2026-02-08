'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export default function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove current locale from pathname to get the base path
  const getNewPath = (newLocale: Locale) => {
    // Remove leading slash and split
    const segments = pathname.split('/').filter(Boolean);
    
    // If first segment is a locale, replace it
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      // Add locale at the beginning
      segments.unshift(newLocale);
    }
    
    return `/${segments.join('/')}`;
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
