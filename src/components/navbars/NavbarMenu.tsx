import React from 'react';
import {
	ListItemText,
	ListItemIcon,
	MenuItem,
	MenuList,
	Paper,
	Divider,
} from '@mui/material';
import { Settings, DarkMode, Logout } from '@mui/icons-material';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

export default function NavbarMenu() {
	const { theme, toggleTheme } = useTheme();
	const { logout } = useAuth();
	const textAndIconColor = theme === 'dark' ? 'white' : 'black';
	const backgroundColor = theme === 'dark' ? 'rgb(38, 38, 38)' : 'white';

	return (
		<Paper sx={{ width: 320, maxWidth: '100%', bgcolor: backgroundColor }}>
			<MenuList>
				<MenuItem>
					<ListItemText sx={{ color: textAndIconColor }}>Settings</ListItemText>
					<ListItemIcon sx={{ color: textAndIconColor }}>
						<Settings fontSize="small" />
					</ListItemIcon>
				</MenuItem>
				<MenuItem onClick={toggleTheme}>
					<ListItemText sx={{ color: textAndIconColor }}>
						Switch appearance
					</ListItemText>
					<ListItemIcon sx={{ color: textAndIconColor }}>
						<DarkMode fontSize="small" />
					</ListItemIcon>
				</MenuItem>
				<Divider />
				<MenuItem onClick={logout}>
					<ListItemText sx={{ color: textAndIconColor }}>Log out</ListItemText>
					<ListItemIcon sx={{ color: textAndIconColor }}>
						<Logout fontSize="small" />
					</ListItemIcon>
				</MenuItem>
			</MenuList>
		</Paper>
	);
}
