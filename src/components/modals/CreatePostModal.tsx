import React from 'react';
import { Box, Typography, Modal, Divider } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import useDashboard from '../../hooks/useDashboard';
import CreatePostForm from '../forms/CreatePostForm';

export default function CreatePostModal() {
	const { secondaryBackgroundColor, textAndIconColor, borderColor } =
		useTheme();
	const { openCreatePostModal, setOpenCreatePostModal } = useDashboard();
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
		bgcolor: secondaryBackgroundColor,
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
