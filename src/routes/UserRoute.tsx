import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/DashboardPage';

export default function UserRoute() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<Routes>
			<Route path="/" Component={DashboardPage} />
		</Routes>
	);
}
