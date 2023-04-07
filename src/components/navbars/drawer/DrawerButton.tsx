import React from 'react';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import useTheme from '../../../hooks/useTheme';
import { useLocation } from 'react-router-dom';

const textDisplay = {
	xs: 'none',
	sm: 'none',
	md: 'none',
	lg: 'block',
	xl: 'block',
};

const buttonDisplay = {
	xs: 'flex',
	sm: 'flex',
	md: 'flex',
	lg: '',
	xl: '',
};

interface DrawerButtonProps {
	IconComponent: React.ElementType;
	text: string;
	path?: string;
	selectionBoolean?: boolean;
}

export default function DrawerButton({
	IconComponent,
	text,
	path,
	selectionBoolean,
}: DrawerButtonProps) {
	const { textAndIconColor, iconHoverBackgroundColor, theme } = useTheme();
	const { pathname } = useLocation();
	const fillIconColor =
		pathname === path || selectionBoolean
			? theme === 'dark'
				? 'white'
				: 'black'
			: 'none';
	return (
		<ListItem
			key={text}
			disablePadding
			sx={{
				height: 50,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ListItemButton
				sx={{
					borderRadius: 100,
					'&:hover': {
						backgroundColor: iconHoverBackgroundColor,
					},
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'row',
					display: buttonDisplay,
				}}
			>
				<ListItemIcon>
					<IconComponent
						fontSize="large"
						sx={{
							px: 1.3,
							stroke: textAndIconColor,
							strokeWidth: 1,
							fill: fillIconColor,
							'&:hover': {
								transform: 'scale(1.1)',
							},
						}}
					/>
				</ListItemIcon>
				<ListItemText
					sx={{
						display: textDisplay,
						color: textAndIconColor,
					}}
					primary={text}
				/>
			</ListItemButton>
		</ListItem>
	);
}
