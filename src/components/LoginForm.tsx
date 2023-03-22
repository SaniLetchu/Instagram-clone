import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Grid, Typography, Box } from '@mui/material';
import * as Yup from 'yup';

const initialValues = {
	email: '',
	password: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}}
				validationSchema={validationSchema}
			>
				{({ isSubmitting, isValid }) => (
					<Form>
						<Grid container direction="column" spacing={2}>
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
							</Grid>
							<Grid item>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
									disabled={isSubmitting || !isValid}
								>
									Login
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
			<Box
				component="div"
				sx={{
					borderLeft: '2px solid black',
					borderRight: '2px solid black',
					paddingLeft: '16px',
					paddingRight: '16px',
				}}
			>
				<Typography variant="body1">Your text here</Typography>
			</Box>
		</>
	);
};

export default LoginForm;
