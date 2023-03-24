import React from 'react';
import { Container, ButtonBase } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export default function DashboardPage() {
	const { logout } = useAuth();
	return (
		<Container>
			<ButtonBase onClick={logout}>logout</ButtonBase>
		</Container>
	);
}
