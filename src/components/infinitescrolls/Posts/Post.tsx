import React, { useState, ChangeEvent, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { PostWithId } from '../../../types/firestore';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import PostIconRoW from './PostIconRow';
import { Send } from '@mui/icons-material';
import { createComment } from '../../../services/firestore';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../../../hooks/useDashboard';
import { AccountCircle } from '@mui/icons-material';
import {
	Box,
	Typography,
	Divider,
	IconButton,
	TextField,
	ButtonBase,
} from '@mui/material';

interface PostProps {
	post: PostWithId;
}

function timeSince(timestamp: Timestamp): string {
	const now = new Date();
	const date = timestamp.toDate();

	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) {
		return `${years}y`;
	} else if (months > 0) {
		return `${months}mo`;
	} else if (weeks > 0) {
		return `${weeks}w`;
	} else if (days > 0) {
		return `${days}d`;
	} else if (hours > 0) {
		return `${hours}h`;
	} else if (minutes > 0) {
		return `${minutes}min`;
	} else {
		return `${seconds}s`;
	}
}

export default function Post({ post }: PostProps) {
	const { textAndIconColor, borderColor } = useTheme();
	const { setOpenCommentsDrawer, setPostId, listenUserDocument, usersData } =
		useDashboard();
	const { user } = useAuth();
	const { userData } = useUser();
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};
	const handleSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (searchValue) {
			const success = await createComment(
				post.id,
				user?.uid as string,
				userData?.username as string,
				searchValue
			);
			if (success) {
				setSearchValue('');
			}
		}
	};

	useEffect(() => {
		if (!(post.userId in usersData)) {
			listenUserDocument(post.userId);
		}
	}, []);

	return (
		<Box
			sx={{
				width: 500,
				display: 'flex',
				flexDirection: 'column',
				gap: 0.5,
				'@media (max-width: 500px)': {
					width: '100%',
				},
				my: 5,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					paddingLeft: 0.5,
				}}
			>
				{usersData[post.userId] && (
					<>
						{!usersData[post.userId].profileImageUrl && (
							<ButtonBase onClick={() => navigate(`/profile/${post.userId}`)}>
								<AccountCircle sx={{ fontSize: 25, color: 'gray' }} />
							</ButtonBase>
						)}
						{usersData[post.userId].profileImageUrl && (
							<ButtonBase onClick={() => navigate(`/profile/${post.userId}`)}>
								<img
									style={{
										height: 25,
										width: 25,
										objectFit: 'cover',
										borderRadius: '50%',
										border: 'solid 1px',
										borderColor: borderColor,
									}}
									src={usersData[post.userId].profileImageUrl as string}
								/>
							</ButtonBase>
						)}
					</>
				)}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'end',
						gap: 1,
						px: 0.5,
					}}
				>
					<ButtonBase onClick={() => navigate(`/profile/${post.userId}`)}>
						<Typography sx={{ color: textAndIconColor }}>
							<strong>{post.username}</strong>
						</Typography>
					</ButtonBase>
					<Typography sx={{ color: 'rgb(142, 142, 142)' }} variant="caption">
						•
					</Typography>
					<Typography sx={{ color: 'rgb(142, 142, 142)' }} variant="caption">
						{post.timestamp && timeSince(post?.timestamp)}
					</Typography>
				</Box>
			</Box>
			<img
				style={{
					objectFit: 'contain',
					width: 'calc(100% - 2px)',
					maxHeight: 800,
					borderRadius: 5,
					border: `solid 1px ${borderColor}`,
				}}
				src={post.imageUrl}
			/>
			<PostIconRoW post={post} />
			<Typography sx={{ color: textAndIconColor, px: 0.5 }}>
				<strong>{post.likesCount} likes</strong>
			</Typography>
			<Typography
				sx={{ color: textAndIconColor, px: 0.5, display: 'flex', gap: 1 }}
			>
				<ButtonBase onClick={() => navigate(`/profile/${post.userId}`)}>
					<Typography sx={{ color: textAndIconColor }}>
						<strong>{post.username}</strong>
					</Typography>
				</ButtonBase>
				{post.caption}
			</Typography>
			<ButtonBase
				sx={{ alignSelf: 'start', px: 0.5 }}
				onClick={() => {
					setPostId(post.id);
					setOpenCommentsDrawer(true);
				}}
			>
				<Typography sx={{ color: 'rgb(142, 142, 142)' }}>
					View all {post.commentsCount} comments
				</Typography>
			</ButtonBase>
			<Box
				component="form"
				onSubmit={handleSubmit}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<TextField
					value={searchValue}
					onChange={handleChange}
					fullWidth
					variant="standard"
					placeholder="Add a comment..."
					size="small"
					sx={{
						mx: 0.5,
						input: {
							color: textAndIconColor,
							'&::placeholder': {
								color: 'rgb(142, 142, 142)',
							},
						},
					}}
					InputProps={{
						endAdornment: (
							<IconButton type="submit" sx={{ color: 'rgb(142, 142, 142)' }}>
								<Send fontSize="small" />
							</IconButton>
						),
						disableUnderline: true,
					}}
				/>
			</Box>
			<Divider
				sx={{ backgroundColor: borderColor, width: '100%', marginTop: 2 }}
			/>
		</Box>
	);
}
