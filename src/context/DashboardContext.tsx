import React, { createContext, useMemo, useState } from 'react';

interface DashboardContextInterface {
	page: string;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

interface DashboardProps {
	children: React.ReactNode;
}

export const DashboardContext = createContext<DashboardContextInterface>(
	{} as DashboardContextInterface
);

export default function DashboardProvider({ children }: DashboardProps) {
	const [page, setPage] = useState('home');

	const provider = useMemo(
		() => ({
			page,
			setPage,
		}),
		[page]
	);

	return (
		<DashboardContext.Provider value={provider}>
			{children}
		</DashboardContext.Provider>
	);
}
