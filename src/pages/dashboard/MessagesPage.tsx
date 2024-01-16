import React, { useEffect, useState, ChangeEvent } from 'react';
import {
	Container,
	Box,
	Typography,
	List,
	ButtonBase,
	TextField,
} from '@mui/material';
import { Message, AccountCircle, ChatBubbleOutline } from '@mui/icons-material';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useDashboard from '../../hooks/useDashboard';
import {
	findFollowers,
	findFollowings,
	createMessage,
} from '../../services/firestore';
import MessagesInfiniteScroll from '../../components/infinitescrolls/Messages/MessagesInfiniteScroll';
import { Following, Follower } from '../../types/firestore';

const drawerWidth = { xs: '15vw', sm: 115, md: 395, lg: 395, xl: 395 };
const imageSize = { xs: 30, sm: 60, md: 60, lg: 60, xl: 60 };
const logoDisplay = {
	xs: 'block',
	sm: 'block',
	md: 'none',
	lg: 'none',
	xl: 'none',
};
const titleDisplay = {
	xs: 'none',
	sm: 'none',
	md: 'block',
	lg: 'block',
	xl: 'block',
};

const chatSelectFlex = {
	xs: 'center',
	sm: 'center',
	md: 'flex-start',
	lg: 'flex-start',
	xl: 'flex-start',
};

const chatSelectTextDisplay = {
	xs: 'none',
	sm: 'none',
	md: 'flex',
	lg: 'flex',
	xl: 'flex',
};

