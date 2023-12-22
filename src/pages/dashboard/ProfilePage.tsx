import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, ButtonBase } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import useUser from '../../hooks/useUser';
import { User } from '../../types/firestore';
import { followUser, unFollowUser } from '../../services/firestore';
import useAuth from '../../hooks/useAuth';
import { onSnapshot, doc } from 'firebase/firestore';
import { firestore } from '../../configs/firebase';
import { useParams, useNavigate } from 'react-router-dom';
import {
	AccountCircle,
	Settings,
	PersonAdd,
	PersonRemove,
} from '@mui/icons-material';
import Button from '../../components/Button';

const displayButtonText = {
	xs: 'none',
	sm: 'none',
	md: 'block',
	lg: 'block',
	xl: 'block',
};

const displayButtonIcon = {
	xs: 'flex',
	sm: 'flex',
	md: 'none',
	lg: 'none',
	xl: 'none',
};

export default function ProfilePage() {
	const {
		backgroundColor,
		textAndIconColor,
		borderColor,
		buttonBackgroundColor,
		reverseTextAndIconColor,
	} = useTheme();
	const { userData } = useUser();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [userdata, setUserData] = useState<User>();
	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	const { userId } = useParams();

	useEffect(() => {
		if (userId !== user?.uid) {
			const userRef = doc(firestore, 'users', userId as string);
			const unsubscribe = onSnapshot(userRef, (snapshot) => {
				setUserData(snapshot.data() as User);
			});

			return () => unsubscribe();
		} else {
			setUserData(userData as User);
		}
	}, [userId]);

	useEffect(() => {
		if (userId !== user?.uid) {
			const followingRef = doc(
				firestore,
				'followings',
				`${user?.uid}_${userId}` as string
			);
			const unsubscribe = onSnapshot(followingRef, (snapshot) => {
				if (snapshot.exists()) {
					setIsFollowing(true);
				} else {
					setIsFollowing(false);
				}
			});

			return () => unsubscribe();
		}
	}, [userId]);

	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				display: 'flex',
				flexDirection: 'column',
				bgcolor: backgroundColor,
				alignItems: 'center',
				paddingTop: 5,
				gap: 2,
			}}
		>
			{userId !== user?.uid && !isFollowing && (
				<Box sx={{ position: 'absolute', right: 20 }}>
					<Box sx={{ display: displayButtonText }}>
						<Button
							text="Follow"
							onClick={() => followUser(user?.uid as string, userId as string)}
							backgroundColor="rgb(0, 149, 246)"
							textColor="white"
						/>
					</Box>
					<ButtonBase
						type="submit"
						onClick={() => followUser(user?.uid as string, userId as string)}
						sx={{
							px: 2,
							py: 0.5,
							bgcolor: 'rgb(0, 149, 246)',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 2.5,
							display: displayButtonIcon,
						}}
					>
						<PersonAdd
							sx={{
								color: 'white',
							}}
						/>
					</ButtonBase>
				</Box>
			)}
			{userId !== user?.uid && isFollowing && (
				<Box sx={{ position: 'absolute', right: 20 }}>
					<Box sx={{ display: displayButtonText }}>
						<Button
							text="Unfollow"
							onClick={() =>
								unFollowUser(user?.uid as string, userId as string)
							}
							backgroundColor="rgb(246, 50, 0)"
							textColor="white"
						/>
					</Box>
					<ButtonBase
						type="submit"
						onClick={() => unFollowUser(user?.uid as string, userId as string)}
						sx={{
							px: 2,
							py: 0.5,
							bgcolor: 'rgb(246, 50, 0)',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 2.5,
							display: displayButtonIcon,
						}}
					>
						<PersonRemove
							sx={{
								color: 'white',
							}}
						/>
					</ButtonBase>
				</Box>
			)}
			{userId === user?.uid && (
				<Box sx={{ position: 'absolute', right: 20 }}>
					<Box sx={{ display: displayButtonText }}>
						<Button text="Edit profile" onClick={() => navigate('/settings')} />
					</Box>
					<ButtonBase
						type="submit"
						onClick={() => navigate('/settings')}
						sx={{
							px: 2,
							py: 0.5,
							bgcolor: buttonBackgroundColor,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 2.5,
							display: displayButtonIcon,
						}}
					>
						<Settings
							sx={{
								color: reverseTextAndIconColor,
							}}
						/>
					</ButtonBase>
				</Box>
			)}
			{userdata?.profileImageUrl && (
				<img
					style={{
						width: 150,
						height: 150,
						borderRadius: 100,
						boxShadow: `0 0 10px 2px ${textAndIconColor}`,
						objectFit: 'cover',
					}}
					src={userdata?.profileImageUrl as string}
				/>
			)}
			{!userdata?.profileImageUrl && (
				<AccountCircle
					fontSize="large"
					sx={{
						width: 150,
						height: 150,
						borderRadius: 100,
						color: 'gray',
					}}
				/>
			)}
			<Typography variant="h4" sx={{ color: textAndIconColor }}>
				{userdata?.username as string}
			</Typography>
			<Typography variant="subtitle2" sx={{ color: textAndIconColor }}>
				{userdata?.bio as string}
			</Typography>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					height: 55,
					justifyContent: 'space-around',
					alignItems: 'center',
					borderTop: `1px solid ${borderColor}`,
					borderBottom: `1px solid ${borderColor}`,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						width: 5,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography
						variant="subtitle1"
						sx={{ color: textAndIconColor, marginBottom: -1 }}
					>
						{userdata?.postCount}
					</Typography>
					<Typography variant="subtitle1" sx={{ color: 'grey' }}>
						post
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						width: 5,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography
						variant="subtitle1"
						sx={{ color: textAndIconColor, marginBottom: -1 }}
					>
						{userdata?.followersCount}
					</Typography>
					<Typography variant="subtitle1" sx={{ color: 'grey' }}>
						followers
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						width: 5,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography
						variant="subtitle1"
						sx={{ color: textAndIconColor, marginBottom: -1 }}
					>
						{userdata?.followingCount}
					</Typography>
					<Typography variant="subtitle1" sx={{ color: 'grey' }}>
						following
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
