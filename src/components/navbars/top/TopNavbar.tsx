import React, { useEffect, useRef, useState } from 'react';
import { Box, Toolbar, AppBar } from '@mui/material';
import TopNavbarLogo from './TopNavbarLogo';
import useTheme from '../../../hooks/useTheme';
import useDashboard from '../../../hooks/useDashboard';
import TopNavbarSearch from './TopNavbarSearch';

const topNavbarDisplay = {
	xs: 'block',
	sm: 'none',
	md: 'none',
	lg: 'none',
	xl: 'none',
};

export default function TopNavbar() {
	const { theme, backgroundColor } = useTheme();
	const boxShadow =
		theme === 'dark'
			? '0px 1px 1px rgba(250, 250, 250, 0.2)'
			: '0px 1px 1px rgba(0, 0, 0, 0.2)';
	const { setTopNavbarHeight, topNavbarHeight } = useDashboard();
	const navRef = useRef(null);
	const [observerValue, setObserverValue] = useState<ResizeObserver>();
	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { height } = entry.contentRect;
				if (topNavbarHeight != height) {
					setTopNavbarHeight(height);
				}
			}
		});
		setObserverValue(resizeObserver);
		return () => {
			observerValue?.disconnect();
		};
	}, []);

	useEffect(() => {
		if (navRef.current && observerValue) {
			observerValue.observe(navRef.current);
		}
		return () => {
			observerValue?.disconnect();
		};
	}, [navRef, observerValue]);

	return (
		<AppBar
			ref={navRef}
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
				<Box sx={{ flexGrow: 1, minWidth: 15 }} />
				<TopNavbarSearch />
			</Toolbar>
		</AppBar>
	);
}
