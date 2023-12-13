import { camelizeKeys } from 'humps';

export interface Users {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
	data: Employee[];
	support: Support;
}

export interface Employee {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	avatar: string;
}

export interface Support {
	url: string;
	text: string;
}

export const getEmployeeList = async (): Promise<Users> => {
	const res = await fetch('https://reqres.in/api/users', {
		next: {
			revalidate: 0,
		},
	});

	const result = await res.json();

	const camelizedResult = camelizeKeys<Users>(result);

	return camelizedResult;
};
