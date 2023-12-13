'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { Locale } from '@/i18n.config';
import { useParams } from 'next/navigation';
import React from 'react';

type EditDetailWithIdProps = {
	lang: Locale;
	translate: {
		title: string;
		submit: string;
		upload: string;
		field: {
			avatar: string;
			firstName: string;
			lastName: string;
			email: string;
		};
		validation: {
			required: string;
			email: string;
		};
	};
};

const EditDetailWithId = ({ translate, lang }: EditDetailWithIdProps) => {
	const employeeData = useEmployeeData();

	const params = useParams();

	return (
		<EmployeeDetailsForm
			lang={lang}
			translate={translate}
			initialValues={{
				id: +params.id,
				firstName: employeeData.firstName,
				lastName: employeeData.lastName,
				email: employeeData.email,
				avatar: employeeData.avatar,
			}}
		/>
	);
};

export default EditDetailWithId;
