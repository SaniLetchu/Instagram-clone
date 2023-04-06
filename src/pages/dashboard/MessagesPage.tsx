import React from 'react';
import { Container } from '@mui/material';
import useTheme from '../../hooks/useTheme';

export default function MessagesPage() {
	const { backgroundColor } = useTheme();
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
