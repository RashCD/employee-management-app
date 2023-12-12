'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
	const { id } = useParams<{ id: string }>();

	const router = useRouter();

	useEffect(() => {
		if (!id) {
			router.push('/employee/search');
		}
	}, [id, router]);

	return;
};

export default Page;
