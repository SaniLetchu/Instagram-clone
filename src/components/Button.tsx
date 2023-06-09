import React from 'react';
import { ButtonBase, Typography } from '@mui/material';
import useTheme from '../hooks/useTheme';

interface ButtonProps {
	text: string;
	disabled?: boolean;
}

export default function Button({ text, disabled }: ButtonProps) {
	const { buttonBackgroundColor, reverseTextAndIconColor } = useTheme();
	return (
		<ButtonBase
			type="submit"
			disabled={disabled}
			sx={{
				px: 2,
				py: 0.5,
				display: 'flex',
				bgcolor: buttonBackgroundColor,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 3.5,
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
