import camelize from 'camelize';

export interface Employee {
	id: number;
	employeeName: string;
	employeeSalary: number;
	employeeAge: number;
	profileImage: string;
}

export const getEmployeeList = async (): Promise<Employee[]> => {
	// const res = await fetch('http://dummy.restapiexample.com/api/v1/employees')
	const res = await fetch('http://localhost:4000/employees');

	const result = await res.json();

	const camelizedResult = camelize(result);

	return camelizedResult;
};
