'use client';

import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from './CustomTextField';
import { useRouter } from 'next/navigation';
import { decamelizeKeys } from 'humps';
import CustomUploadField from './CustomUploadField';

type TranslateType = {
	title: string;
	submit: string;
	upload: string;
	field: {
		avatar: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	validation: {
		required: string;
		email: string;
	};
};

type EmployeeDetailsFormProps = {
	title?: string;
	initialValues?: EmployeeDetailsFormType;
	translate: TranslateType;
};

export type EmployeeDetailsFormType = {
	id?: number;
} & TranslateType['field'];

const defaultValues: EmployeeDetailsFormType = {
	id: undefined,
	firstName: '',
	lastName: '',
	email: '',
	avatar: '',
};

const EmployeeDetailsForm = ({
	initialValues = defaultValues,
	translate,
}: EmployeeDetailsFormProps) => {
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
					{translate?.title || 'Employee Form'}
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
							translate={{ upload: translate?.upload || 'Upload' }}
						/>
					)}
				/>
				<Controller
					name="firstName"
					control={control}
					render={({ field, fieldState }) => (
						<CustomTextField
							{...field}
							label={translate?.field.firstName || 'First Name'}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message:
								translate?.validation.required || 'First name is required',
						},
					}}
				/>
				<Controller
					name="lastName"
					control={control}
					render={({ field, fieldState }) => (
						<CustomTextField
							{...field}
							label={translate?.field.lastName || 'Last Name'}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message:
								translate?.validation.required || 'Last name is required',
						},
					}}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field, fieldState }) => (
						<CustomTextField
							{...field}
							label={translate?.field.email || 'Email'}
							error={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: translate?.validation.required || 'Email is required',
						},
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: translate?.validation.email || 'Email is invalid',
						},
					}}
				/>

				<Button variant="contained" type="submit" sx={{ mt: 2 }}>
					{translate?.submit || 'Submit'}
				</Button>
			</Stack>
		</Box>
	);
};

export default EmployeeDetailsForm;
