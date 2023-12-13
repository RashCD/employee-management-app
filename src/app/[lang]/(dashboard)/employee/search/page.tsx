import React from 'react';
import EditDetail from './EditDetail';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

type PageProps = {
	params: {
		lang: Locale;
	};
};

const Page = async ({ params }: PageProps) => {
	const { page } = await getDictionary(params.lang);

	return <EditDetail translate={page.employee} lang={params.lang} />;
};

export default Page;
