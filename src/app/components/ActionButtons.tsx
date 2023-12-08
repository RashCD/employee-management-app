'use client';

import React from 'react';
import { Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useRouter } from 'next/navigation';

const ActionButtons = ({ id }: { id: number }) => {
	const router = useRouter();

	const handleEditClick = () => {
		router.push(`/employee/edit/${id}`);
	};

	return (
		<Stack direction="row" spacing={2}>
			<Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
				Delete
			</Button>
			<Button
				variant="contained"
				color="primary"
				endIcon={<ModeEditIcon />}
				onClick={handleEditClick}
			>
				Edit
			</Button>
		</Stack>
	);
};

export default ActionButtons;
