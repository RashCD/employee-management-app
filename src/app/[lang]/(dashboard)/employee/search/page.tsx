import React from 'react';
import EditDetail from './EditDetail';
import { Users, getEmployeeList } from '../api';

const getEmployees = async (): Promise<Users> => {
	const result = await getEmployeeList();

	return result;
};

const page = async () => {
	const result = await getEmployees();

	return <EditDetail employees={result.data} />;
};

export default page;
