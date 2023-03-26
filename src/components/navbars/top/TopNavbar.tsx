import React from 'react';
import { Box, Toolbar, AppBar } from '@mui/material';
import TopNavbarLogo from './TopNavbarLogo';
import useTheme from '../../../hooks/useTheme';
import TopNavbarSearch from './TopNavbarSearch';

const topNavbarDisplay = {
	xs: 'block',
	sm: 'none',
	md: 'none',
	lg: 'none',
	xl: 'none',
};

const handleSearch = (searchValue: string) => {
	console.log('Search for:', searchValue);
	// Perform your search logic here
};

export default function TopNavbar() {
	const { theme } = useTheme();
	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	const boxShadow =
		theme === 'dark'
			? '0px 1px 1px rgba(250, 250, 250, 0.2)'
			: '0px 1px 1px rgba(0, 0, 0, 0.2)';
	return (
		<AppBar
			position="fixed"
			sx={{
				display: topNavbarDisplay,
				bgcolor: backgroundColor,
				boxShadow: boxShadow,
			}}
		>
			<Toolbar
				sx={{
					bgcolor: backgroundColor,
					boxShadow: boxShadow,
				}}
			>
				<TopNavbarLogo />
				<Box sx={{ flexGrow: 1, minWidth: 5 }} />
				<TopNavbarSearch onSearch={handleSearch} />
			</Toolbar>
		</AppBar>
	);
}
