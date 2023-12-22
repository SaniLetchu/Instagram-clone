import React from 'react';
import { ButtonBase, Typography } from '@mui/material';
import useTheme from '../hooks/useTheme';

interface ButtonProps {
	text: string;
	disabled?: boolean;
	onClick?(): void;
	backgroundColor?: string;
	textColor?: string;
}

export default function Button({
	text,
	disabled,
	onClick,
	backgroundColor,
	textColor,
}: ButtonProps) {
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
				bgcolor: backgroundColor ? backgroundColor : buttonBackgroundColor,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 2.5,
			}}
		>
			<Typography
				sx={{
					color: textColor ? textColor : reverseTextAndIconColor,
				}}
			>
				{text}
			</Typography>
		</ButtonBase>
	);
}
