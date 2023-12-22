import React, { useState, useEffect, useRef } from 'react';
import { Divider, Typography, List } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useTheme from '../../../hooks/useTheme';
import useDashboard from '../../../hooks/useDashboard';
import Comment from './Comment';
import { firestore } from '../../../configs/firebase';
import {
	collection,
	query,
	doc,
	orderBy,
	limit,
	where,
	startAfter,
	onSnapshot,
	getDocs,
	DocumentSnapshot,
} from 'firebase/firestore';
import {
	Comment as CommentType,
	CommentWithId,
} from '../../../types/firestore';

export default function CommentsInfiniteScroll() {
	const { postId, openCommentsDrawer, setOpenCommentsDrawer, setPostId } =
		useDashboard();
	const { textAndIconColor, borderColor, secondaryBackgroundColor } =
		useTheme();
	const listRef = useRef<HTMLUListElement | null>(null);

	const [comments, setComments] = useState<CommentWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
	const [loading, setLoading] = useState(false);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);

	const fetchMoreComments = async () => {
		setLoading(true);
		const commentsRef = collection(firestore, 'comments');
		let commentsQuery = query(
			commentsRef,
			where('postId', '==', postId),
			orderBy('timestamp', 'desc'),
			limit(10)
		);
		if (lastVisible) {
			commentsQuery = query(
				commentsRef,
				where('postId', '==', postId),
				orderBy('timestamp', 'desc'),
				startAfter(lastVisible),
				limit(10)
			);
		}

		// Get the initial data and set up listeners for each document
		const querySnapshot = await getDocs(commentsQuery);
		if (querySnapshot.docs.length === 0) {
			// No more posts to load, disable the "fetch more"
			setCanFetchMore(false);
			return;
		}
		querySnapshot.docs.forEach((document) => {
			const commentId = document.id;
			const commentData = document.data() as CommentType;

			// Add new comment to the state
			setComments((prevComments) => {
				if (!prevComments.some((prevComment) => prevComment.id === commentId)) {
					return [...prevComments, { id: commentId, ...commentData }];
				}
				return prevComments;
			});

			// Set up a listener for this specific document
			const docRef = doc(firestore, 'comments', commentId);

			const unsubscribeSnapshot = onSnapshot(docRef, (docSnapshot) => {
				const updatedComment: CommentWithId = {
					id: docSnapshot.id,
					...(docSnapshot.data() as CommentType),
				};

				// Update the comment in the state
				setComments((prevComments) =>
					prevComments.map((prevComment) =>
						prevComment.id === updatedComment.id ? updatedComment : prevComment
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
		if (
			listRef.current &&
			listRef.current.scrollHeight - listRef.current.scrollTop <=
				listRef.current.clientHeight + 1 &&
			!loading &&
			canFetchMore
		) {
			fetchMoreComments();
		}
	};

	useEffect(() => {
		const listElement = listRef.current;
		listElement?.addEventListener('scroll', handleScroll);
		return () => {
			listElement?.removeEventListener('scroll', handleScroll);
		};
	}, [lastVisible]);

	useEffect(() => {
		fetchMoreComments();

		return () => {
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});

			setComments([]);
			setLastVisible(null);
			setLoading(false);
			setCanFetchMore(true);
			setUnsubscribes([]);
		};
	}, [openCommentsDrawer]);

	return (
		<SwipeableDrawer
			anchor={'bottom'}
			open={openCommentsDrawer}
			onOpen={() => null}
			onClose={() => {
				setOpenCommentsDrawer(false);
				setPostId('');
			}}
			PaperProps={{
				sx: {
					backgroundColor: secondaryBackgroundColor,
					maxWidth: 'calc(100% - 10px);',
					width: '600px',
					maxHeight: 'calc(100% - 20px);',
					height: '400px',
					margin: 'auto',
					borderTopLeftRadius: '16px',
					borderTopRightRadius: '16px',
				},
			}}
		>
			<Typography sx={{ marginX: 'auto', color: textAndIconColor, py: 1 }}>
				<strong>Comments</strong>
			</Typography>
			<Divider sx={{ backgroundColor: borderColor, width: '100%' }} />
			<List
				ref={listRef}
				style={{
					maxHeight: '100%',
					height: '100%',
					overflow: 'auto',
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
				}}
			>
				{comments.map((comment) => (
					<Comment comment={comment} />
				))}
			</List>
		</SwipeableDrawer>
	);
}
