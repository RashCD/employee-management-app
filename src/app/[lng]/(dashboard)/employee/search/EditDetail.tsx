'use client';

import { Box, Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Employee } from '../api';
import { useEmployeeData } from '@/hooks/useEmployeeData';

const EditDetail = ({ employees }: { employees: Employee[] }) => {
	const router = useRouter();

	const { addEmployee } = useEmployeeData();

	const [searchId, setSearchId] = useState('');

	const [, setError] = useState();

	const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchId(event.target.value);
	};

	const handleSearchOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		const findEmployee = employees.find(
			(employee) => employee.id === Number(searchId)
		);

		if (findEmployee) {
			addEmployee(findEmployee);
		} else {
			setError(() => {
				throw new Error('Employee not found');
			});
		}

		router.push(`/employee/edit/${searchId}`);
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
		</>
	);
};

export default EditDetail;
