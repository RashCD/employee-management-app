import ActionButtons from '@/app/components/ActionButtons';
import EmployeeTable from '@/app/components/EmployeeTable';
import { Avatar, Box } from '@mui/material';
import React from 'react';
import { Employee, getEmployeeList } from '../api';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export const generateStaticParams = async () => {
	const employees = await getEmployeeList();

	return employees.data.map((employee: Employee) => ({
		id: String(employee.id),
	}));
};

type PageProps = {
	params: {
		lang: Locale;
	};
};

const Page = async ({ params }: PageProps) => {
	const employees = await getEmployeeList();

	const { page } = await getDictionary(params.lang);

	const structure = [
		{
			header: page.table.avatar,
			customRow: (row: Employee) => (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar alt={String(row.id)} src={row.avatar} />
				</Box>
			),
		},
		{
			header: page.table.firstName,
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
			header: page.table.lastName,
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
			header: page.table.email,
			row: 'email',
		},
		{
			header: page.table.action,
			customRow: (row: Employee) => (
				<ActionButtons
					employee={row}
					lang={params.lang}
					translate={page.table}
				/>
			),
		},
	];

	return <EmployeeTable structure={structure} dataSources={employees.data} />;
};

export default Page;
