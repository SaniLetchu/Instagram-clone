import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';

export default function RootRoute() {
	const { user } = useAuth();

	return user ? <UserRoute /> : <AuthRoute />;
}
