'use client';

import { Employee } from '@/app/[lang]/(dashboard)/employee/api';
import { create } from 'zustand';
import { useContext } from 'react';
import {
	EmployeesContext,
	EmployeesMethods,
} from '@/provider/EmployeesProvider';
import { useStoreWithEqualityFn } from 'zustand/traditional';

type EmployeeDataActions = {
	addEmployee: (employee: Employee) => void;
};

export type EmployeeDataStore = Employee & EmployeeDataActions;

export const useEmployeeData = create<EmployeeDataStore>((set) => ({
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	avatar: '',
	addEmployee: (employeeData) => set(employeeData),
}));

export const useEmployeesContext = <T>(
	selector: (state: EmployeesMethods) => T,
	equalityFn?: (left: T, right: T) => boolean
): T => {
	const store = useContext(EmployeesContext);

	if (!store) throw new Error('Missing EmployeesContext.Provider in the tree');

	return useStoreWithEqualityFn(store, selector, equalityFn);
};
