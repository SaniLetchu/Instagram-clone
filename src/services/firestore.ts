import { firestore } from '../configs/firebase';
import {
	doc,
	updateDoc,
	runTransaction,
	collection,
	where,
	getDoc,
	addDoc,
	setDoc,
	query,
	getDocs,
} from 'firebase/firestore';
import { User } from '../types/firestore';

const usersRef = collection(firestore, 'users');
const postsRef = collection(firestore, 'posts');
const likesRef = collection(firestore, 'likes');
const commentsRef = collection(firestore, 'comments');
const messagesRef = collection(firestore, 'messages');
const followersRef = collection(firestore, 'followers'); //User has followers
const followingsRef = collection(firestore, 'followings'); //User is following

export async function isUsernameAvailable(username: string) {
	try {
		const q = query(usersRef, where('username', '==', username.toLowerCase()));
		const querySnapshot = await getDocs(q);
		return querySnapshot.empty;
	} catch (error) {
		console.error('Error checking username availability:', error);
		return false;
	}
}

export async function createUserDocument(
	username: string,
	email: string,
	userId: string,
	profileImageUrl: string | null | undefined = null
) {
	try {
		const newUser: User = {
			username,
			email,
			profileImageUrl,
			bio: '',
			postCount: 0,
			followersCount: 0,
			followingCount: 0,
		};

		const userDocRef = doc(firestore, 'users', userId);
		await setDoc(userDocRef, newUser);
		return true;
	} catch (error) {
		console.error('Error creating user document:', error);
		return false;
	}
}
