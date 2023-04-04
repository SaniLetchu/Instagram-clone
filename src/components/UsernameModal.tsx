import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useUser from '../hooks/useUser';
import UsernameForm from './UsernameForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 250,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2,
};

export default function UsernameModal() {
	const { isNewAccount } = useUser();

	return (
		<Modal
			open={isNewAccount}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			disableScrollLock={true}
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					textAlign={'center'}
					variant="h5"
					component="h2"
				>
					Welcome to instagram!
				</Typography>
				<Typography
					id="modal-modal-title"
					textAlign={'center'}
					variant="subtitle1"
					component="h2"
				>
					Please choose your username
				</Typography>

				<UsernameForm />
			</Box>
		</Modal>
	);
}
