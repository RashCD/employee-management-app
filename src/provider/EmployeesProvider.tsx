'use client';

import { Employee } from '@/app/[lang]/(dashboard)/employee/api';
import { createContext, useRef } from 'react';
import { createStore } from 'zustand';

export interface EmployeesData {
	employees: Employee[];
}

type EmployeesProviderProps = React.PropsWithChildren<EmployeesData>;

export interface EmployeesMethods extends EmployeesData {
	addOneEmployee: (employee: Employee) => void;
	deleteOneEmployee: (employeeId: number) => void;
	editOneEmployee: (employeeId: number, employeeEdited: Employee) => void;
}

type EmployeesStore = ReturnType<typeof createEmployeesStore>;

export const createEmployeesStore = (initProps?: Partial<EmployeesData>) => {
	const DEFAULT_PROPS: EmployeesData = {
		employees: [
			{
				id: 0,
				firstName: '',
				lastName: '',
				email: '',
				avatar: '',
			},
		],
	};
	return createStore<EmployeesMethods>()((set) => ({
		...DEFAULT_PROPS,
		...initProps,
		addOneEmployee: (employee) =>
			set((state) => {
				const lastId = state.employees[state.employees.length - 1]?.id || 0;

				state.employees.push({
					...employee,
					id: lastId + 1,
				});

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
};

export const EmployeesContext = createContext<EmployeesStore | null>(null);

function EmployeesProvider({ children, ...props }: EmployeesProviderProps) {
	const storeRef = useRef<EmployeesStore>();

	if (!storeRef.current) {
		storeRef.current = createEmployeesStore(props);
	}

	return (
		<EmployeesContext.Provider value={storeRef.current}>
			{children}
		</EmployeesContext.Provider>
	);
}

export default EmployeesProvider;
