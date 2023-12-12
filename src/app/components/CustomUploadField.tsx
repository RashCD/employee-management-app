import { Button, Avatar, styled, Stack, Typography } from '@mui/material';
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
	value: string;
	error: boolean;
	errorMessage?: string;
};

const CustomUploadField = ({
	value,
	error,
	errorMessage,
}: CustomUploadFieldProps) => {
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
				<VisuallyHiddenInput type="file" />
				<Typography variant="body2" sx={{ textAlign: 'center', opacity: 0 }}>
					Upload
				</Typography>
				{error ? <p>{errorMessage}</p> : null}
			</Stack>
		</Button>
	);
};

export default CustomUploadField;
