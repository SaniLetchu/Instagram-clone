import React, { createContext, useMemo, useState } from 'react';

interface DashboardContextInterface {
	openCreatePostModal: boolean;
	setOpenCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DashboardProps {
	children: React.ReactNode;
}

export const DashboardContext = createContext<DashboardContextInterface>(
	{} as DashboardContextInterface
);

export default function DashboardProvider({ children }: DashboardProps) {
	const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

	const provider = useMemo(
		() => ({
			openCreatePostModal,
			setOpenCreatePostModal,
		}),
		[openCreatePostModal]
	);

	return (
		<DashboardContext.Provider value={provider}>
			{children}
		</DashboardContext.Provider>
	);
}
