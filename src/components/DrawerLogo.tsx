import React from 'react';
import { Box } from '@mui/material';
import useTheme from '../hooks/useTheme';
import { Instagram } from '@mui/icons-material';

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
	const { theme } = useTheme();
	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	const logoColor = theme === 'dark' ? 'white' : 'black';
	return (
		<>
			<Box
				sx={{
					py: 3,
					paddingBottom: 1,
					bgcolor: backgroundColor,
					display: textDisplay,
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
					display: logoDisplay,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Instagram fontSize="large" sx={{ color: logoColor }} />
			</Box>
		</>
	);
}
