import React, { useState, ChangeEvent } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTheme from '../../../hooks/useTheme';

interface TopNavbarSearchProps {
	onSearch(searchValue: string): void;
}

export default function TopNavbarSearch({ onSearch }: TopNavbarSearchProps) {
	const [searchValue, setSearchValue] = useState('');
	const { theme } = useTheme();

	const backgroundColor =
		theme === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(239, 239, 239)';
	const textAndIconColor =
		theme === 'dark' ? 'rgb(142, 142, 142)' : 'rgb(142, 142, 142)';
	const textColor = theme === 'dark' ? 'white' : 'black';

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (searchValue) {
			onSearch(searchValue);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<TextField
				value={searchValue}
				onChange={handleChange}
				fullWidth
				variant="standard"
				placeholder="Search"
				size="small"
				sx={{
					mr: 1,
					borderRadius: 2,
					bgcolor: backgroundColor,
					input: {
						color: textColor,
						'&::placeholder': {
							color: textAndIconColor,
						},
					},
				}}
				InputProps={{
					startAdornment: (
						<IconButton type="submit" sx={{ pl: 2, color: textAndIconColor }}>
							<SearchIcon fontSize="small" />
						</IconButton>
					),
					disableUnderline: true,
				}}
			/>
		</Box>
	);
}
