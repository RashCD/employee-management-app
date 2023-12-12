import ActionButtons from '@/app/components/ActionButtons';
import EmployeeTable from '@/app/components/EmployeeTable';
import { Avatar, Box } from '@mui/material';
import React from 'react';
import { Employee, getEmployeeList } from '../api';

export const generateStaticParams = async () => {
	const employees = await getEmployeeList();

	return employees.data.map((employee: Employee) => ({
		id: String(employee.id),
	}));
};

const structure = [
	{
		header: 'Avatar',
		customRow: (row: Employee) => (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Avatar alt={String(row.id)} src={row.avatar} />
			</Box>
		),
	},
	{
		header: 'First Name',
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
		header: 'Last Name',
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
		header: 'Email',
		row: 'email',
	},
	{
		header: 'Actions',
		customRow: (row: Employee) => <ActionButtons employee={row} />,
	},
];

const EmployeeList: React.FC = async () => {
	const employees = await getEmployeeList();

	return <EmployeeTable structure={structure} dataSources={employees.data} />;
};

export default EmployeeList;
