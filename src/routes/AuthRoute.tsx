import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';

export default function AuthRoute() {
	return (
		<Routes>
			<Route path="/" Component={LoginPage} />
		</Routes>
	);
}
