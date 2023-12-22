import React from 'react';
import { Container } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import PostsInfiniteScroll from '../../components/infinitescrolls/Posts/PostsInfiniteScroll';

export default function HomePage() {
	const { backgroundColor } = useTheme();
	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				display: 'flex',
				bgcolor: backgroundColor,
				justifyContent: 'center',
			}}
		>
			<PostsInfiniteScroll />
		</Container>
	);
}
