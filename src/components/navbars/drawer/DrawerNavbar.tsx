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
import useAuth from '../../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';
import useDashboard from '../../../hooks/useDashboard';
import DrawerButton from './DrawerButton';
import DrawerLogo from './DrawerLogo';
import NavbarMenu from '../NavbarMenu';
import { useNavigate } from 'react-router-dom';

const drawerWidth = { xs: 75, sm: 75, md: 75, lg: 245, xl: 245 };
const drawerDisplay = {
	xs: 'none',
	sm: 'block',
	md: 'block',
	lg: 'block',
	xl: 'block',
};

export default function DrawerNavbar() {
	const { theme, backgroundColor, secondaryBackgroundColor } = useTheme();
	const { setOpenCreatePostModal, openCreatePostModal } = useDashboard();
	const navigate = useNavigate();
	const { user } = useAuth();
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
				<ButtonBase
					sx={{
						borderRadius: 100,
						'&:hover': {
							backgroundColor:
								theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
						},
					}}
					onClick={() => navigate('/')}
				>
					<DrawerButton IconComponent={Home} text="Home" path="/" />
				</ButtonBase>
				<ButtonBase
					sx={{
						borderRadius: 100,
						'&:hover': {
							backgroundColor:
								theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
						},
					}}
					onClick={() => console.log('search')}
				>
					<DrawerButton IconComponent={Search} text="Search" />
				</ButtonBase>
				<ButtonBase
					sx={{
						borderRadius: 100,
						'&:hover': {
							backgroundColor:
								theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
						},
					}}
					onClick={() => navigate('/messages')}
				>
					<DrawerButton IconComponent={Send} text="Messages" path="/messages" />
				</ButtonBase>
				<ButtonBase
					sx={{
						borderRadius: 100,
						'&:hover': {
							backgroundColor:
								theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
						},
					}}
					onClick={() => setOpenCreatePostModal(true)}
				>
					<DrawerButton
						IconComponent={AddCircleOutline}
						text="Create"
						selectionBoolean={openCreatePostModal}
					/>
				</ButtonBase>
				<ButtonBase
					sx={{
						borderRadius: 100,
						'&:hover': {
							backgroundColor:
								theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
						},
					}}
					onClick={() => navigate(`/profile/${user?.uid}`)}
				>
					<DrawerButton
						IconComponent={AccountCircle}
						text="Profile"
						path={`/profile/${user?.uid}`}
					/>
				</ButtonBase>
				<Box sx={{ flexGrow: 1 }} />
				<ButtonBase
					sx={{
						borderRadius: 100,
						'&:hover': {
							backgroundColor:
								theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
						},
					}}
					onClick={handleClick}
				>
					<DrawerButton
						IconComponent={MenuIcon}
						text="More"
						selectionBoolean={open}
					/>
				</ButtonBase>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					disableScrollLock={true}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
					sx={{
						'& .MuiPaper-root': {
							backgroundColor: secondaryBackgroundColor,
						},
					}}
				>
					<NavbarMenu />
				</Menu>
			</List>
		</Drawer>
	);
}
