'use client';

import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from './CustomTextField';
import { useRouter } from 'next/navigation';
import { decamelizeKeys } from 'humps';

export type EmployeeDetailsFormType = {
	id?: number;
	name: string;
	age: string;
	salary: string;
};

type EmployeeDetailsFormProps = {
	title?: string;
	initialValues?: EmployeeDetailsFormType;
};

const defaultValues: EmployeeDetailsFormType = {
	id: undefined,
	name: '',
	age: '',
	salary: '',
};

const EmployeeDetailsForm: React.FC<EmployeeDetailsFormProps> = ({
	title = 'Add Employee',
	initialValues = defaultValues,
}) => {
	const { control, handleSubmit, reset } = useForm<EmployeeDetailsFormType>({
		mode: 'onChange',
		defaultValues,
	});

	const router = useRouter();

	useEffect(() => {
		reset(initialValues);
	}, [initialValues, reset]);

	const onSubmit = async (data: EmployeeDetailsFormType) => {
		const serverPayload = decamelizeKeys({
			employeeName: data.name,
			employeeAge: data.age,
			employeeSalary: data.salary,
		});

		const res = await fetch(
			initialValues.id
				? `http://localhost:4000/employees/${initialValues.id}`
				: 'http://localhost:4000/employees',
			{
				method: data.id ? 'PATCH' : 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(serverPayload),
				credentials: 'include',
			}
		);

		if (res.status === 200 || res.status === 201) {
			router.push('/employee/list');
			router.refresh();
		}
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
					{title}
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
