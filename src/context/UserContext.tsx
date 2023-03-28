import React, { createContext, useMemo, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { firestore } from '../configs/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserData {
	// Define the shape of the user data here
	name: string;
	email: string;
	// ...
}

interface UserContextInterface {
	userData: UserData | null;
	isNewAccount: boolean;
}

interface UserProps {
	children: React.ReactNode;
}

export const UserContext = createContext<UserContextInterface>(
	{} as UserContextInterface
);

const listenToUser = (
	userId: string,
	setUser: (user: UserData | null) => void,
	setIsNewAccount: (isNewAccount: boolean) => void
) => {
	return onSnapshot(doc(firestore, 'users', userId), (document) => {
		setUser(document.exists() ? (document.data() as UserData) : null);
		setIsNewAccount(document.exists() ? false : true);
	});
};

export default function UserProvider({ children }: UserProps) {
	const { user } = useAuth();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isNewAccount, setIsNewAccount] = useState<boolean>(false);

	useEffect(() => {
		let unsubscribe: (() => void) | null = null;

		if (user) {
			unsubscribe = listenToUser(user.uid, setUserData, setIsNewAccount);
		} else {
			setUserData(null);
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
			setUserData(null);
		};
	}, [user]);

	const provider = useMemo(
		() => ({
			userData,
			isNewAccount,
		}),
		[userData, isNewAccount]
	);

	return (
		<UserContext.Provider value={provider}>{children}</UserContext.Provider>
	);
}
