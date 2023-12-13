'use client';

import React from 'react';
import { Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useRouter } from 'next/navigation';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { Employee } from '../[lang]/(dashboard)/employee/api';
import { Locale } from '@/i18n.config';

type ActionButtonsProps = {
	employee: Employee;
	lang: Locale;
	translate: {
		edit: string;
		delete: string;
	};
};

const ActionButtons = ({ employee, lang, translate }: ActionButtonsProps) => {
	const router = useRouter();

	const { addEmployee } = useEmployeeData();

	const handleEditClick = () => {
		addEmployee(employee);

		return router.push(`/${lang}/employee/edit/${employee.id}`);
	};

	const handleDeleteClick = async () => {
		const res = await fetch(`https://reqres.in/api/users/${employee.id}`, {
			method: 'DELETE',
			credentials: 'include',
		});

		if (res.status === 200 || res.status === 201) {
			router.refresh();
		}
	};

	return (
		<>
			<Stack direction="row" spacing={2}>
				<Button
					variant="outlined"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={handleDeleteClick}
				>
					{translate.delete}
				</Button>
				<Button
					variant="contained"
					color="primary"
					endIcon={<ModeEditIcon />}
					onClick={handleEditClick}
				>
					{translate.edit}
				</Button>
			</Stack>
		</>
	);
};

export default ActionButtons;
