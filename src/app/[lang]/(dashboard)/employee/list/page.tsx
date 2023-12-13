import EmployeeTable from '@/app/components/EmployeeTable';
import React from 'react';
import { Employee, getEmployeeList } from '../api';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export const generateStaticParams = async () => {
	const employees = await getEmployeeList();

	return employees.data.map((employee: Employee) => ({
		id: String(employee.id),
	}));
};

type PageProps = {
	params: {
		lang: Locale;
	};
};

const Page = async ({ params }: PageProps) => {
	const { page } = await getDictionary(params.lang);

	return <EmployeeTable lang={params.lang} translate={page.table} />;
};

export default Page;
