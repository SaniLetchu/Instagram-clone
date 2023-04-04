import React from 'react';
import { Box, Typography, Modal, Divider } from '@mui/material';
import useTheme from '../hooks/useTheme';
import useDashboard from '../hooks/useDashboard';
import CreatePostForm from './CreatePostForm';

export default function CreatePostModal() {
	const { theme } = useTheme();
	const { openCreatePostModal, setOpenCreatePostModal } = useDashboard();
	const backgroundColor = theme === 'dark' ? 'rgb(38, 38, 38)' : 'white';
	const textAndIconColor = theme === 'dark' ? 'white' : 'black';
	const borderColor =
		theme === 'dark' ? 'rgba(250, 250, 250, 0.2)' : 'rgba(0, 0, 0, 0.2)';
	const handleClose = () => setOpenCreatePostModal(false);

	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		alignItems: 'center',
		width: 300,
		bgcolor: backgroundColor,
		borderRadius: 2,
		boxShadow: 24,
		py: 1,
	};

	return (
		<div>
			<Modal
				open={openCreatePostModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				disableScrollLock={true}
			>
				<Box sx={style}>
					<Typography
						variant="subtitle1"
						sx={{ textAlign: 'center', color: textAndIconColor }}
					>
						Create new post
					</Typography>
					<Divider sx={{ width: '100%', color: borderColor, my: 1 }} />
					<CreatePostForm />
				</Box>
			</Modal>
		</div>
	);
}
