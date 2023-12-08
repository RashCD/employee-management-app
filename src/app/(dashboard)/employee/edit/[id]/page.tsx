'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import useEmployeeData from '@/hooks/useEmployeeData';
import React from 'react';

const EditDetailWithId = () => {
	const employeeData = useEmployeeData();

	return (
		<>
			<EmployeeDetailsForm
				title="Edit Employee"
				initialValues={{
					name: employeeData.employeeName,
					age: String(employeeData.employeeAge),
					salary: String(employeeData.employeeSalary),
				}}
			/>
		</>
	);
};

export default EditDetailWithId;
