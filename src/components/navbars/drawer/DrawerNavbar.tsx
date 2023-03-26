import React, { MouseEvent } from 'react';
import { List, Drawer, Box, Menu, ButtonBase } from '@mui/material';
import {
	Home,
	Search,
	Send,
	AddCircleOutline,
	AccountCircle,
	Menu as MenuIcon,
} from '@mui/icons-material';
import useTheme from '../../../hooks/useTheme';
import DrawerButton from './DrawerButton';
import DrawerLogo from './DrawerLogo';
import NavbarMenu from '../NavbarMenu';

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
	const backgroundMenuColor = theme === 'dark' ? 'rgb(38, 38, 38)' : 'white';
	const boxShadow =
		theme === 'dark'
			? '1px 0px 1px rgba(250, 250, 250, 0.2)'
			: '1px 0px 1px rgba(0, 0, 0, 0.2)';
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					border: 'none',
					boxShadow: boxShadow,
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
				<ButtonBase onClick={handleClick}>
					<DrawerButton IconComponent={MenuIcon} text="More" />
				</ButtonBase>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
					sx={{
						'& .MuiPaper-root': {
							backgroundColor: backgroundMenuColor,
						},
					}}
				>
					<NavbarMenu />
				</Menu>
			</List>
		</Drawer>
	);
}
