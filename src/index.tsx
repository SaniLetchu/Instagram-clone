import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoute from './routes';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import UserProvider from './context/UserContext';
import DashboardProvider from './context/DashboardContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<UserProvider>
				<DashboardProvider>
					<ThemeProvider>
						<Router basename="/Instagram-clone">
							<RootRoute />
						</Router>
					</ThemeProvider>
				</DashboardProvider>
			</UserProvider>
		</AuthProvider>
	</React.StrictMode>
);
