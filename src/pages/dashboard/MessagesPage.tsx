import React from 'react';
import { Container } from '@mui/material';
import useTheme from '../../hooks/useTheme';

export default function MessagesPage() {
	const { theme } = useTheme();
	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				display: 'flex',
				bgcolor: backgroundColor,
				justifyContent: 'center',
			}}
		>
			messages
		</Container>
	);
}
