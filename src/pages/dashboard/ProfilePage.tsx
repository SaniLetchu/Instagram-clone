import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import useUser from '../../hooks/useUser';

export default function ProfilePage() {
	const { theme } = useTheme();
	const { userData } = useUser();
	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	const textAndIconColor = theme === 'dark' ? 'white' : 'black';
	const borderColor =
		theme === 'dark' ? 'rgba(250, 250, 250, 0.2)' : 'rgba(0, 0, 0, 0.2)';
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
			<img
				style={{
					width: 150,
					height: 150,
					borderRadius: 100,
					boxShadow: `0 0 10px 2px ${textAndIconColor}`,
				}}
				src={userData?.profileImageUrl as string}
			/>
			<Typography variant="h4" sx={{ color: textAndIconColor }}>
				{userData?.username as string}
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
						{userData?.postCount}
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
						{userData?.followersCount}
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
						{userData?.followingCount}
					</Typography>
					<Typography variant="subtitle1" sx={{ color: 'grey' }}>
						following
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
