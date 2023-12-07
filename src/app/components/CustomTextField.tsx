'use client';

import { TextField } from '@mui/material';
import React from 'react';
import { EmployeeDetailsFormType } from './EmployeeDetailsForm';

type CustomTextFieldProps = {
	name: keyof EmployeeDetailsFormType;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	error: boolean;
	errorMessage?: string;
};

const CustomTextField = React.forwardRef<
	HTMLInputElement,
	CustomTextFieldProps
>(({ name, onChange, value, error, errorMessage }, ref) => {
	return (
		<TextField
			ref={ref}
			label={name.charAt(0).toUpperCase() + name.slice(1)}
			name={name}
			onChange={onChange}
			value={value}
			error={error}
			helperText={errorMessage}
		/>
	);
});

CustomTextField.displayName = 'CustomTextField';

export default CustomTextField;
