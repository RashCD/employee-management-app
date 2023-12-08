'use client';

import EmployeeDetailsForm from '@/app/components/EmployeeDetailsForm';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

const EditDetail = () => {
	const [searchId, setSearchId] = useState('');

	const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchId(event.target.value);
	};

	const handleSearchOnSubmit = () => {
		console.log(searchId);
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
					<Button variant="contained" color="primary">
						Search
					</Button>
				</Stack>
			</Box>
			{searchId && <EmployeeDetailsForm title="Edit Employee" />}
		</>
	);
};

export default EditDetail;
