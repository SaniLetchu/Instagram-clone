import React from 'react';
import { Container, ButtonBase, Box } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import DrawerNavbar from '../../components/DrawerNavbar';

export default function DashboardPage() {
	const { logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				display: 'flex',
				bgcolor: backgroundColor,
			}}
		>
			<DrawerNavbar />
			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					bgcolor: backgroundColor,
				}}
			>
				<ButtonBase onClick={logout}>logout</ButtonBase>
				<ButtonBase onClick={toggleTheme}>theme</ButtonBase>
			</Box>
		</Container>
	);
}
