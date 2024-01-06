import { firestore, storage } from '../configs/firebase';
import {
	doc,
	updateDoc,
	runTransaction,
	collection,
	where,
	getDoc,
	limit,
	deleteDoc,
	addDoc,
	setDoc,
	query,
	getDocs,
	serverTimestamp,
	Timestamp,
	increment,
} from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import {
	Post,
	User,
	Like,
	Comment,
	Follower,
	Following,
	UserWithId,
} from '../types/firestore';

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

export async function createPost(
	caption: string,
	image: File,
	userId: string,
	username: string
) {
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
			username,
			imageUrl: url,
			userId,
			timestamp: serverTimestamp() as Timestamp,
			likesCount: 0,
			commentsCount: 0,
		};
		await addDoc(postsRef, newPost);
		const userDocRef = doc(firestore, 'users', userId);
		await updateDoc(userDocRef, {
			postCount: increment(1),
		});
		return true;
	} catch (error) {
		console.error('Error creating post:', error);
		return false;
	}
}

export async function updateUserProfile(
	userId: string,
	bio: string | undefined,
	profileImage: File | null | undefined
) {
	try {
		const userDocRef = doc(firestore, 'users', userId);

		let profileImageUrl;

		if (profileImage) {
			const randomName = userId;
			const storageRef = ref(storage, `profilepic/${randomName}`);
			const snapshot = await uploadBytes(storageRef, profileImage);
			profileImageUrl = await getDownloadURL(snapshot.ref);
		}

		const updateData: Partial<User> = {
			...(bio && { bio }),
			...(profileImageUrl && { profileImageUrl }),
		};

		await updateDoc(userDocRef, updateData);
		return true;
	} catch (error) {
		console.error('Error updating user profile:', error);
		return false;
	}
}

export async function toggleLike(postId: string, userId: string) {
	try {
		const postDocRef = doc(firestore, 'posts', postId);
		const likeDocRef = doc(firestore, 'likes', `${userId}_${postId}`);
		const likeQuery = query(
			likesRef,
			where('postId', '==', postId),
			where('userId', '==', userId)
		);

		const querySnapshot = await getDocs(likeQuery);

		if (querySnapshot.empty) {
			// The like document doesn't exist; create it and increment likesCount
			const newLike: Like = {
				postId,
				userId,
			};

			await setDoc(likeDocRef, newLike);
			await updateDoc(postDocRef, {
				likesCount: increment(1),
			});
		} else {
			await deleteDoc(likeDocRef);
			await updateDoc(postDocRef, {
				likesCount: increment(-1),
			});
		}
		return true;
	} catch (error) {
		console.error('Error toggling like:', error);
		return false;
	}
}

export async function createComment(
	postId: string,
	userId: string,
	username: string,
	comment: string
) {
	try {
		const newComment: Comment = {
			postId,
			userId,
			username,
			text: comment,
			timestamp: serverTimestamp() as Timestamp,
		};

		await addDoc(commentsRef, newComment);

		await updateDoc(doc(firestore, 'posts', postId), {
			commentsCount: increment(1),
		});
		return true;
	} catch (error) {
		console.error('Error creating comment:', error);
		return false;
	}
}

export async function followUser(userId: string, followedId: string) {
	try {
		const followerDocRef = doc(
			firestore,
			'followers',
			`${followedId}_${userId}`
		);
		const followerData: Follower = {
			userId: followedId,
			followerUserId: userId,
		};
		await setDoc(followerDocRef, followerData);

		const userDocRef = doc(firestore, 'users', userId);
		await updateDoc(userDocRef, { followingCount: increment(1) });

		const followedUserDocRef = doc(firestore, 'users', followedId);
		await updateDoc(followedUserDocRef, { followersCount: increment(1) });

		// For managing the followings collection
		const followingDocRef = doc(
			firestore,
			'followings',
			`${userId}_${followedId}`
		);
		const followingData: Following = {
			userId: userId,
			followingUserId: followedId,
		};
		await setDoc(followingDocRef, followingData);

		return true;
	} catch (error) {
		console.error('Error following user:', error);
		return false;
	}
}

export async function unFollowUser(userId: string, followedId: string) {
	try {
		const followerDocRef = doc(
			firestore,
			'followers',
			`${followedId}_${userId}`
		);
		await deleteDoc(followerDocRef);

		const userDocRef = doc(firestore, 'users', userId);
		await updateDoc(userDocRef, { followingCount: increment(-1) });

		const followedUserDocRef = doc(firestore, 'users', followedId);
		await updateDoc(followedUserDocRef, { followersCount: increment(-1) });

		// For managing the followings collection
		const followingDocRef = doc(
			firestore,
			'followings',
			`${userId}_${followedId}`
		);
		await deleteDoc(followingDocRef);

		return true;
	} catch (error) {
		console.error('Error unfollowing user:', error);
		return false;
	}
}

export async function searchForUser(searchString: string) {
	try {
		const querySnapshot = await getDocs(
			query(
				usersRef,
				where('username', '>=', searchString),
				where('username', '<=', searchString + '\uf8ff'),
				limit(5)
			)
		);

		const users: UserWithId[] = [];
		querySnapshot.forEach((document) => {
			const userData = document.data() as UserWithId;
			const userWithId = { ...userData, id: document.id };
			users.push(userWithId);
		});
		return users;
	} catch (error) {
		console.error('Error searching for users:', error);
		return [];
	}
}
