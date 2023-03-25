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
import useAuth from '../hooks/useAuth';
import * as Yup from 'yup';

const initialValues = {
	email: '',
	password: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
});

export default function SignupForm() {
	const { loginGoogle, signup } = useAuth();
	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values, actions) => {
					actions.setSubmitting(true);
					try {
						await signup(values.email, values.password);
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
							<Grid item display={'flex'} justifyContent={'center'} my={3}>
								<i
									data-visualcompletion="css-img"
									aria-label="Instagram"
									role="img"
									style={{
										backgroundImage:
											'url("https://static.cdninstagram.com/rsrc.php/v3/yK/r/ATdtiLb2BQ9.png")',
										backgroundPosition: '0px 0px',
										backgroundSize: '176px 181px',
										width: '175px',
										height: '51px',
										backgroundRepeat: 'no-repeat',
										display: 'inline-block',
									}}
								></i>
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
									name="password"
									as={TextField}
									type="password"
									label="Password"
									variant="filled"
									fullWidth
								/>
								{errors.password && touched.password && (
									<Typography
										sx={{ color: 'red', textAlign: 'center', fontSize: 12 }}
									>
										<ErrorMessage name="password" />
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
									Sign up
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
				my={2}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ButtonBase
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1,
					}}
					onClick={loginGoogle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="20"
						height="20"
						viewBox="0 0 48 48"
					>
						<path
							fill="#FFC107"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
						<path
							fill="#FF3D00"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
						></path>
						<path
							fill="#4CAF50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
						></path>
						<path
							fill="#1976D2"
							d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
					</svg>
					<Typography>Log in with Google</Typography>
				</ButtonBase>
			</Box>
		</>
	);
}
