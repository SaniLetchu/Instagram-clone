import React, { useEffect } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { AccountCircle } from '@mui/icons-material';
import { MessageWithId } from '../../../types/firestore';
import useDashboard from '../../../hooks/useDashboard';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface MessageProps {
	message: MessageWithId;
}

type TimeInput = Date | Timestamp;

function timeSince(timestamp: TimeInput): string {
	const now = new Date();
	const date = timestamp instanceof Date ? timestamp : timestamp.toDate();

	const isToday =
		now.getDate() === date.getDate() &&
		now.getMonth() === date.getMonth() &&
		now.getFullYear() === date.getFullYear();

	if (isToday) {
		// Format time if the timestamp is from today
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	} else {
		// Format date if the timestamp is not from today
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	}
}

export default function Message({ message }: MessageProps) {
	const { listenUserDocument, usersData, setOpenCommentsDrawer, setPostId } =
		useDashboard();
	const { borderColor, textAndIconColor, theme } = useTheme();
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (!(message.senderId in usersData)) {
			listenUserDocument(message.senderId);
		}
	}, []);

	return (
		<Box
			sx={{
				my: 1,
				display: 'flex',
				justifyContent: user?.uid == message.senderId ? 'end' : 'start',
				px: 2,
			}}
		>
			{usersData[message.senderId] && (
				<>
					{!usersData[message.senderId].profileImageUrl && (
						<ButtonBase
							sx={{
								alignSelf: 'end',
								maxHeight: 'max-content',
								marginRight: 1,
								display: user?.uid == message.senderId ? 'none' : 'block',
							}}
							onClick={() => {
								navigate(`/profile/${message.senderId}`);
								setOpenCommentsDrawer(false);
								setPostId('');
							}}
						>
							<AccountCircle sx={{ fontSize: 38, color: 'gray' }} />
						</ButtonBase>
					)}
					{usersData[message.senderId].profileImageUrl && (
						<ButtonBase
							sx={{
								marginRight: 1,
								alignSelf: 'end',
								maxHeight: 'max-content',
								display: user?.uid == message.senderId ? 'none' : 'block',
							}}
							onClick={() => {
								navigate(`/profile/${message.senderId}`);
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
								src={usersData[message.senderId].profileImageUrl as string}
							/>
						</ButtonBase>
					)}
				</>
			)}
			<Box
				sx={{
					display: 'flex',
					maxWidth: '40%',
					padding: 1.25,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
					borderBottomLeftRadius: user?.uid == message.senderId ? 10 : 1,
					borderBottomRightRadius: user?.uid == message.senderId ? 1 : 10,
					height: 'max-content',
					backgroundColor:
						user?.uid == message.senderId
							? 'rgb(0, 149, 246)'
							: theme == 'dark'
							? 'rgb(38, 38, 38)'
							: 'rgb(238, 238, 238)',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						height: 'max-content',
					}}
				>
					<Typography
						sx={{
							color: user?.uid == message.senderId ? 'white' : textAndIconColor,
						}}
						variant="body2"
					>
						{message.text}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: 0.75,
						justifyContent: 'end',
						alignItems: 'end',
					}}
				>
					<Typography
						style={{
							color:
								user?.uid == message.senderId
									? 'rgb(222, 222, 222)'
									: 'rgb(142, 142, 142)',
							fontSize: 10,
						}}
						variant="caption"
					>
						{timeSince(message.timestamp)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
