'use client';

import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#7856ff',
		},
	},
});

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
