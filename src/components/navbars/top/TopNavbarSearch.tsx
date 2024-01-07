import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTheme from '../../../hooks/useTheme';
import SearchPopover from './SearchPopover';
import { searchForUser } from '../../../services/firestore';
import { UserWithId } from '../../../types/firestore';

const boxSize = {
	xs: 210,
	sm: 0,
	md: 0,
	lg: 0,
	xl: 0,
};

export default function TopNavbarSearch() {
	const [searchValue, setSearchValue] = useState('');
	const openPopover = searchValue.trim() !== '' ? true : false;
	const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
	const [observerValue, setObserverValue] = useState<ResizeObserver>();
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const drawerRef = useRef(null);
	const [users, setUsers] = useState<UserWithId[]>([]);
	const { textAndIconColor, textInputBackgroundColor } = useTheme();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		setAnchorEl(drawerRef.current);
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
	}, [drawerRef]);

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			ref={drawerRef}
			sx={{ width: boxSize }}
		>
			<TextField
				value={searchValue}
				onChange={handleChange}
				fullWidth
				variant="standard"
				placeholder="Search"
				sx={{
					borderRadius: 2,
					bgcolor: textInputBackgroundColor,
					input: {
						color: textAndIconColor,
						'&::placeholder': {
							color: 'rgb(142, 142, 142)',
						},
					},
				}}
				InputProps={{
					startAdornment: (
						<IconButton
							type="submit"
							sx={{ pl: 2, color: 'rgb(142, 142, 142)' }}
						>
							<SearchIcon fontSize="small" />
						</IconButton>
					),
					disableUnderline: true,
				}}
			/>
			<SearchPopover
				anchorEl={anchorEl}
				openPopover={openPopover}
				users={users}
				setUsers={setUsers}
				setSearchValue={setSearchValue}
			/>
		</Box>
	);
}
