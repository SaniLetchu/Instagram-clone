import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextareaAutosize, Typography, ButtonBase } from '@mui/material';
import { createPost } from '../../services/firestore';
import { ImageSearch } from '@mui/icons-material';
import Button from '../Button';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useDashboard from '../../hooks/useDashboard';
import * as Yup from 'yup';

const MAX_FILE_SIZE = 5242880; // 5 MB in bytes

type FormValues = {
	caption: string;
	image: File | null;
};

const initialValues: FormValues = {
	caption: '',
	image: null,
};

const validationSchema = Yup.object().shape({
	caption: Yup.string().required('Caption is required'),
	image: Yup.mixed()
		.required('Image is required')
		.test(
			'is-valid-size',
			'Max allowed size is 5 mb',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(value: any) => value && value.size <= MAX_FILE_SIZE
		),
});

export default function CreatePostForm() {
	const { user } = useAuth();
	const { secondaryBackgroundColor, textAndIconColor, borderColor } =
		useTheme();
	const { setOpenCreatePostModal } = useDashboard();
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, actions) => {
				console.log(222);
				actions.setSubmitting(true);
				const success = await createPost(
					values.caption,
					values.image as File,
					user?.uid as string
				);
				if (!success) {
					actions.setStatus({ message: 'Error creating post' });
				} else {
					actions.resetForm();
					setImagePreviewUrl('');
					setOpenCreatePostModal(false);
				}
				actions.setSubmitting(false);
			}}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, errors, touched, setFieldValue, values }) => (
				<Form
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						alignItems: 'center',
					}}
				>
					<ButtonBase
						component="label"
						sx={{
							border: `1px solid ${borderColor}`,
							borderRadius: 2,
							width: '50%',
							height: 120,
							display: 'flex',
							p: 1,
							gap: 0.5,
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
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
								src={imagePreviewUrl}
								style={{ width: '100%', height: '100%', objectFit: 'contain' }}
								alt="Preview of selected image"
							/>
						)}
						{!imagePreviewUrl && (
							<>
								<ImageSearch
									fontSize="large"
									sx={{ color: textAndIconColor }}
								/>
								<Typography
									variant="subtitle2"
									sx={{ textAlign: 'center', color: textAndIconColor }}
								>
									Select image
								</Typography>
								<Typography
									variant="caption"
									sx={{ textAlign: 'center', color: textAndIconColor }}
								>
									File size limit 5 mb
								</Typography>
							</>
						)}
					</ButtonBase>
					<TextareaAutosize
						aria-label="empty textarea"
						placeholder="Caption"
						maxLength={50}
						value={values.caption}
						style={{
							marginBottom: 20,
							marginTop: 20,
							maxWidth: '80%',
							minWidth: '50%',
							maxHeight: 100,
							minHeight: 100,
							borderRadius: 5,
							border: `1px solid ${borderColor}`,
							backgroundColor: secondaryBackgroundColor,
							color: textAndIconColor,
							outline: 'none',
						}}
						onChange={(event) => {
							setFieldValue(
								'caption',
								event &&
									event.currentTarget &&
									event.currentTarget.value &&
									event.currentTarget.value
							);
						}}
					/>
					<Button disabled={isSubmitting} text="Post" />
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
					{errors.caption && touched.caption && (
						<Typography
							sx={{
								color: 'red',
								textAlign: 'center',
								fontSize: 12,
								marginTop: 1,
							}}
						>
							<ErrorMessage name="caption" />
						</Typography>
					)}
				</Form>
			)}
		</Formik>
	);
}
