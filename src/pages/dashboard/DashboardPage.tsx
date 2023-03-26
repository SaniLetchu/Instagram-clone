import React from 'react';
import { Container, ButtonBase, Box } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import DrawerNavbar from '../../components/drawernavbar/DrawerNavbar';
import TopNavbar from '../../components/topNavbar/TopNavbar';
import BottomNavbar from '../../components/bottomnavbar/BottomNavbar';

const flexDirection = {
	xs: 'column',
	sm: 'row',
	md: 'row',
	lg: 'row',
	xl: 'row',
};

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
				flexDirection: flexDirection,
				bgcolor: backgroundColor,
			}}
		>
			<DrawerNavbar />
			<TopNavbar />
			<Container
				maxWidth={false}
				disableGutters
				sx={{
					flexGrow: 1,
					marginTop: 7,
					bgcolor: backgroundColor,
				}}
			>
				<ButtonBase onClick={logout}>logout</ButtonBase>
				<ButtonBase onClick={toggleTheme}>theme</ButtonBase>
			</Container>
			<BottomNavbar />
		</Container>
	);
}
