'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { Box, Button, Stack, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Employee } from '../api';

const EditDetail = ({ employee }: { employee: Employee }) => {
	const router = useRouter();

	const pathname = usePathname();

	const searchParams = useSearchParams();

	const [searchId, setSearchId] = useState(searchParams.get('id') ?? '');

	const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchId(event.target.value);
	};

	const handleSearchOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		const current = new URLSearchParams(Array.from(searchParams.entries()));

		if (searchId) {
			current.set('id', searchId);
		}

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
				onSubmit={handleSearchOnSubmit}
			>
				<Stack>
					<TextField
						label="Employee ID"
						type="number"
						onChange={handleSearchIdChange}
						value={searchId}
					/>
					<Button variant="contained" color="primary" type="submit">
						Search
					</Button>
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
