import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import {
	Drawer,
	List,
	Typography,
	Divider,
	TextField,
	IconButton,
	Box,
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import useTheme from '../../../hooks/useTheme';
import useDashboard from '../../../hooks/useDashboard';
import { UserWithId } from '../../../types/firestore';
import SearchResult from '../../SearchResult';
import { searchForUser } from '../../../services/firestore';

const drawerDisplay = {
	xs: 'none',
	sm: 'block',
	md: 'block',
	lg: 'block',
	xl: 'block',
};

export default function SearchDrawer() {
	const { openSearchDrawer, setOpenSearchDrawer } = useDashboard();
	const [observerValue, setObserverValue] = useState<ResizeObserver>();
	const [searchValue, setSearchValue] = useState('');
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const [users, setUsers] = useState<UserWithId[]>([]);
	const {
		theme,
		backgroundColor,
		textAndIconColor,
		borderColor,
		textInputBackgroundColor,
	} = useTheme();
	const drawerRef = useRef(null);
	const boxShadow =
		theme === 'dark'
			? '1px 0px 1px rgba(250, 250, 250, 0.2)'
			: '1px 0px 1px rgba(0, 0, 0, 0.2)';

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		clearTimeout(timeoutRef?.current);
		timeoutRef.current = setTimeout(async () => {
			setUsers([]);
			if (event.target.value !== '') {
				const userValues = await searchForUser(event.target.value);
				setUsers(userValues);
			}
		}, 500);
	};

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				if (width === 0 || height === 0) {
					setSearchValue('');
					setUsers([]);
					setOpenSearchDrawer(false);
				}
			}
		});
		setObserverValue(resizeObserver);

		setTimeout(() => {
			if (drawerRef.current) {
				observerValue?.observe(drawerRef.current);
			}
		}, 500);

		return () => {
			observerValue?.disconnect();
		};
	}, [drawerRef, openSearchDrawer]);

	useEffect(() => {
		if (!openSearchDrawer) {
			setSearchValue('');
		}
	}, [openSearchDrawer]);

	return (
		<Drawer
			ref={drawerRef}
			sx={{
				width: 245,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 245,
					boxSizing: 'border-box',
					border: 'none',
					boxShadow: boxShadow,
				},
				display: drawerDisplay,
			}}
			anchor={'left'}
			open={openSearchDrawer}
			onClose={() => {
				setSearchValue('');
				setUsers([]);
				setOpenSearchDrawer(false);
			}}
		>
			<List
				sx={{
					bgcolor: backgroundColor,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					flexGrow: 1,
				}}
			>
				<Typography
					variant="h6"
					sx={{ textAlign: 'center', color: textAndIconColor, px: 3, py: 1 }}
				>
					<strong>Search</strong>
				</Typography>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ width: '100%' }}
				>
					<TextField
						value={searchValue}
						onChange={handleChange}
						variant="standard"
						placeholder="Search"
						size="small"
						sx={{
							borderRadius: 2,
							mx: 2,
							my: 3,
							paddingLeft: 2,
							bgcolor: textInputBackgroundColor,
							input: {
								color: textAndIconColor,
								'&::placeholder': {
									color: 'rgb(142, 142, 142)',
								},
							},
						}}
						InputProps={{
							endAdornment: (
								<IconButton
									onClick={() => {
										setSearchValue('');
										setUsers([]);
									}}
									sx={{ pl: 2, color: 'rgb(142, 142, 142)' }}
								>
									<Cancel fontSize="small" />
								</IconButton>
							),
							disableUnderline: true,
						}}
					/>
				</Box>
				<Divider sx={{ width: '100%', backgroundColor: borderColor }} />
				{users.map((user) => (
					<SearchResult key={user.id} userId={user.id} />
				))}
				{users.length == 0 && (
					<Box
						sx={{
							display: 'flex',
							height: '100%',
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography
							variant="caption"
							sx={{
								textAlign: 'center',
								color: 'gray',
							}}
						>
							<strong>No search results.</strong>
						</Typography>
					</Box>
				)}
			</List>
		</Drawer>
	);
}
