import { Employee } from '@/app/[lng]/(dashboard)/employee/api';
import { create } from 'zustand';

type EmployeeDataActions = {
	addEmployee: (employee: Employee) => void;
};

export type EmployeeDataStore = Employee & EmployeeDataActions;

type EmployeesData = {
	employees: Employee[];
	addAllEmployee: (employees: Employee[]) => void;
	addOneEmployee: (employee: Employee) => void;
	deleteOneEmployee: (employeeId: number) => void;
	editOneEmployee: (employeeId: number, employeeEdited: Employee) => void;
};

export const useEmployeeData = create<EmployeeDataStore>((set) => ({
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	avatar: '',
	addEmployee: (employeeData) => set(employeeData),
}));

export const useEmployeesData = create<EmployeesData>((set) => ({
	employees: [
		{
			id: 0,
			firstName: '',
			lastName: '',
			email: '',
			avatar: '',
		},
	],
	addAllEmployee: (employees) => set({ employees }),
	addOneEmployee: (employee) =>
		set((state) => {
			state.employees.push(employee);
			return { employees: state.employees };
		}),
	deleteOneEmployee: (employeeId) =>
		set((state) => ({
			employees: state.employees.filter((employee) => {
				return employee.id !== employeeId;
			}),
		})),
	editOneEmployee: (employeeId, employeeEdited) =>
		set((state) => ({
			employees: state.employees.map((employee) => {
				return employee.id === employeeId ? employeeEdited : employee;
			}),
		})),
}));
