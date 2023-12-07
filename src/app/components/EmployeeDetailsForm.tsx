'use client';

import { Box, Stack, Typography, Button } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from './CustomTextField';

export type EmployeeDetailsFormType = {
	name: string;
	age: string;
	salary: string;
};

const EmployeeDetailsForm = () => {
	const { control, handleSubmit } = useForm<EmployeeDetailsFormType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			age: '',
			salary: '',
		},
	});

	const onSubmit = (data: EmployeeDetailsFormType) => {
		console.log(data);
	};

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Add Employee
				</Typography>
				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => (
						<CustomTextField
							{...field}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: 'Name is required',
						},
					}}
				/>
				<Controller
					name="age"
					control={control}
					render={({ field, fieldState }) => (
						<CustomTextField
							{...field}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: 'Age is required',
						},
						min: {
							value: 1,
							message: 'Age must be greater than 0',
						},
						pattern: {
							value: /^[0-9]*$/,
							message: 'Age must be a number',
						},
						max: {
							value: 100,
							message: 'Age must be less than 100',
						},
					}}
				/>
				<Controller
					name="salary"
					control={control}
					render={({ field, fieldState }) => (
						<CustomTextField
							{...field}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: 'Salary is required',
						},
						min: {
							value: 1,
							message: 'Salary must be greater than 0',
						},
						validate: {
							isNumber: (value) => !isNaN(+value) || 'Salary must be a number',
							noDecimal: (value) =>
								!value.includes('.') ||
								'Salary must not have any decimal places',
						},
					}}
				/>
				<Button variant="contained" type="submit" sx={{ mt: 2 }}>
					Submit
				</Button>
			</Stack>
		</Box>
	);
};

export default EmployeeDetailsForm;
