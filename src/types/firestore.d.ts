import { DocumentReference, Timestamp } from 'firebase/firestore';

export type User = {
	username: string;
	email: string;
	profileImageUrl: string | null | undefined;
	bio: string;
	postCount: number;
	followersCount: number;
	followingCount: number;
};

export type Post = {
	userId: DocumentReference;
	imageUrl: string;
	caption: string;
	timestamp: Timestamp;
	likesCount: number;
	commentsCount: number;
};

export type Like = {
	userId: DocumentReference;
	postId: DocumentReference;
};

export type Comment = {
	userId: DocumentReference;
	postId: DocumentReference;
	text: string;
	timestamp: Timestamp;
};

export type Message = {
	senderId: DocumentReference;
	recipientId: DocumentReference;
	text: string;
	timestamp: Timestamp;
};

//User has follower
export type Follower = {
	userId: DocumentReference;
	followerUserId: DocumentReference;
};

//User is following
export type Following = {
	userId: DocumentReference;
	followingUserId: DocumentReference;
};
