import React, { useState, useEffect } from 'react';
import { firestore } from '../../configs/firebase';
import {
	collection,
	query,
	doc,
	orderBy,
	limit,
	startAfter,
	onSnapshot,
	getDocs,
	DocumentSnapshot,
} from 'firebase/firestore';
import { Post as PostType, PostWithId } from '../../types/firestore';
import Post from './Post';

export default function PostsInfiniteScroll() {
	const [posts, setPosts] = useState<PostWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
	const [loading, setLoading] = useState(false);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);

	const fetchMorePosts = async () => {
		setLoading(true);
		const postsRef = collection(firestore, 'posts');
		let postsQuery = query(postsRef, orderBy('timestamp', 'desc'), limit(5));
		if (lastVisible) {
			postsQuery = query(
				postsRef,
				orderBy('timestamp', 'desc'),
				startAfter(lastVisible),
				limit(5)
			);
		}

		// Get the initial data and set up listeners for each document
		const querySnapshot = await getDocs(postsQuery);
		if (querySnapshot.docs.length === 0) {
			// No more posts to load, disable the "fetch more"
			setCanFetchMore(false);
			return;
		}
		querySnapshot.docs.forEach((document) => {
			const postId = document.id;
			const postData = document.data() as PostType;

			// Add new post to the state
			setPosts((prevPosts) => {
				if (!prevPosts.some((prevPost) => prevPost.id === postId)) {
					return [...prevPosts, { id: postId, ...postData }];
				}
				return prevPosts;
			});

			// Set up a listener for this specific document
			const docRef = doc(firestore, 'posts', postId);

			const unsubscribeSnapshot = onSnapshot(docRef, (docSnapshot) => {
				const updatedPost: PostWithId = {
					id: docSnapshot.id,
					...(docSnapshot.data() as PostType),
				};

				// Update the post in the state
				setPosts((prevPosts) =>
					prevPosts.map((prevPost) =>
						prevPost.id === updatedPost.id ? updatedPost : prevPost
					)
				);
			});

			setUnsubscribes((prevUnsubscribes) => [
				...prevUnsubscribes,
				unsubscribeSnapshot,
			]);
		});

		setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
		setLoading(false);
	};

	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const clientHeight = window.innerHeight;
		const scrollHeight = document.documentElement.scrollHeight;
		const threshold = 0;
		if (
			scrollHeight - scrollTop - threshold <= clientHeight &&
			!loading &&
			canFetchMore
		) {
			fetchMorePosts();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastVisible]);

	useEffect(() => {
		fetchMorePosts();

		return () => {
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});
		};
	}, []);

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '1rem',
			}}
		>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
			{loading && <p>Loading...</p>}
		</div>
	);
}
