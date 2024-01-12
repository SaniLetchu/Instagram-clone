import React from 'react';
import { Box } from '@mui/material';
import useTheme from '../../../hooks/useTheme';
import { Instagram } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const textDisplay = {
	xs: 'none',
	sm: 'none',
	md: 'none',
	lg: 'block',
	xl: 'block',
};

const logoDisplay = {
	xs: 'flex',
	sm: 'flex',
	md: 'flex',
	lg: 'none',
	xl: 'none',
};

export default function DrawerLogo() {
	const { backgroundColor, textAndIconColor, theme } = useTheme();
	const { pathname } = useLocation();
	const displayLogo = pathname === '/messages' ? 'flex' : logoDisplay;
	const displayText = pathname === '/messages' ? 'none' : textDisplay;
	return (
		<>
			<Box
				sx={{
					py: 3,
					paddingBottom: 1,
					bgcolor: backgroundColor,
					display: displayText,
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
			<Box
				sx={{
					py: 3,
					paddingBottom: 1,
					bgcolor: backgroundColor,
					display: displayLogo,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Instagram fontSize="medium" sx={{ color: textAndIconColor }} />
			</Box>
		</>
	);
}
