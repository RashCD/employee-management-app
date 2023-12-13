import React from 'react';
import EditDetailWithId from './EditDetailWithId';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

type PageProps = {
	params: {
		lang: Locale;
	};
};

const Page = async ({ params }: PageProps) => {
	const { page } = await getDictionary(params.lang);

	return <EditDetailWithId lang={params.lang} translate={page.form} />;
};

export default Page;
