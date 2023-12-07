import React from 'react';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	SxProps,
	Theme,
} from '@mui/material';
import { Employee } from '../(dashboard)/employee/api';

type Structure =
	| {
			header: string;
			row: string;
			parentStyle?: SxProps<Theme>;
			customRow?: never;
	  }
	| {
			header: string;
			row?: never;
			parentStyle?: SxProps<Theme>;
			customRow: (row: Employee) => JSX.Element;
	  };

type EmployeeTableType = {
	structure: Structure[];
	dataSources: any[];
};

const EmployeeTable = ({ structure, dataSources }: EmployeeTableType) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{structure.map((column) => (
							<TableCell key={column.header} align="center">
								{column.header}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataSources.map((row) => (
						<TableRow
							key={row.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							{structure.map((column) => (
								<TableCell key={column.header} sx={column.parentStyle}>
									{column.customRow ? column.customRow(row) : row[column.row]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default EmployeeTable;
