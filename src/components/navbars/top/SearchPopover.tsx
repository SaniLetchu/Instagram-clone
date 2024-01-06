import React from 'react';
import { List, Typography, Box, Popover } from '@mui/material';
import useTheme from '../../../hooks/useTheme';
import SearchResult from '../../SearchResult';
import { UserWithId } from '../../../types/firestore';

const drawerDisplay = {
	xs: 'block',
	sm: 'none',
	md: 'none',
	lg: 'none',
	xl: 'noe',
};

interface SearchPopoverProps {
	anchorEl: HTMLInputElement | null;
	openPopover: boolean;
	users: UserWithId[];
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setUsers: React.Dispatch<React.SetStateAction<UserWithId[]>>;
}

export default function SearchPopover({
	anchorEl,
	openPopover,
	users,
	setSearchValue,
	setUsers,
}: SearchPopoverProps) {
	const { theme, backgroundColor } = useTheme();
	const boxShadow =
		theme === 'dark'
			? '1px 0px 1px rgba(250, 250, 250, 0.2)'
			: '1px 0px 1px rgba(0, 0, 0, 0.2)';

	return (
		<Popover
			anchorEl={anchorEl}
			disablePortal
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
			open={openPopover}
			onClose={() => {
				setSearchValue('');
				setUsers([]);
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
		</Popover>
	);
}
