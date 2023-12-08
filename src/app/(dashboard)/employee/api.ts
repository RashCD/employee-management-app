export interface Employee {
	id: number;
	employee_name: string;
	employee_salary: number;
	employee_age: number;
	profile_image: string;
}

export const getEmployeeList = async (): Promise<Employee[]> => {
	// const res = await fetch('http://dummy.restapiexample.com/api/v1/employees')
	const res = await fetch('http://localhost:4000/employees');

	return res.json();
};
