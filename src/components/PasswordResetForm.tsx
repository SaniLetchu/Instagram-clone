import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
	Button,
	TextField,
	Grid,
	Typography,
	Box,
	ButtonBase,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import * as Yup from 'yup';

const initialValues = {
	email: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function PasswordResetForm() {
	const { resetPassword } = useAuth();
	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values, actions) => {
					actions.setSubmitting(true);
					try {
						await resetPassword(values.email);
					} catch (error) {
						if (error instanceof Error) {
							actions.setStatus({ message: error.message });
						}
					}
					actions.setSubmitting(false);
				}}
				validationSchema={validationSchema}
			>
				{({ isSubmitting, errors, touched, status }) => (
					<Form>
						<Grid container direction="column" spacing={1}>
							<Grid item display={'flex'} justifyContent={'center'}>
								<span
									style={{
										backgroundImage:
											'url(https://static.cdninstagram.com/rsrc.php/v3/yV/r/6JqvJ6H_bFT.png)',
										height: '96px',
										width: '96px',
										backgroundSize: '440px 411px',
										backgroundPosition: '-129px 0',
									}}
								></span>
							</Grid>
							<Grid item display={'flex'} justifyContent={'center'}>
								<Typography>
									<strong>Trouble logging in?</strong>
								</Typography>
							</Grid>
							<Grid
								item
								display={'flex'}
								justifyContent={'center'}
								textAlign={'center'}
							>
								<Typography variant="caption">
									Enter your email and we'll send you a link to get back into
									your account.
								</Typography>
							</Grid>
							<Grid item>
								<Field
									style={{
										backgroundColor: 'rgb(250, 250, 250)',
										border: '1px solid rgb(219, 219, 219)',
										borderRadius: 4,
									}}
									size="small"
									InputProps={{
										disableUnderline: true,
									}}
									name="email"
									as={TextField}
									label="Email"
									variant="filled"
									fullWidth
								/>
								{errors.email && touched.email && (
									<Typography
										sx={{ color: 'red', textAlign: 'center', fontSize: 12 }}
									>
										<ErrorMessage name="email" />
									</Typography>
								)}
							</Grid>
							<Grid item my={1}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
									disabled={isSubmitting}
								>
									Send login link
								</Button>
								{status && status.message && (
									<Typography
										sx={{ color: 'red', textAlign: 'center', fontSize: 12 }}
									>
										{status.message}
									</Typography>
								)}
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
			<Box component="div" my={4}>
				<Typography
					sx={{
						width: '100%',
						textAlign: 'center',
						color: 'rgb(142, 142, 142)',
						borderBottom: '1px solid rgb(219, 219, 219)',
						borderLeft: 'none',
						borderRight: 'none',
						lineHeight: '0.1em',
						margin: '10px 0 20px',
					}}
					variant="body1"
				>
					<span style={{ backgroundColor: '#fff', padding: '0 20px' }}>OR</span>
				</Typography>
			</Box>
			<Box
				component="div"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Link style={{ textDecoration: 'none', color: 'inherit' }} to="/signup">
					<strong>Create new account</strong>
				</Link>
			</Box>

			<Link
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					paddingTop: 40,
					textDecoration: 'none',
					color: 'inherit',
				}}
				to="/"
			>
				Back to login
			</Link>
		</>
	);
}
