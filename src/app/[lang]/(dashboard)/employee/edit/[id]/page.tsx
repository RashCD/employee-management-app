'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { useParams } from 'next/navigation';
import React from 'react';

const EditDetailWithId = () => {
	const employeeData = useEmployeeData();

	const params = useParams();

	return (
		<>
			<EmployeeDetailsForm
				title="Edit Employee"
				initialValues={{
					id: +params.id,
					firstName: employeeData.firstName,
					lastName: employeeData.lastName,
					email: employeeData.email,
					avatar: employeeData.avatar,
				}}
			/>
		</>
	);
};

export default EditDetailWithId;
