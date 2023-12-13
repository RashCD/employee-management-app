'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { i18n } from '@/i18n.config';

export default function LocaleSwitcher() {
	const pathName = usePathname();

	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/';

		const segments = pathName.split('/');

		segments[1] = locale;

		return segments.join('/');
	};

	return (
		<ul className="flex gap-x-3">
			{i18n.locales.map((locale) => {
				return (
					<Link
						key={locale}
						href={redirectedPathName(locale)}
						className={
							pathName.includes(locale)
								? 'underline-offset-4'
								: 'underline-offset-4 no-underline'
						}
					>
						{locale === 'en' ? 'English' : ''}
						{locale === 'ms' ? 'Malay' : ''}
					</Link>
				);
			})}
		</ul>
	);
}
