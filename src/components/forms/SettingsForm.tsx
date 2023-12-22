import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { Typography, ButtonBase } from '@mui/material';
import { updateUserProfile } from '../../services/firestore';
import Button from '../Button';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import * as Yup from 'yup';
import { AccountCircle, ImageSearch } from '@mui/icons-material';

const MAX_FILE_SIZE = 5242880; // 5 MB in bytes

type FormValues = {
	bio: string;
	image: File | null;
};

const initialValues: FormValues = {
	bio: '',
	image: null,
};

const validationSchema = Yup.object().shape({
	bio: Yup.string()
		.nullable()
		.test('eitherBioOrImage', '', function (value) {
			const { image } = this.parent;
			if (!value && (!image || (image && !image.size))) {
				return false;
			}
			return true;
		}),
	image: Yup.mixed()
		.nullable()
		.test(
			'is-valid-size',
			'Max allowed size is 5 mb',
			(value: any) => !value || (value && value.size <= MAX_FILE_SIZE)
		)
		.test(
			'eitherBioOrImage',
			'You have not changed your profile information',
			function (value) {
				const { bio } = this.parent;
				if (!value && (!bio || bio === '')) {
					return false;
				}
				return true;
			}
		),
});

export default function SettingsForm() {
	const { user } = useAuth();
	const { userData } = useUser();
	const { secondaryBackgroundColor, textAndIconColor, borderColor } =
		useTheme();
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, actions) => {
				console.log(222);
				actions.setSubmitting(true);
				try {
					await updateUserProfile(
						user?.uid as string,
						values.bio,
						values.image
					);
					actions.resetForm();
					setImagePreviewUrl('');
				} catch (error) {
					if (error instanceof Error) {
						actions.setStatus({ message: error.message });
					}
				}
				actions.setSubmitting(false);
			}}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, errors, touched, setFieldValue }) => (
				<Form
					style={{
						display: 'flex',
						marginTop: 50,
						flexDirection: 'column',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ButtonBase
						component="label"
						sx={{
							borderRadius: 100,
							width: 150,
							height: 160,
							display: 'flex',
							p: 1,
							gap: 0.5,
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ImageSearch
							fontSize="large"
							sx={{
								color: 'rgb(38, 38, 38)',
								width: 100,
								height: 100,
								opacity: '20%',
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
								'&:hover': { opacity: '70%' },
							}}
						/>
						<input
							id="file"
							name="file"
							type="file"
							hidden
							accept="image/*"
							onChange={(event) => {
								setFieldValue(
									'image',
									event &&
										event.currentTarget &&
										event.currentTarget.files &&
										event.currentTarget.files[0]
								);
								const reader = new FileReader();
								reader.onloadend = () => {
									setImagePreviewUrl(reader.result as string);
								};

								if (
									event &&
									event.currentTarget &&
									event.currentTarget.files &&
									event.currentTarget.files[0]
								) {
									reader.readAsDataURL(
										event &&
											event.currentTarget &&
											event.currentTarget.files &&
											event.currentTarget.files[0]
									);
								}
							}}
						/>
						{imagePreviewUrl && (
							<img
								style={{
									width: 150,
									height: 150,
									borderRadius: '50%',
									boxShadow: `0 0 10px 2px ${textAndIconColor}`,
									objectFit: 'cover',
								}}
								src={imagePreviewUrl}
								alt="Preview of selected image"
							/>
						)}
						{!imagePreviewUrl && (
							<>
								{userData?.profileImageUrl ? (
									<img
										style={{
											width: 150,
											height: 150,
											borderRadius: '50%',
											boxShadow: `0 0 10px 2px ${textAndIconColor}`,
											objectFit: 'cover',
										}}
										src={userData.profileImageUrl}
										alt="User profile"
									/>
								) : (
									<AccountCircle
										fontSize="large"
										sx={{
											width: 150,
											height: 150,
											borderRadius: 100,
											color: textAndIconColor,
										}}
									/>
								)}
							</>
						)}
					</ButtonBase>
					<Field
						aria-label="empty textarea"
						placeholder="Bio"
						maxLength={50}
						name="bio"
						type="bio"
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
								'bio',
								event &&
									event.currentTarget &&
									event.currentTarget.value &&
									event.currentTarget.value
							);
						}}
					/>
					<Button disabled={isSubmitting} text="Save" />
					{errors.image && touched.image && (
						<Typography
							sx={{
								color: 'red',
								textAlign: 'center',
								fontSize: 12,
								marginTop: 1,
							}}
						>
							<ErrorMessage name="image" />
						</Typography>
					)}
					{errors.bio && touched.bio && (
						<Typography
							sx={{
								color: 'red',
								textAlign: 'center',
								fontSize: 12,
								marginTop: 1,
							}}
						>
							<ErrorMessage name="bio" />
						</Typography>
					)}
				</Form>
			)}
		</Formik>
	);
}
