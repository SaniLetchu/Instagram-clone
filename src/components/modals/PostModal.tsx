import React from 'react';
import { Box, Typography, Modal, Divider } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import useDashboard from '../../hooks/useDashboard';

const flexDirection = {
	xs: 'column',
	sm: 'column',
	md: 'row',
	lg: 'row',
	xl: 'row',
};

const mainContainerTopMargin = {
	xs: 7,
	sm: 0,
	md: 0,
	lg: 0,
	xl: 0,
};

export default function PostModal() {
	const { backgroundColor, textAndIconColor, borderColor } = useTheme();
	const { openPostModal, setOpenPostModal, postId } = useDashboard();
	const handleClose = () => setOpenPostModal(false);

	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		alignItems: 'center',
		maxHeight: '93%',
		width: '80%',
		maxWidth: 920,
		bgcolor: 'grey',
		borderRadius: 2,
		boxShadow: 24,
		py: 1,
	};

	return (
		<div>
			<Modal
				open={openPostModal}
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
				</Box>
			</Modal>
		</div>
	);
}
