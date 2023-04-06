import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { isUsernameAvailable, createUserDocument } from '../../services/firestore';
import useAuth from '../../hooks/useAuth';
import * as Yup from 'yup';

const initialValues = {
	username: '',
};

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, 'Username must be atleast 4 characters')
		.required(),
});

export default function UsernameForm() {
	const { user } = useAuth();
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, actions) => {
				actions.setSubmitting(true);
				const usernameAvailable = await isUsernameAvailable(values.username);
				if (usernameAvailable) {
					const success = await createUserDocument(
						values.username.toLowerCase(),
						user?.email ?? '',
						user?.uid ?? '',
						user?.photoURL ?? ''
					);
					if (!success) {
						actions.setStatus({ message: 'Error creating user document' });
					}
				} else {
					actions.setStatus({ message: 'Username not available' });
				}
				actions.setSubmitting(false);
			}}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, errors, touched, status }) => (
				<Form>
					<Grid container direction="column" spacing={1}>
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
								name="username"
								as={TextField}
								label="Username"
								variant="filled"
								fullWidth
							/>
							{errors.username && touched.username && (
								<Typography
									sx={{ color: 'red', textAlign: 'center', fontSize: 12 }}
								>
									<ErrorMessage name="username" />
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
								Select
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
	);
}
