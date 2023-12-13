'use client';

import React from 'react';
import { Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useRouter } from 'next/navigation';
import { useEmployeeData, useEmployeesContext } from '@/hooks/useEmployeeData';
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

	const deleteOneEmployee = useEmployeesContext(
		(state) => state.deleteOneEmployee
	);

	const handleEditClick = () => {
		addEmployee(employee);

		return router.push(`/${lang}/employee/edit/${employee.id}`);
	};

	const handleDeleteClick = async (id: number) => {
		deleteOneEmployee(id);
	};

	return (
		<>
			<Stack direction="row" spacing={2}>
				<Button
					variant="outlined"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={() => handleDeleteClick(employee.id || 1)}
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
