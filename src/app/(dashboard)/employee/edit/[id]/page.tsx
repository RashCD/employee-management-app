'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import useEmployeeData from '@/hooks/useEmployeeData';
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
					name: employeeData.employeeName,
					age: String(employeeData.employeeAge),
					salary: String(employeeData.employeeSalary),
				}}
			/>
		</>
	);
};

export default EditDetailWithId;
