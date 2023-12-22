import React, { useEffect } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { AccountCircle } from '@mui/icons-material';
import { CommentWithId } from '../../../types/firestore';
import useDashboard from '../../../hooks/useDashboard';
import useTheme from '../../../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

interface CommentProps {
	comment: CommentWithId;
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

export default function Comment({ comment }: CommentProps) {
	const {
		listenUserDocument,
		profilePicUrls,
		setOpenCommentsDrawer,
		setPostId,
	} = useDashboard();
	const { borderColor, textAndIconColor } = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		if (!(comment.userId in profilePicUrls)) {
			listenUserDocument(comment.userId);
		}
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				height: 45,
				gap: 2,
				px: 2,
			}}
		>
			{!profilePicUrls[comment.userId] && (
				<ButtonBase
					onClick={() => {
						navigate(`/profile/${comment.userId}`);
						setOpenCommentsDrawer(false);
						setPostId('');
					}}
				>
					<AccountCircle sx={{ fontSize: 38, color: 'gray' }} />
				</ButtonBase>
			)}
			{profilePicUrls[comment.userId] && (
				<ButtonBase
					onClick={() => {
						navigate(`/profile/${comment.userId}`);
						setOpenCommentsDrawer(false);
						setPostId('');
					}}
				>
					<img
						style={{
							height: 38,
							width: 38,
							objectFit: 'cover',
							borderRadius: '50%',
							border: 'solid 1px',
							borderColor: borderColor,
						}}
						src={profilePicUrls[comment.userId] as string}
					/>
				</ButtonBase>
			)}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: 0.75,
						alignItems: 'end',
					}}
				>
					<ButtonBase
						onClick={() => {
							navigate(`/profile/${comment.userId}`);
							setOpenCommentsDrawer(false);
							setPostId('');
						}}
					>
						<Typography sx={{ color: textAndIconColor }}>
							<strong>{comment.username}</strong>{' '}
						</Typography>
					</ButtonBase>
					<Typography style={{ color: 'rgb(142, 142, 142)' }} variant="caption">
						{timeSince(comment.timestamp)}
					</Typography>
				</Box>
				<Box>
					<Typography sx={{ color: textAndIconColor }} variant="caption">
						{comment.text}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
