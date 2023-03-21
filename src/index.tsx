import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoute from './routes';
import AuthProvider from './context/AuthContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<Router basename="/Instagram-clone">
				<RootRoute />
			</Router>
		</AuthProvider>
	</React.StrictMode>
);
