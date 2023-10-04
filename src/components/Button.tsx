import React from 'react';
import { ButtonBase, Typography } from '@mui/material';
import useTheme from '../hooks/useTheme';

interface ButtonProps {
	text: string;
	disabled?: boolean;
	onClick?(): void;
}

export default function Button({ text, disabled, onClick }: ButtonProps) {
	const { buttonBackgroundColor, reverseTextAndIconColor } = useTheme();
	return (
		<ButtonBase
			type="submit"
			onClick={onClick}
			disabled={disabled}
			sx={{
				px: 2,
				py: 0.5,
				display: 'flex',
				bgcolor: buttonBackgroundColor,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 2.5,
			}}
		>
			<Typography
				sx={{
					color: reverseTextAndIconColor,
				}}
			>
				{text}
			</Typography>
		</ButtonBase>
	);
}
