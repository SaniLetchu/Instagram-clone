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
	xl: 'none',
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
	const { theme } = useTheme();
	const boxShadow =
		theme === 'dark'
			? '1px 0px 1px rgba(250, 250, 250, 0.2)'
			: '1px 0px 1px rgba(0, 0, 0, 0.2)';

	const backgroundColor =
		theme === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(239, 239, 239)';

	return (
		<Popover
			anchorEl={anchorEl}
			disableAutoFocus
			disableEnforceFocus
			disablePortal
			disableScrollLock
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			PaperProps={{
				style: {
					minWidth: 'inherit',
				},
			}}
			sx={{
				flexShrink: 0,
				minWidth: 'inherit',
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					minWidth: 'inherit',
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
					minWidth: 210,
					maxWidth: 210,
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
