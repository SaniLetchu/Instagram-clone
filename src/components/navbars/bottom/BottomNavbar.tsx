import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
	Home,
	Send,
	AddCircleOutline,
	AccountCircle,
	Menu,
} from '@mui/icons-material';
import useTheme from '../../../hooks/useTheme';

const bottomNavbarDisplay = {
	xs: 'flex',
	sm: 'none',
	md: 'none',
	lg: 'none',
	xl: 'none',
};

export default function BottomNavbar() {
	const [value, setValue] = React.useState(0);
	const { theme } = useTheme();

	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	const iconColor = theme === 'dark' ? 'white' : 'black';
	const boxShadow =
		theme === 'dark'
			? '0px -1px 1px rgba(250, 250, 250, 0.2)'
			: '0px -1px 1px rgba(0, 0, 0, 0.2)';

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
				sx={{
					color: iconColor,
					'&.Mui-selected': {
						color: iconColor,
					},
				}}
				icon={<Home />}
			/>
			<BottomNavigationAction
				sx={{
					color: iconColor,
					'&.Mui-selected': {
						color: iconColor,
					},
				}}
				icon={<Send />}
			/>
			<BottomNavigationAction
				sx={{
					color: iconColor,
					'&.Mui-selected': {
						color: iconColor,
					},
				}}
				icon={<AddCircleOutline />}
			/>
			<BottomNavigationAction
				sx={{
					color: iconColor,
					'&.Mui-selected': {
						color: iconColor,
					},
				}}
				icon={<AccountCircle />}
			/>
			<BottomNavigationAction
				sx={{
					color: iconColor,
					'&.Mui-selected': {
						color: iconColor,
					},
				}}
				icon={<Menu />}
			/>
		</BottomNavigation>
	);
}
