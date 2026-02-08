import type { Locale } from './config';
import { en } from './locales/en';
import { pl } from './locales/pl';

const dictionaries = {
  en,
  pl,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale];
};
