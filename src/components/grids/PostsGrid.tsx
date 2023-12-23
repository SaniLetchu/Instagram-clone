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
	where,
} from 'firebase/firestore';
import { Grid, Typography, Box } from '@mui/material';
import { ModeCommentRounded, Favorite } from '@mui/icons-material';
import { Post as PostType, PostWithId } from '../../types/firestore';

interface PostsGridProps {
	userId: string;
}

const marginBottom = {
	xs: 6,
	sm: 0,
	md: 0,
	lg: 0,
	xl: 0,
};

const gapSize = {
	xs: 4,
	sm: 4,
	md: 6,
	lg: 8,
	xl: 10,
};

export default function PostsGrid({ userId }: PostsGridProps) {
	const [posts, setPosts] = useState<PostWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
	const [loading, setLoading] = useState(false);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);

	const fetchMorePosts = async () => {
		setLoading(true);
		const postsRef = collection(firestore, 'posts');
		let postsQuery = query(
			postsRef,
			orderBy('timestamp', 'desc'),
			limit(9),
			where('userId', '==', userId)
		);
		if (lastVisible) {
			postsQuery = query(
				postsRef,
				orderBy('timestamp', 'desc'),
				startAfter(lastVisible),
				where('userId', '==', userId),
				limit(9)
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
			setLastVisible(null);
			setPosts([]);
			setLoading(false);
			setCanFetchMore(true);
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});
			setUnsubscribes([]);
		};
	}, [userId]);

	return (
		<Grid
			container
			justifyContent="flex-start"
			sx={{ px: 2, py: 2, marginBottom: marginBottom }}
			spacing={0.5}
		>
			{posts.map((post) => (
				<Grid
					key={post.id}
					item
					xs={4}
					sx={{
						position: 'relative',
						width: '100%',
						aspectRatio: '1 / 1',
						overflow: 'hidden', // Ensure the overlay stays within the grid item
					}}
				>
					<img
						src={post.imageUrl}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
					{/* Overlay div */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change this color and opacity as needed
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							opacity: 0,
							transition: 'opacity 0.3s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.opacity = '1';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.opacity = '0';
						}}
					>
						<Box
							sx={{
								color: 'white',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								gap: gapSize,
							}}
						>
							<Box sx={{ display: 'flex', gap: 0.5 }}>
								<Favorite
									sx={{
										color: 'white',
									}}
									fontSize="medium"
								/>
								<Typography sx={{ color: 'white' }}>
									<strong>{post.likesCount}</strong>
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', gap: 0.5 }}>
								<ModeCommentRounded
									sx={{
										color: 'white',
									}}
									fontSize="medium"
								/>
								<Typography sx={{ color: 'white' }}>
									<strong>{post.commentsCount}</strong>
								</Typography>
							</Box>
						</Box>
					</div>
				</Grid>
			))}
		</Grid>
	);
}
