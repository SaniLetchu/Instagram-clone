import React from 'react';
import { Container } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import DrawerNavbar from '../../components/navbars/drawer/DrawerNavbar';
import TopNavbar from '../../components/navbars/top/TopNavbar';
import BottomNavbar from '../../components/navbars/bottom/BottomNavbar';
import HomePage from './HomePage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import UsernameModal from '../../components/UsernameModal';

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
	const { theme } = useTheme();
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
			<UsernameModal />
			<DrawerNavbar />
			<TopNavbar />
			<Container
				maxWidth={false}
				disableGutters
				sx={{
					flexGrow: 1,
					minHeight: '100vh',
					marginTop: mainContainerTopMargin,
					bgcolor: backgroundColor,
				}}
			>
				<Routes>
					<Route path="/" Component={HomePage}></Route>
					<Route path="/profile" Component={ProfilePage}></Route>
					<Route path="/settings" Component={SettingsPage}></Route>
					<Route path="/messages" Component={MessagesPage}></Route>
				</Routes>
			</Container>
			<BottomNavbar />
		</Container>
	);
}
