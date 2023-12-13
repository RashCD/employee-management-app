'use client';

import { Button, Avatar, Stack, Typography, styled } from '@mui/material';
import React from 'react';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

type CustomUploadFieldProps = {
	onChange: (file: string) => void;
	value: string;
	error: boolean;
	errorMessage?: string;
	translate: {
		upload: string;
	};
};

const CustomUploadField = React.forwardRef<
	HTMLInputElement,
	CustomUploadFieldProps
>(({ value, onChange, error, errorMessage, translate }, ref) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				onChange(reader.result as string);
			};
		}
	};

	return (
		<Button
			component="label"
			sx={{
				':hover': {
					'& p': {
						opacity: 1,
					},
				},
			}}
		>
			<Stack>
				<Avatar src={value} sx={{ my: 1, width: 56, height: 56 }} />
				<VisuallyHiddenInput
					ref={ref}
					type="file"
					accept={'image/png, image/jpg, image/jpeg'}
					onChange={handleFileChange}
				/>
				<Typography variant="body2" sx={{ textAlign: 'center', opacity: 0 }}>
					{translate.upload}
				</Typography>
				{error ? <p>{errorMessage}</p> : null}
			</Stack>
		</Button>
	);
});

CustomUploadField.displayName = 'CustomUploadField';

export default CustomUploadField;
