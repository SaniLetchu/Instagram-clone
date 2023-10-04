import React, { createContext, useMemo, useState } from 'react';

interface DashboardContextInterface {
	openCreatePostModal: boolean;
	setOpenCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
	openPostModal: boolean;
	setOpenPostModal: React.Dispatch<React.SetStateAction<boolean>>;
	postId: string;
	setPostId: React.Dispatch<React.SetStateAction<string>>;
}

interface DashboardProps {
	children: React.ReactNode;
}

export const DashboardContext = createContext<DashboardContextInterface>(
	{} as DashboardContextInterface
);

export default function DashboardProvider({ children }: DashboardProps) {
	const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
	const [openPostModal, setOpenPostModal] = useState(false);
	const [postId, setPostId] = useState('');

	const provider = useMemo(
		() => ({
			openCreatePostModal,
			setOpenCreatePostModal,
			openPostModal,
			setOpenPostModal,
			postId,
			setPostId,
		}),
		[openCreatePostModal, postId, openPostModal]
	);

	return (
		<DashboardContext.Provider value={provider}>
			{children}
		</DashboardContext.Provider>
	);
}
