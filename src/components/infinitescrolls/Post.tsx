import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { PostWithId } from '../../types/firestore';
import useTheme from '../../hooks/useTheme';
import PostIconRoW from './PostIconRow';
import { Box, Typography, Divider } from '@mui/material';

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
	return (
		<Box
			sx={{
				width: 500,
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
				'@media (max-width: 500px)': {
					width: '100%',
				},
				my: 5,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'end', gap: 1, px: 0.5 }}>
				<Typography sx={{ color: textAndIconColor }}>
					{post.username}
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
				{post.likesCount} likes
			</Typography>
			<Divider
				sx={{ backgroundColor: borderColor, width: '100%', marginTop: 2 }}
			/>
		</Box>
	);
}
