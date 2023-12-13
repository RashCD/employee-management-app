'use client';

import { Locale } from '@/i18n.config';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
	const { id, lang } = useParams<{ id: string; lang: Locale }>();

	const router = useRouter();

	useEffect(() => {
		if (!id) {
			router.push(`/${lang}/employee/search`);
		}
	}, [id, lang, router]);

	return;
};

export default Page;
