import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoute from './routes';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<ThemeProvider>
				<Router basename="/Instagram-clone">
					<RootRoute />
				</Router>
			</ThemeProvider>
		</AuthProvider>
	</React.StrictMode>
);
