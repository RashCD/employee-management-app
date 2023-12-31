import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MuiThemeProvider from '@/provider/MuiThemeProvider';
import { Locale, i18n } from '@/i18n.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
	children,
	params: { lang },
}: {
	children: React.ReactNode;
	params: { lang: Locale };
}) {
	return (
		<html lang={lang}>
			<body className={inter.className}>
				<MuiThemeProvider>{children}</MuiThemeProvider>
			</body>
		</html>
	);
}
