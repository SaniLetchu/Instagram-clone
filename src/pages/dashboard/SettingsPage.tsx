import React from 'react';
import { Container, Typography } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import SettingsForm from '../../components/forms/SettingsForm';

export default function SettingsPage() {
	const { textAndIconColor, backgroundColor } = useTheme();
	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				minHeight: '100dvh',
				display: 'flex',
				flexDirection: 'column',
				bgcolor: backgroundColor,
				alignItems: 'center',
				paddingTop: 5,
				gap: 2,
			}}
		>
			<Typography variant="h4" sx={{ color: textAndIconColor }}>
				Settings
			</Typography>
			<SettingsForm />
		</Container>
	);
}
