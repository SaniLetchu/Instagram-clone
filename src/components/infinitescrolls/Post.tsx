import React, { useState, ChangeEvent } from 'react';
import { Timestamp } from 'firebase/firestore';
import { PostWithId } from '../../types/firestore';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import PostIconRoW from './PostIconRow';
import { Send } from '@mui/icons-material';
import { createComment } from '../../services/firestore';
import { Box, Typography, Divider, IconButton, TextField } from '@mui/material';

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
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) {
		return `${years}y`;
	} else if (months > 0) {
		return `${months}m`;
	} else if (days > 0) {
		return `${days}d`;
	} else if (hours > 0) {
		return `${hours}h`;
	} else if (minutes > 0) {
		return `${minutes}m`;
	} else {
		return `${seconds}s`;
	}
}

export default function Post({ post }: PostProps) {
	const { textAndIconColor, borderColor } = useTheme();
	const { user } = useAuth();
	const { userData } = useUser();
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
			<Box sx={{ display: 'flex', alignItems: 'end', gap: 1, px: 0.5 }}>
				<Typography sx={{ color: textAndIconColor }}>
					<strong>{post.username}</strong>
				</Typography>
				<Typography sx={{ color: 'rgb(142, 142, 142)' }} variant="caption">
					•
				</Typography>
				<Typography sx={{ color: 'rgb(142, 142, 142)' }} variant="caption">
					{post.timestamp && timeSince(post?.timestamp)}
				</Typography>
			</Box>
			<img
				style={{
					objectFit: 'contain',
					width: 'calc(100% - 2px)',
					maxHeight: 650,
					borderRadius: 5,
					border: `solid 1px ${borderColor}`,
				}}
				src={post.imageUrl}
			/>
			<PostIconRoW post={post} />
			<Typography sx={{ color: textAndIconColor, px: 0.5 }}>
				<strong>{post.likesCount} likes</strong>
			</Typography>
			<Typography sx={{ color: textAndIconColor, px: 0.5 }}>
				<strong>{post.username}</strong> {post.caption}
			</Typography>
			<Typography sx={{ color: 'rgb(142, 142, 142)', px: 0.5 }}>
				View all {post.commentsCount} comments
			</Typography>
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
