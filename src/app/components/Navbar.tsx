'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { convertImage, toBase64 } from '@/helpers/image';
import { usePathname } from 'next/navigation';
import logo from '@/app/assets/logo.svg';
import { Locale } from '@/i18n.config';

type NavbarProps = {
	lang: Locale;
	translate: {
		title: string;
		add: string;
		list: string;
		edit: string;
		search: string;
	};
};

const Navbar = ({ translate, lang }: NavbarProps) => {
	const pathname = usePathname();

	const NavbarLink = [
		{
			name: translate.list,
			path: `/${lang}/employee/list`,
		},
		{
			name: translate.add,
			path: `/${lang}/employee/add`,
		},
		{
			name: translate.edit,
			path: `/${lang}/employee/edit`,
		},
		{
			name: translate.search,
			path: `/${lang}/employee/search`,
		},
	];

	return (
		<>
			<h1>{translate.title}</h1>
			<nav>
				<Link href={`/${lang}/employee`}>
					<Image
						src={logo}
						alt="logo"
						width={50}
						height={50}
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(
							convertImage(700, 475)
						)}`}
					/>
				</Link>
				{NavbarLink.map((link) => (
					<Link
						key={link.name}
						href={link.path}
						className={
							pathname.includes(link.path)
								? 'underline-offset-4'
								: 'underline-offset-4 no-underline'
						}
					>
						{link.name}
					</Link>
				))}
			</nav>
		</>
	);
};

export default Navbar;
