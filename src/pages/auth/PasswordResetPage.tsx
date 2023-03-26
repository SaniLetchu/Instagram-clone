import React from 'react';
import { Container, Box } from '@mui/material';
import PasswordResetForm from '../../components/auth/PasswordResetForm';

export default function PasswordResetPage() {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 3,
				gap: 2,
			}}
		>
			<Box
				sx={{
					width: 270,
					px: 5,
					py: 3,
					border: '1px solid rgb(219, 219, 219)',
				}}
			>
				<PasswordResetForm />
			</Box>
		</Container>
	);
}
