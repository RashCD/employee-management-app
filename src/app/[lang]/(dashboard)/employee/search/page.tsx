import React from 'react';
import EditDetail from './EditDetail';
import { Users, getEmployeeList } from '../api';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

const getEmployees = async (): Promise<Users> => {
	const result = await getEmployeeList();

	return result;
};

type PageProps = {
	params: {
		lang: Locale;
	};
};

const Page = async ({ params }: PageProps) => {
	const result = await getEmployees();

	const { page } = await getDictionary(params.lang);

	return (
		<EditDetail
			employees={result.data}
			translate={page.employee}
			lang={params.lang}
		/>
	);
};

export default Page;
