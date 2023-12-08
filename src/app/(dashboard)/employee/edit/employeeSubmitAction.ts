'use server';

import { EmployeeDetailsFormType } from '@/app/components/EmployeeDetailsForm';
import { decamelizeKeys } from 'humps';
import { revalidatePath } from 'next/cache';

const employeeSubmitAction = async (data: EmployeeDetailsFormType) => {
	const serverPayload = decamelizeKeys({
		employeeName: data.name,
		employeeAge: data.age,
		employeeSalary: data.salary,
	});

	const res = await fetch(`http://localhost:4000/employees`, {
		method: data.id ? 'PATCH' : 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(serverPayload),
		credentials: 'include',
	});

	if (res.status === 200 || res.status === 201) {
		revalidatePath('/');
	}
};

export default employeeSubmitAction;
