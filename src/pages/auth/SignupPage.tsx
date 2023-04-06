import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/forms/SignupForm';

export default function SignupPage() {
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
				<SignupForm />
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
					Have an account?{' '}
					<Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
						Log in
					</Link>
				</Typography>
			</Box>
		</Container>
	);
}
