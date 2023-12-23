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
import { Grid, ButtonBase, Typography, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../../hooks/useDashboard';
import useTheme from '../../hooks/useTheme';
import { Follower, FollowerWithId } from '../../types/firestore';

interface FollowersGridProps {
	userId: string;
}

const imageSize = {
	xs: 100,
	sm: 115,
	md: 130,
	lg: 145,
	xl: 160,
};

export default function FollowersGrid({ userId }: FollowersGridProps) {
	const [followers, setFollowers] = useState<FollowerWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
	const [loading, setLoading] = useState(false);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);
	const { listenUserDocument, usersData } = useDashboard();
	const { borderColor, textAndIconColor } = useTheme();
	const navigate = useNavigate();

	const fetchMoreFollowers = async () => {
		setLoading(true);
		const followersRef = collection(firestore, 'followers');
		let followersQuery = query(
			followersRef,
			limit(9),
			where('userId', '==', userId)
		);
		if (lastVisible) {
			followersQuery = query(
				followersRef,
				startAfter(lastVisible),
				where('userId', '==', userId),
				limit(9)
			);
		}

		// Get the initial data and set up listeners for each document
		const querySnapshot = await getDocs(followersQuery);
		if (querySnapshot.docs.length === 0) {
			// No more posts to load, disable the "fetch more"
			setCanFetchMore(false);
			return;
		}
		querySnapshot.docs.forEach((document) => {
			const followerId = document.id;
			const followerData = document.data() as Follower;

			// Add new post to the state
			setFollowers((prevFollowers) => {
				if (
					!prevFollowers.some((prevFollower) => prevFollower.id === followerId)
				) {
					return [...prevFollowers, { id: followerId, ...followerData }];
				}
				return prevFollowers;
			});

			// Set up a listener for this specific document
			const docRef = doc(firestore, 'followers', followerId);

			const unsubscribeSnapshot = onSnapshot(docRef, (docSnapshot) => {
				const updatedFollower: FollowerWithId = {
					id: docSnapshot.id,
					...(docSnapshot.data() as Follower),
				};

				// Update the post in the state
				setFollowers((prevFollowers) =>
					prevFollowers.map((prevFollower) =>
						prevFollower.id === updatedFollower.id
							? updatedFollower
							: prevFollower
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
			fetchMoreFollowers();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastVisible]);

	useEffect(() => {
		fetchMoreFollowers();

		return () => {
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});

			setFollowers([]);
			setLastVisible(null);
			setLoading(false);
			setCanFetchMore(true);
			setUnsubscribes([]);
		};
	}, [userId]);

	useEffect(() => {
		followers.forEach((follower) => {
			if (!(follower.followerUserId in usersData)) {
				listenUserDocument(follower.followerUserId);
			}
		});
	}, [followers]);

	return (
		<Grid
			container
			justifyContent="flex-start"
			sx={{ px: 2, py: 2 }}
			spacing={0.5}
		>
			{followers.map((follower) => (
				<Grid
					key={follower.followerUserId}
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
					{usersData[follower.followerUserId] && (
						<>
							{!usersData[follower.followerUserId].profileImageUrl && (
								<ButtonBase
									onClick={async () => {
										navigate(`/profile/`);
										await setTimeout(() => null, 300);
										navigate(`/profile/${follower.followerUserId}`);
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
											{usersData[follower.followerUserId].username}
										</strong>{' '}
									</Typography>
								</ButtonBase>
							)}
							{usersData[follower.followerUserId].profileImageUrl && (
								<ButtonBase
									onClick={async () => {
										navigate(`/profile/`);
										await setTimeout(() => null, 300);
										navigate(`/profile/${follower.followerUserId}`);
									}}
									sx={{
										alignSelf: 'center',
										justifySelf: 'center',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Box
										component="img"
										sx={{
											height: imageSize,
											width: imageSize,
											objectFit: 'cover',
											borderRadius: '50%',
											border: 'solid 1px',
											borderColor: borderColor,
										}}
										src={
											usersData[follower.followerUserId]
												.profileImageUrl as string
										}
									/>
									<Typography sx={{ color: textAndIconColor }}>
										<strong>
											{usersData[follower.followerUserId].username}
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
