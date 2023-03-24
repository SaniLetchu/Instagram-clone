import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import PasswordResetPage from '../pages/auth/PasswordResetPage';
import SignupPage from '../pages/auth/SignupPage';

export default function AuthRoute() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<Routes>
			<Route path="/" Component={LoginPage} />
			<Route path="/signup" Component={SignupPage} />
			<Route path="/resetpassword" Component={PasswordResetPage} />
		</Routes>
	);
}
