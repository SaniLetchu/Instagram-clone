import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useUser from '../../hooks/useUser';
import UsernameForm from '../forms/UsernameForm';
import useTheme from '../../hooks/useTheme';

export default function UsernameModal() {
	const { isNewAccount } = useUser();
	const { secondaryBackgroundColor, textAndIconColor, borderColor } =
		useTheme();

	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		alignItems: 'center',
		width: 300,
		bgcolor: secondaryBackgroundColor,
		borderRadius: 2,
		boxShadow: 24,
		py: 1,
		outline: 'none',
	};

	return (
		<Modal
			open={isNewAccount}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			disableScrollLock={true}
		>
			<Box sx={style}>
				<Typography
					variant="h6"
					sx={{ textAlign: 'center', color: textAndIconColor }}
				>
					Welcome to instagram
				</Typography>
				<Divider sx={{ width: '100%', color: borderColor, my: 1 }} />
				<Typography
					variant="overline"
					sx={{ textAlign: 'center', color: textAndIconColor }}
				>
					Please choose your username
				</Typography>
				<UsernameForm />
			</Box>
		</Modal>
	);
}
