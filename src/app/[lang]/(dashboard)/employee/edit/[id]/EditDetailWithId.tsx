'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { useParams } from 'next/navigation';
import React from 'react';

type EditDetailWithIdProps = {
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

const EditDetailWithId = ({ translate }: EditDetailWithIdProps) => {
	const employeeData = useEmployeeData();

	const params = useParams();

	return (
		<EmployeeDetailsForm
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
