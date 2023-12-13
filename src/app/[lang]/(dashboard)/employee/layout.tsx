import React, { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import { getEmployeeList } from './api';
import EmployeesProvider from '@/provider/EmployeesProvider';

interface LayoutProps {
	children: ReactNode;
	params: {
		lang: Locale;
	};
}

const Layout = async ({ children, params }: LayoutProps) => {
	const { lang } = params;
	const { page } = await getDictionary(lang);
	const { data } = await getEmployeeList();

	return (
		<EmployeesProvider employees={data}>
			<Navbar lang={lang} translate={page.navbar} />
			<main>{children}</main>
		</EmployeesProvider>
	);
};

export default Layout;
