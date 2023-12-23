import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid, Typography } from '@mui/material';
import {
	isUsernameAvailable,
	createUserDocument,
} from '../../services/firestore';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import Button from '../Button';
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
	const { secondaryBackgroundColor, textAndIconColor, borderColor } =
		useTheme();
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
			{({ isSubmitting, errors, touched, status, setFieldValue }) => (
				<Form
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						alignItems: 'center',
					}}
				>
					<Grid container direction="column" spacing={1}>
						<Grid
							item
							sx={{
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
								mx: 5,
							}}
						>
							<Field
								aria-label="empty textarea"
								placeholder="Username"
								maxLength={50}
								name="username"
								type="username"
								style={{
									marginBottom: 20,
									marginTop: 20,
									fontSize: 15,
									borderRadius: 5,
									border: `1px solid ${borderColor}`,
									backgroundColor: secondaryBackgroundColor,
									color: textAndIconColor,
									outline: 'none',
								}}
								onChange={(event: any) => {
									setFieldValue(
										'username',
										event &&
											event.currentTarget &&
											event.currentTarget.value &&
											event.currentTarget.value
									);
								}}
							/>
							{errors.username && touched.username && (
								<Typography
									sx={{ color: 'red', textAlign: 'center', fontSize: 12 }}
								>
									<ErrorMessage name="username" />
								</Typography>
							)}
						</Grid>
						<Grid
							item
							my={1}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
								mx: 5,
							}}
						>
							<Button disabled={isSubmitting} text="Select" />
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
