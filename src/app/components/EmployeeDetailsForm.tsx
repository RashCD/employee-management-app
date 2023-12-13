'use client';

import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from './CustomTextField';
import { useRouter } from 'next/navigation';
import CustomUploadField from './CustomUploadField';
import { useEmployeesContext } from '@/hooks/useEmployeeData';
import { Locale } from '@/i18n.config';

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
	lang: Locale;
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
	lang,
}: EmployeeDetailsFormProps) => {
	const { control, handleSubmit, reset } = useForm<EmployeeDetailsFormType>({
		mode: 'onChange',
		defaultValues,
	});

	const editOneEmployee = useEmployeesContext((state) => state.editOneEmployee);

	const addOneEmployee = useEmployeesContext((state) => state.addOneEmployee);

	const router = useRouter();

	useEffect(() => {
		reset(initialValues);
	}, [initialValues, reset]);

	const onSubmit = async (data: EmployeeDetailsFormType) => {
		if (data?.id) {
			editOneEmployee(data.id, data);
		} else {
			addOneEmployee(data);
		}

		return router.push(`/${lang}/employee/list`);
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
							{...field}
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
