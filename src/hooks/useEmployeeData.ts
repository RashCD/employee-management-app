import { Employee } from '@/app/(dashboard)/employee/api';
import { create } from 'zustand';

type EmployeeDataActions = {
	addEmployee: (employee: Employee) => void;
};

export type EmployeeDataStore = Employee & EmployeeDataActions;

const useEmployeeData = create<EmployeeDataStore>((set) => ({
	id: 0,
	employeeName: '',
	employeeAge: 0,
	employeeSalary: 0,
	profileImage: '',
	addEmployee: (employeeData) => set(employeeData),
}));

export default useEmployeeData;
