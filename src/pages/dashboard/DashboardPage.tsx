import React from 'react';
import { Container, ButtonBase } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import ThemeProvider from '../../context/ThemeContext';

export default function DashboardPage() {
	const { logout } = useAuth();
	return (
		<ThemeProvider>
			<Container>
				<ButtonBase onClick={logout}>logout</ButtonBase>
			</Container>
		</ThemeProvider>
	);
}
