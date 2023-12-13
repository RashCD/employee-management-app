import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';

const Page = async ({ params }: { params: { lang: Locale } }) => {
	const { page } = await getDictionary(params.lang);

	return <EmployeeDetailsForm lang={params.lang} translate={page.form} />;
};

export default Page;
