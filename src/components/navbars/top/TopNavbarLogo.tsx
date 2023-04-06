import React from 'react';
import { Box } from '@mui/material';
import useTheme from '../../../hooks/useTheme';

export default function TopNavbarLogo() {
	const { theme, backgroundColor } = useTheme();
	return (
		<Box
			sx={{
				bgcolor: backgroundColor,
				display: 'inline-block',
				height: '45px',
				mx: -5,
			}}
		>
			{theme === 'dark' && (
				<i
					data-visualcompletion="css-img"
					aria-label="Instagram"
					role="img"
					style={{
						backgroundImage:
							'url("https://static.cdninstagram.com/rsrc.php/v3/yK/r/ATdtiLb2BQ9.png")',
						backgroundPosition: '0px -53px',
						backgroundSize: '176px 181px',
						width: '175px',
						height: '51px',
						backgroundRepeat: 'no-repeat',
						display: 'inline-block',
						transform: 'scale(0.6)',
					}}
				></i>
			)}
			{theme === 'light' && (
				<i
					data-visualcompletion="css-img"
					aria-label="Instagram"
					role="img"
					style={{
						backgroundImage:
							'url("https://static.cdninstagram.com/rsrc.php/v3/yK/r/ATdtiLb2BQ9.png")',
						backgroundPosition: '0px 0px',
						backgroundSize: '176px 181px',
						width: '175px',
						height: '51px',
						backgroundRepeat: 'no-repeat',
						display: 'inline-block',
						transform: 'scale(0.6)',
					}}
				></i>
			)}
		</Box>
	);
}
