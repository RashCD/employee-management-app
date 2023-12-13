'use client';

import React from 'react';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Avatar,
	Box,
} from '@mui/material';
import { Employee } from '../[lang]/(dashboard)/employee/api';
import { useEmployeesContext } from '@/hooks/useEmployeeData';
import ActionButtons from './ActionButtons';
import { Locale } from '@/i18n.config';

type EmployeeTableProps = {
	lang: Locale;
	translate: {
		avatar: string;
		firstName: string;
		lastName: string;
		email: string;
		action: string;
		edit: string;
		delete: string;
	};
};

const EmployeeTable = ({ lang, translate }: EmployeeTableProps) => {
	const employees = useEmployeesContext((state) => state.employees);

	const structure = [
		{
			header: translate.avatar,
			customRow: (row: Employee) => (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar alt={String(row.id)} src={row.avatar} />
				</Box>
			),
		},
		{
			header: translate.firstName,
			parentStyle: {
				width: '70%',
				textAlign: 'center',
			},
			customRow: (row: Employee) => (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					{row.firstName.length > 25
						? row.firstName.slice(0, 25) + '...'
						: row.firstName}
				</Box>
			),
		},
		{
			header: translate.lastName,
			parentStyle: {
				width: '70%',
				textAlign: 'center',
			},
			customRow: (row: Employee) => (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					{row.lastName.length > 25
						? row.lastName.slice(0, 25) + '...'
						: row.lastName}
				</Box>
			),
		},
		{
			header: translate.email,
			row: 'email',
		},
		{
			header: translate.action,
			customRow: (row: Employee) => (
				<ActionButtons employee={row} lang={lang} translate={translate} />
			),
		},
	];

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{structure.map((column) => (
							<TableCell key={column.header} align="center">
								{column.header}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{employees.map((row) => (
						<TableRow
							key={row.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							{structure.map((column) => (
								<TableCell key={column.header} sx={column.parentStyle}>
									{column.customRow
										? column.customRow(row)
										: row[column.row as keyof Employee]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default EmployeeTable;
