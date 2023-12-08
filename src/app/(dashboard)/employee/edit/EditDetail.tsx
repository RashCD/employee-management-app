'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { Box, Stack, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Employee } from '../api';

const EditDetail = ({ employee }: { employee: Employee }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		current.set('id', event.target.value);

		const search = current.toString();

		const query = search ? `?${search}` : '';

		router.push(`${pathname}${query}`);
	};

	return (
		<>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<Stack>
					<TextField
						label="Search for Employee ID"
						type="number"
						onChange={handleSearchIdChange}
						value={searchParams.get('id') ?? ''}
					/>
				</Stack>
			</Box>
			{employee.id && (
				<EmployeeDetailsForm
					title="Edit Employee"
					initialValues={{
						id: employee.id,
						name: employee.employeeName,
						age: String(employee.employeeAge),
						salary: String(employee.employeeSalary),
					}}
				/>
			)}
		</>
	);
};

export default EditDetail;
