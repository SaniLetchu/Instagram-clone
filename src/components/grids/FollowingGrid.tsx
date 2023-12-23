import React, { useState, useEffect } from 'react';
import { firestore } from '../../configs/firebase';
import {
	collection,
	query,
	doc,
	limit,
	startAfter,
	onSnapshot,
	getDocs,
	DocumentSnapshot,
	where,
} from 'firebase/firestore';
import { Grid, ButtonBase, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../../hooks/useDashboard';
import useTheme from '../../hooks/useTheme';
import { Following, FollowingWithId } from '../../types/firestore';

interface FollowingGridProps {
	userId: string;
}

export default function FollowingGrid({ userId }: FollowingGridProps) {
	const [followings, setFollowings] = useState<FollowingWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
	const [loading, setLoading] = useState(false);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);
	const { listenUserDocument, usersData } = useDashboard();
	const { borderColor, textAndIconColor } = useTheme();
	const navigate = useNavigate();

	const fetchMoreFollowings = async () => {
		setLoading(true);
		const followingsRef = collection(firestore, 'followings');
		let followingsQuery = query(
			followingsRef,
			limit(9),
			where('userId', '==', userId)
		);
		if (lastVisible) {
			followingsQuery = query(
				followingsRef,
				startAfter(lastVisible),
				where('userId', '==', userId),
				limit(9)
			);
		}

		// Get the initial data and set up listeners for each document
		const querySnapshot = await getDocs(followingsQuery);
		if (querySnapshot.docs.length === 0) {
			// No more posts to load, disable the "fetch more"
			setCanFetchMore(false);
			return;
		}
		querySnapshot.docs.forEach((document) => {
			const followingId = document.id;
			const followingData = document.data() as Following;

			// Add new post to the state
			setFollowings((prevFollowings) => {
				if (
					!prevFollowings.some(
						(prevFollowing) => prevFollowing.id === followingId
					)
				) {
					return [...prevFollowings, { id: followingId, ...followingData }];
				}
				return prevFollowings;
			});

			// Set up a listener for this specific document
			const docRef = doc(firestore, 'followings', followingId);

			const unsubscribeSnapshot = onSnapshot(docRef, (docSnapshot) => {
				const updatedFollowing: FollowingWithId = {
					id: docSnapshot.id,
					...(docSnapshot.data() as Following),
				};

				// Update the post in the state
				setFollowings((prevFollowings) =>
					prevFollowings.map((prevFollowing) =>
						prevFollowing.id === updatedFollowing.id
							? updatedFollowing
							: prevFollowing
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
			fetchMoreFollowings();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastVisible]);

	useEffect(() => {
		fetchMoreFollowings();

		return () => {
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});

			setFollowings([]);
			setLastVisible(null);
			setLoading(false);
			setCanFetchMore(true);
			setUnsubscribes([]);
		};
	}, [userId]);

	useEffect(() => {
		followings.forEach((following) => {
			if (!(following.followingUserId in usersData)) {
				listenUserDocument(following.followingUserId);
			}
		});
	}, [followings]);

	return (
		<Grid
			container
			justifyContent="flex-start"
			sx={{ px: 2, py: 2 }}
			spacing={0.5}
		>
			{followings.map((following) => (
				<Grid
					key={following.followingUserId}
					item
					xs={4}
					sx={{
						width: '75%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{usersData[following.followingUserId] && (
						<>
							{!usersData[following.followingUserId].profileImageUrl && (
								<ButtonBase
									onClick={async () => {
										navigate(`/profile/`);
										await setTimeout(() => null, 300);
										navigate(`/profile/${following.followingUserId}`);
									}}
									sx={{
										alignSelf: 'center',
										justifySelf: 'center',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<AccountCircle sx={{ fontSize: 130, color: 'gray' }} />
									<Typography sx={{ color: textAndIconColor }}>
										<strong>
											{usersData[following.followingUserId].username}
										</strong>{' '}
									</Typography>
								</ButtonBase>
							)}
							{usersData[following.followingUserId].profileImageUrl && (
								<ButtonBase
									onClick={async () => {
										navigate(`/profile/`);
										await setTimeout(() => null, 300);
										navigate(`/profile/${following.followingUserId}`);
									}}
									sx={{
										alignSelf: 'center',
										justifySelf: 'center',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<img
										style={{
											height: 130,
											width: 130,
											objectFit: 'cover',
											borderRadius: '50%',
											border: 'solid 1px',
											borderColor: borderColor,
										}}
										src={
											usersData[following.followingUserId]
												.profileImageUrl as string
										}
									/>
									<Typography sx={{ color: textAndIconColor }}>
										<strong>
											{usersData[following.followingUserId].username}
										</strong>{' '}
									</Typography>
								</ButtonBase>
							)}
						</>
					)}
				</Grid>
			))}
		</Grid>
	);
}
