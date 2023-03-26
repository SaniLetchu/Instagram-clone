import React from 'react';
import { Container, ButtonBase, Box } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import DrawerNavbar from '../../components/navbars/drawer/DrawerNavbar';
import TopNavbar from '../../components/navbars/top/TopNavbar';
import BottomNavbar from '../../components/navbars/bottom/BottomNavbar';

const flexDirection = {
	xs: 'column',
	sm: 'row',
	md: 'row',
	lg: 'row',
	xl: 'row',
};

const mainContainerTopMargin = {
	xs: 7,
	sm: 0,
	md: 0,
	lg: 0,
	xl: 0,
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
					marginTop: mainContainerTopMargin,
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
