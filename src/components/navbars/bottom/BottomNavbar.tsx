import React, { MouseEvent } from 'react';
import { BottomNavigation, BottomNavigationAction, Menu } from '@mui/material';
import {
	Home,
	Send,
	AddCircleOutline,
	AccountCircle,
	Menu as MenuIcon,
} from '@mui/icons-material';
import NavbarMenu from '../NavbarMenu';
import useTheme from '../../../hooks/useTheme';
import useDashboard from '../../../hooks/useDashboard';
import { useLocation, useNavigate } from 'react-router-dom';

const bottomNavbarDisplay = {
	xs: 'flex',
	sm: 'none',
	md: 'none',
	lg: 'none',
	xl: 'none',
};

export default function BottomNavbar() {
	const [value, setValue] = React.useState(0);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { theme, secondaryBackgroundColor, textAndIconColor, backgroundColor } =
		useTheme();
	const { setOpenCreatePostModal, openCreatePostModal } = useDashboard();
	function fillIconColor(path: string, selectionBoolean = false) {
		return pathname === path || selectionBoolean
			? theme === 'dark'
				? 'white'
				: 'black'
			: 'none';
	}
	const boxShadow =
		theme === 'dark'
			? '0px -1px 1px rgba(250, 250, 250, 0.2)'
			: '0px -1px 1px rgba(0, 0, 0, 0.2)';
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<BottomNavigation
			showLabels
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			sx={{
				width: '100%',
				bgcolor: backgroundColor,
				display: bottomNavbarDisplay,
				position: 'fixed',
				bottom: 0,
				boxShadow: boxShadow,
			}}
		>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				sx={{
					color: textAndIconColor,
					'&.Mui-selected': {
						color: textAndIconColor,
					},
				}}
				icon={
					<Home
						sx={{
							stroke: textAndIconColor,
							strokeWidth: 1,
							fill: fillIconColor('/'),
						}}
					/>
				}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/messages')}
				sx={{
					color: textAndIconColor,
					'&.Mui-selected': {
						color: textAndIconColor,
					},
				}}
				icon={
					<Send
						sx={{
							stroke: textAndIconColor,
							strokeWidth: 1,
							fill: fillIconColor('/messages'),
						}}
					/>
				}
			/>
			<BottomNavigationAction
				onClick={() => setOpenCreatePostModal(true)}
				sx={{
					color: textAndIconColor,
					'&.Mui-selected': {
						color: textAndIconColor,
					},
				}}
				icon={
					<AddCircleOutline
						sx={{
							stroke: textAndIconColor,
							strokeWidth: 1,
							fill: fillIconColor('asdasdas', openCreatePostModal),
						}}
					/>
				}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/profile')}
				sx={{
					color: textAndIconColor,
					'&.Mui-selected': {
						color: textAndIconColor,
					},
				}}
				icon={
					<AccountCircle
						sx={{
							stroke: textAndIconColor,
							strokeWidth: 1,
							fill: fillIconColor('/profile'),
						}}
					/>
				}
			/>
			<BottomNavigationAction
				sx={{
					color: textAndIconColor,
					'&.Mui-selected': {
						color: textAndIconColor,
					},
				}}
				onClick={handleClick}
				icon={
					<MenuIcon
						sx={{
							stroke: textAndIconColor,
							strokeWidth: 1,
							fill: fillIconColor('/emptynever', open),
						}}
					/>
				}
			/>
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
		</BottomNavigation>
	);
}
