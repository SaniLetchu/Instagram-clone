import React, { useEffect } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import useDashboard from '../hooks/useDashboard';
import useTheme from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

interface SearchResultProps {
	userId: string;
}

export default function SearchResult({ userId }: SearchResultProps) {
	const { listenUserDocument, usersData, setOpenSearchDrawer } = useDashboard();
	const { borderColor, textAndIconColor, iconHoverBackgroundColor } =
		useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		if (!(userId in usersData)) {
			listenUserDocument(userId);
		}
	}, []);

	return (
		<ButtonBase
			sx={{
				width: '100%',
				'&:hover': {
					backgroundColor: iconHoverBackgroundColor,
				},
			}}
			onClick={() => {
				navigate(`/profile/${userId}`);
				setOpenSearchDrawer(false);
			}}
		>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					height: 45,
					gap: 2,
					px: 2,
					py: 1,
				}}
			>
				{usersData[userId] && (
					<>
						{!usersData[userId].profileImageUrl && (
							<AccountCircle sx={{ fontSize: 38, color: 'gray' }} />
						)}
						{usersData[userId].profileImageUrl && (
							<img
								style={{
									height: 38,
									width: 38,
									objectFit: 'cover',
									borderRadius: '50%',
									border: 'solid 1px',
									borderColor: borderColor,
								}}
								src={usersData[userId].profileImageUrl as string}
							/>
						)}
					</>
				)}
				{usersData[userId] && (
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
							<Typography
								sx={{
									color: textAndIconColor,
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
							>
								<strong>{usersData[userId].username}</strong>{' '}
							</Typography>
						</Box>
						<Box>
							<Typography
								sx={{
									color: textAndIconColor,
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
								variant="caption"
							>
								{usersData[userId].bio}
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</ButtonBase>
	);
}
