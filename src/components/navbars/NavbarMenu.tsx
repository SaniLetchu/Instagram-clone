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
import { useNavigate } from 'react-router-dom';

export default function NavbarMenu() {
	const { secondaryBackgroundColor, textAndIconColor, toggleTheme } =
		useTheme();
	const { logout } = useAuth();
	const navigate = useNavigate();

	return (
		<Paper
			sx={{ width: 320, maxWidth: '100%', bgcolor: secondaryBackgroundColor }}
		>
			<MenuList>
				<MenuItem onClick={() => navigate('/settings')}>
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
