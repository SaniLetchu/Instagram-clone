import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signOut,
	User as FirebaseUser,
	UserCredential,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

interface AuthContextInterface {
	user: FirebaseUser | null;
	login(email: string, password: string): Promise<UserCredential>;
	signup(email: string, password: string): Promise<UserCredential>;
	logout(): Promise<void>;
	resetPassword(email: string): Promise<void>;
	loginGoogle(): Promise<UserCredential>;
}

interface AuthProps {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextInterface>(
	{} as AuthContextInterface
);

export default function AuthProvider({ children }: AuthProps) {
	const [user, setUser] = useState<FirebaseUser | null>(null);

	const providerGoogle = new GoogleAuthProvider();

	async function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signup(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function logout() {
		return signOut(auth);
	}
	function resetPassword(email: string) {
		return sendPasswordResetEmail(auth, email);
	}
	function loginGoogle() {
		return signInWithPopup(auth, providerGoogle);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const provider = useMemo(
		() => ({
			user,
			login,
			signup,
			logout,
			resetPassword,
			loginGoogle,
		}),
		[user]
	);
	return (
		<AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
	);
}
