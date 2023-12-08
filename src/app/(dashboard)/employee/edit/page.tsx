import React from 'react';
import EditDetail from './EditDetail';
import { Employee } from '../api';
import { camelizeKeys } from 'humps';

interface PropsType {
	params: object;
	searchParams: {
		id?: string;
	};
}

export const generateStaticParams = async () => {
	const res = await fetch('http://localhost:4000/employees');

	const employees = await res.json();

	return employees.map((employee: Employee) => ({
		id: String(employee.id),
	}));
};

const getEmployee = async (id: string): Promise<Employee> => {
	const res = await fetch(`http://localhost:4000/employees/${id}`, {
		next: {
			revalidate: 0,
		},
	});

	const result = await res.json();

	const camelizedResult = camelizeKeys<Employee>(result);

	return camelizedResult;
};

const page = async (props: PropsType) => {
	const { id } = props.searchParams;

	const result = await getEmployee(id ?? '');

	return <EditDetail employee={result} />;
};

export default page;
