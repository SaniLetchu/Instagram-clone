import React from 'react';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import useTheme from '../../hooks/useTheme';

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
}

export default function DrawerButton({
	IconComponent,
	text,
}: DrawerButtonProps) {
	const { theme } = useTheme();
	const textAndIconColor = theme === 'dark' ? 'white' : 'black';
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
						backgroundColor:
							theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)',
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
							color: textAndIconColor,
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
