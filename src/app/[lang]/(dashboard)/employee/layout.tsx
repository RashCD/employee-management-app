import React, { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

interface LayoutProps {
	children: ReactNode;
	params: {
		lang: Locale;
	};
}

const Layout = async ({ children, params }: LayoutProps) => {
	const { lang } = params;
	const { page } = await getDictionary(lang);

	return (
		<>
			<Navbar lang={lang} translate={page.navbar} />
			<main>{children}</main>
		</>
	);
};

export default Layout;