export default function MessagesPage() {
	const { backgroundColor, theme, textAndIconColor, borderColor } = useTheme();
	const { user } = useAuth();
	const { listenUserDocument, usersData, topNavbarHeight, bottomNavbarHeight } =
		useDashboard();
	const [searchValue, setSearchValue] = useState('');
	const boxShadow =
		theme === 'dark'
			? '1px 0px 1px rgba(250, 250, 250, 0.2)'
			: '1px 0px 1px rgba(0, 0, 0, 0.2)';

	const boxShadow1 =
		theme === 'dark'
			? '0px 1px 1px rgba(250, 250, 250, 0.2)'
			: '0px 1px 1px rgba(0, 0, 0, 0.2)';

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const height = `calc(100dvh - ${bottomNavbarHeight}px - ${topNavbarHeight}px)`;

	const [followers, setFollowers] = useState<Follower[]>([]);
	const [following, setFollowing] = useState<Following[]>([]);

	const [selectedChat, setSelectedChat] = useState('');

	useEffect(() => {
		const userIds = [
			...followers.map((follower) => follower.followerUserId),
			...following.map((follow) => follow.followingUserId),
		];
		if (userIds.length != 0) {
			userIds.push(followers[0].userId);
		}

		userIds.forEach((userId) => {
			if (!(userId in usersData)) {
				listenUserDocument(userId);
			}
		});
	}, [followers, following]);

	useEffect(() => {
		async function fetchData() {
			try {
				const followersData = await findFollowers(user?.uid as string);
				const followingData = await findFollowings(user?.uid as string);

				setFollowers(followersData);
				setFollowing(followingData);
			} catch (error) {
				console.error('Error fetching followers and followings:', error);
			}
		}

		fetchData();
	}, []);

	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				display: 'flex',
				height: height,
				bgcolor: backgroundColor,
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					width: drawerWidth,
					boxSizing: 'border-box',
					height: height,
					boxShadow: boxShadow,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Box sx={{ my: 2, height: 40 }}>
					<Message
						fontSize="large"
						sx={{ color: textAndIconColor, display: logoDisplay }}
					/>
					<Typography
						variant="h6"
						sx={{ color: textAndIconColor, display: titleDisplay }}
					>
						<strong>Messages</strong>
					</Typography>
				</Box>
				<List
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
					}}
				>
					{followers.map((follower) => {
						const matchingFollowing = following.find(
							(item) => item.followingUserId === follower.followerUserId
						);

						if (matchingFollowing) {
							return (
								<ButtonBase
									type="submit"
									key={follower.followerUserId}
									onClick={() => setSelectedChat(follower.followerUserId)}
									sx={{
										height: '100%',
										display: 'flex',
										py: 1,
										justifyContent: chatSelectFlex,
										'&:hover': {
											backgroundColor:
												selectedChat == follower.followerUserId
													? 'rgba(169, 169, 169, 0.2)'
													: 'rgba(169, 169, 169, 0.1)',
										},
										backgroundColor:
											selectedChat == follower.followerUserId
												? 'rgba(169, 169, 169, 0.2)'
												: 'inherit',
									}}
								>
									<Box
										key={follower.followerUserId}
										sx={{
											display: 'flex',
											px: 3.3,
											justifyContent: chatSelectFlex,
										}}
									>
										{usersData[follower.followerUserId] && (
											<>
												{!usersData[follower.followerUserId]
													.profileImageUrl && (
													<AccountCircle
														sx={{ fontSize: imageSize, color: 'gray' }}
													/>
												)}
												{usersData[follower.followerUserId].profileImageUrl && (
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
												)}
											</>
										)}
										<Box
											sx={{
												display: chatSelectTextDisplay,
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												px: 1.5,
											}}
										>
											{usersData[follower.followerUserId] && (
												<Typography
													variant="subtitle1"
													sx={{
														color: textAndIconColor,
														display: titleDisplay,
													}}
												>
													{usersData[follower.followerUserId].username}
												</Typography>
											)}
											{usersData[follower.followerUserId] && (
												<Typography
													variant="caption"
													sx={{
														color: 'gray',
														display: titleDisplay,
													}}
												>
													asdasd
												</Typography>
											)}
										</Box>
									</Box>
								</ButtonBase>
							);
						}
						return null;
					})}
				</List>
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					boxSizing: 'border-box',
					height: height,
					boxShadow: boxShadow,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{selectedChat != '' && (
					<>
						<Box
							sx={{
								display: 'flex',
								px: 2,
								height: 75,
								gap: 1,
								alignItems: 'center',
								boxShadow: boxShadow1,
							}}
						>
							{usersData[selectedChat] && (
								<>
									{!usersData[selectedChat].profileImageUrl && (
										<AccountCircle sx={{ fontSize: 50, color: 'gray' }} />
									)}
									{usersData[selectedChat].profileImageUrl && (
										<img
											style={{
												height: 50,
												width: 50,
												objectFit: 'cover',
												borderRadius: '50%',
												border: 'solid 1px',
												borderColor: borderColor,
											}}
											src={usersData[selectedChat].profileImageUrl as string}
										/>
									)}
								</>
							)}
							<Typography variant="overline" sx={{ color: textAndIconColor }}>
								<strong>{usersData[selectedChat].username}</strong>
							</Typography>
						</Box>
						<MessagesInfiniteScroll
							userId={user?.uid as string}
							secondUserId={selectedChat}
						/>
						<Box
							sx={{
								height: 75,
								py: 0.5,
								px: 2,
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Box
								sx={{
									border:
										theme == 'dark'
											? '1px solid rgba(250, 250, 250, 0.2)'
											: '1px solid rgba(0, 0, 0, 0.2)',
									padding: 0.75,
									px: 3,
									width: '100%',
									borderRadius: 50,
									boxSizing: 'border-box',
								}}
							>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										createMessage(
											user?.uid as string,
											selectedChat,
											searchValue
										);
										setSearchValue('');
									}}
								>
									<TextField
										value={searchValue}
										autoComplete="off"
										onChange={handleChange}
										fullWidth
										variant="standard"
										placeholder="Message..."
										sx={{
											borderRadius: 2,
											bgcolor: backgroundColor,
											input: {
												color: textAndIconColor,
												'&::placeholder': {
													color:
														theme == 'dark'
															? 'rgb(300, 300, 300)'
															: 'rgb(0, 0, 0)',
												},
											},
										}}
										InputProps={{
											disableUnderline: true,
										}}
									/>
								</form>
							</Box>
						</Box>
					</>
				)}
				{selectedChat == '' && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							height: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: boxShadow1,
						}}
					>
						<ChatBubbleOutline sx={{ color: textAndIconColor, fontSize: 90 }} />
						<Typography variant="subtitle1" sx={{ color: textAndIconColor }}>
							Own messages
						</Typography>
						<Typography variant="caption" sx={{ color: 'gray' }}>
							Send private messages to friends.
						</Typography>
					</Box>
				)}
			</Box>
		</Container>
	);
}
