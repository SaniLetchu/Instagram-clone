import { firestore, storage } from '../configs/firebase';
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
	serverTimestamp,
	Timestamp,
} from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { Post, User } from '../types/firestore';

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

export async function createPost(caption: string, image: File, userId: string) {
	function generateRandomString(length: number) {
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';

		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}

		return result;
	}
	try {
		const extension = image.name.split('.').pop();
		const randomName = generateRandomString(16);
		const storageRef = ref(storage, `posts/${randomName}.${extension}`);
		const snapshot = await uploadBytes(storageRef, image);

		const url = await getDownloadURL(snapshot.ref);

		const newPost: Post = {
			caption,
			imageUrl: url,
			userId,
			timestamp: serverTimestamp() as Timestamp,
			likesCount: 0,
			commentsCount: 0,
		};
		await addDoc(postsRef, newPost);
		return true;
	} catch (error) {
		console.error('Error creating post:', error);
		return false;
	}
}
