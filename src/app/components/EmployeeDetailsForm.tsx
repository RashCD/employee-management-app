'use client';

import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from './CustomTextField';
import { useRouter } from 'next/navigation';
import { decamelizeKeys } from 'humps';
import CustomUploadField from './CustomUploadField';

export type EmployeeDetailsFormType = {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	avatar: string;
};

type EmployeeDetailsFormProps = {
	title?: string;
	initialValues?: EmployeeDetailsFormType;
};

const defaultValues: EmployeeDetailsFormType = {
	id: undefined,
	firstName: '',
	lastName: '',
	email: '',
	avatar: '',
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
		const serverPayload = decamelizeKeys(data);

		const res = await fetch(
			initialValues.id
				? `https://reqres.in/api/users/${initialValues.id}`
				: 'https://reqres.in/api/users',
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
					name="avatar"
					control={control}
					render={({ field, fieldState }) => (
						<CustomUploadField
							customRef={field.ref}
							value={field.value}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="firstName"
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
							message: 'First name is required',
						},
					}}
				/>
				<Controller
					name="lastName"
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
							message: 'Last name is required',
						},
					}}
				/>
				<Controller
					name="email"
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
							message: 'Email is required',
						},
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Email must be a valid email',
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
