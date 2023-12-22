import React, { useState, useEffect } from 'react';
import { PostWithId } from '../../../types/firestore';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';
import { Box, IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { firestore } from '../../../configs/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { toggleLike } from '../../../services/firestore';

interface PostIconRowProps {
	post: PostWithId;
}

export default function PostIconRoW({ post }: PostIconRowProps) {
	const { user } = useAuth();
	const [liked, setLiked] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const { textAndIconColor, iconHoverBackgroundColor } = useTheme();

	useEffect(() => {
		if (user) {
			const likeRef = doc(firestore, 'likes', `${user.uid}_${post.id}`);
			const unsubscribe = onSnapshot(likeRef, (snapshot) => {
				setLiked(snapshot.exists());
			});

			return () => unsubscribe();
		}
	}, []);

	const handleLikeToggle = () => {
		if (user && !isButtonDisabled) {
			toggleLike(post.id, user.uid);
			setIsButtonDisabled(true);
		}
	};

	useEffect(() => {
		if (isButtonDisabled) {
			const timer = setTimeout(() => {
				setIsButtonDisabled(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [isButtonDisabled]);

	return (
		<Box
			sx={{
				display: 'flex',
				px: 0.5,
			}}
		>
			<IconButton
				onClick={handleLikeToggle}
				sx={{
					'&:hover': {
						backgroundColor: iconHoverBackgroundColor,
					},
				}}
			>
				{liked ? (
					<Favorite
						sx={{
							color: '#e31b23',
							'&:hover': {
								transform: 'scale(1.1)',
							},
						}}
						fontSize="medium"
					/>
				) : (
					<FavoriteBorder
						sx={{
							color: textAndIconColor,
							'&:hover': {
								transform: 'scale(1.1)',
							},
						}}
						fontSize="medium"
					/>
				)}
			</IconButton>
		</Box>
	);
}
