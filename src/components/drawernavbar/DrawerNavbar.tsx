import React from 'react';
import { List, Drawer, Box } from '@mui/material';
import {
	Home,
	Search,
	Send,
	AddCircleOutline,
	AccountCircle,
	Menu,
} from '@mui/icons-material';
import useTheme from '../../hooks/useTheme';
import DrawerButton from './DrawerButton';
import DrawerLogo from './DrawerLogo';

const drawerWidth = { xs: 75, sm: 75, md: 75, lg: 245, xl: 245 };
const drawerDisplay = {
	xs: 'none',
	sm: 'block',
	md: 'block',
	lg: 'block',
	xl: 'block',
};

export default function DrawerNavbar() {
	const { theme } = useTheme();
	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
				display: drawerDisplay,
			}}
			variant="permanent"
			anchor="left"
		>
			<DrawerLogo />
			<List
				sx={{
					bgcolor: backgroundColor,
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
				}}
			>
				<DrawerButton IconComponent={Home} text="Home" />
				<DrawerButton IconComponent={Search} text="Search" />
				<DrawerButton IconComponent={Send} text="Messages" />
				<DrawerButton IconComponent={AddCircleOutline} text="Create" />
				<DrawerButton IconComponent={AccountCircle} text="Profile" />
				<Box sx={{ flexGrow: 1 }} />
				<DrawerButton IconComponent={Menu} text="More" />
			</List>
		</Drawer>
	);
}
