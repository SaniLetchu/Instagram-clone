import React, { createContext, useMemo, useState, useEffect } from 'react';
import { firestore } from '../configs/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { User } from '../types/firestore';

interface DashboardContextInterface {
	openCreatePostModal: boolean;
	setOpenCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
	openPostModal: boolean;
	setOpenPostModal: React.Dispatch<React.SetStateAction<boolean>>;
	postId: string;
	setPostId: React.Dispatch<React.SetStateAction<string>>;
	openCommentsDrawer: boolean;
	setOpenCommentsDrawer: React.Dispatch<React.SetStateAction<boolean>>;
	usersData: Record<string, User>;
	listenUserDocument: (userId: string) => void;
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
	const [openCommentsDrawer, setOpenCommentsDrawer] = useState(false);
	const [usersData, setUsersData] = useState<Record<string, User>>({});
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);

	const listenUserDocument = async (userId: string) => {
		if (!(userId in usersData)) {
			//Insert some data immediatelly so we avoid multiple listeners if this function is called multiple times in a short time
			setUsersData((prevUsersData) => ({
				...prevUsersData,
				[userId]: {
					username: '',
					email: '',
					profileImageUrl: null,
					bio: '',
					postCount: 0,
					followersCount: 0,
					followingCount: 0,
				},
			}));

			const userRef = doc(firestore, 'users', userId);

			const unsubscribeSnapshot = onSnapshot(userRef, (docSnapshot) => {
				const userData: User = docSnapshot.data() as User;

				setUsersData((prevUsersData) => ({
					...prevUsersData,
					[userId]: userData,
				}));

				setUnsubscribes((prevUnsubscribes) => [
					...prevUnsubscribes,
					unsubscribeSnapshot,
				]);
			});
		}
	};

	useEffect(() => {
		return () => {
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});
		};
	}, []);

	const provider = useMemo(
		() => ({
			openCreatePostModal,
			setOpenCreatePostModal,
			openPostModal,
			setOpenPostModal,
			postId,
			setPostId,
			openCommentsDrawer,
			setOpenCommentsDrawer,
			listenUserDocument,
			usersData,
		}),
		[openCreatePostModal, postId, openPostModal, openCommentsDrawer, usersData]
	);

	return (
		<DashboardContext.Provider value={provider}>
			{children}
		</DashboardContext.Provider>
	);
}
