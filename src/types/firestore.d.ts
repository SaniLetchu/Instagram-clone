import { Timestamp } from 'firebase/firestore';

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
	userId: string;
	username: string;
	imageUrl: string;
	caption: string;
	timestamp: Timestamp;
	likesCount: number;
	commentsCount: number;
};

export type Like = {
	userId: string;
	postId: string;
};

export type Comment = {
	userId: string;
	postId: string;
	text: string;
	timestamp: Timestamp;
};

export type Message = {
	senderId: string;
	recipientId: string;
	text: string;
	timestamp: Timestamp;
};

//User has follower
export type Follower = {
	userId: string;
	followerUserId: string;
};

//User is following
export type Following = {
	userId: string;
	followingUserId: string;
};

export type PostWithId = Post & { id: string };
