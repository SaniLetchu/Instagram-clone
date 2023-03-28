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
import * as Yup from 'yup';

const initialValues = {
	username: '',
};

const validationSchema = Yup.object().shape({
	username: Yup.string().length(4),
});

export default function UsernameForm() {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, actions) => {
				actions.setSubmitting(true);

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
