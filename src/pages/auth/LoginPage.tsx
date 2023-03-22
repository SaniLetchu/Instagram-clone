import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
	return (
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				sx={{
					width: 400,
					px: 5,
					py: 3,
					border: '1px solid rgb(219, 219, 219)',
				}}
			>
				<LoginForm />
			</Box>
		</Container>
	);
}
