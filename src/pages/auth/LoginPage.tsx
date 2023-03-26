import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
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
				<LoginForm />
			</Box>
			<Box
				sx={{
					width: 270,
					px: 5,
					py: 3,
					border: '1px solid rgb(219, 219, 219)',
				}}
			>
				<Typography textAlign={'center'}>
					Don't have an account?{' '}
					<Link
						style={{ textDecoration: 'none', color: 'inherit' }}
						to="/signup"
					>
						Sign up
					</Link>
				</Typography>
			</Box>
		</Container>
	);
}
