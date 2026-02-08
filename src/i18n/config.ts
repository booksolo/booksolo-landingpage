export const defaultLocale = 'en' as const;
export const locales = ['en', 'pl'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  pl: 'PL',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
