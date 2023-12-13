'use client';

import { Box, Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useEmployeeData, useEmployeesContext } from '@/hooks/useEmployeeData';
import { Locale } from '@/i18n.config';

type EditDetailProps = {
	lang: Locale;
	translate: {
		id: string;
		search: string;
	};
};

const EditDetail = ({ lang, translate }: EditDetailProps) => {
	const router = useRouter();

	const { addEmployee } = useEmployeeData();

	const employees = useEmployeesContext((state) => state.employees);

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

		router.push(`/${lang}/employee/edit/${searchId}`);
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
						label={translate.id}
						type="number"
						onChange={handleSearchIdChange}
						value={searchId}
					/>
					<Button variant="contained" color="primary" type="submit">
						{translate.search}
					</Button>
				</Stack>
			</Box>
		</>
	);
};

export default EditDetail;
