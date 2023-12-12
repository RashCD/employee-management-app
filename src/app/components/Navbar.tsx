'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { convertImage, toBase64 } from '@/helpers/image';
import { usePathname } from 'next/navigation';

const NavbarLink = [
	{
		name: 'List',
		path: '/employee/list',
	},
	{
		name: 'Add',
		path: '/employee/add',
	},
	{
		name: 'Edit',
		path: '/employee/edit',
	},
	{
		name: 'Search',
		path: '/employee/search',
	},
];

const Navbar = () => {
	const pathname = usePathname();

	return (
		<>
			<h1>Employee Dashboard</h1>
			<nav>
				<Link href="/employee">
					<Image
						src={'/logo.svg'}
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
