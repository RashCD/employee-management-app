import ActionButtons from '@/app/components/ActionButtons';
import EmployeeTable from '@/app/components/EmployeeTable';
import { Avatar, Box } from '@mui/material';
import React from 'react';
import { Employee, getEmployeeList } from '../api';

const structure = [
	{
		header: 'Avatar',
		customRow: (row: Employee) => (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Avatar alt={row.employee_name} src={row.profile_image} />
			</Box>
		),
	},
	{
		header: 'Name',
		parentStyle: { width: '70%', textAlign: 'center' },
		row: 'employee_name',
	},
	{
		header: 'Age',
		row: 'employee_age',
	},
	{
		header: 'Salary',
		row: 'employee_salary',
	},
	{
		header: 'Actions',
		customRow: () => <ActionButtons />,
	},
];

const EmployeeList: React.FC = async () => {
	const employees = await getEmployeeList();

	return <EmployeeTable structure={structure} dataSources={employees} />;
};

export default EmployeeList;
