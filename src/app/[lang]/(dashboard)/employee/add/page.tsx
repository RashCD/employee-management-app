import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';

const page = async ({ params }: { params: { lang: Locale } }) => {
	const { page } = await getDictionary(params.lang);

	return <EmployeeDetailsForm translate={page.form} />;
};

export default page;
