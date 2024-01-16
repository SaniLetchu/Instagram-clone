import React from 'react';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import useDashboard from '../../hooks/useDashboard';
import DrawerNavbar from '../../components/navbars/drawer/DrawerNavbar';
import TopNavbar from '../../components/navbars/top/TopNavbar';
import BottomNavbar from '../../components/navbars/bottom/BottomNavbar';
import HomePage from './HomePage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import UsernameModal from '../../components/modals/UsernameModal';
import CreatePostModal from '../../components/modals/CreatePostModal';
import CommentsInfiniteScroll from '../../components/infinitescrolls/Comments/CommentsInfiniteScroll';
import SearchDrawer from '../../components/navbars/drawer/SearchDrawer';

const flexDirection = {
	xs: 'column',
	sm: 'row',
	md: 'row',
	lg: 'row',
	xl: 'row',
};

export default function DashboardPage() {
	const { backgroundColor } = useTheme();
	const { topNavbarHeight } = useDashboard();
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
			<CreatePostModal />
			<TopNavbar />
			<UsernameModal />
			<DrawerNavbar />
			<SearchDrawer />
			<CommentsInfiniteScroll />
			<Container
				maxWidth={false}
				disableGutters
				sx={{
					flexGrow: 1,
					bgcolor: backgroundColor,
					marginTop: `${topNavbarHeight}px`,
				}}
			>
				<Routes>
					<Route path="/" Component={HomePage}></Route>
					<Route path="/profile/:userId" Component={ProfilePage}></Route>
					<Route path="/settings" Component={SettingsPage}></Route>
					<Route path="/messages" Component={MessagesPage}></Route>
				</Routes>
				<BottomNavbar />
			</Container>
		</Container>
	);
}
