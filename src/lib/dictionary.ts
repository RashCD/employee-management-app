import { Locale } from '@/i18n.config';
import 'server-only';

export const dictionaries = {
	en: () => import('@/dictionaries/en.json').then((module) => module.default),
	ms: () => import('@/dictionaries/ms.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
