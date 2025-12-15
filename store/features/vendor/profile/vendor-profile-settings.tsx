'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';

import { Loader6 } from '@/components/dashboard/loader';
import { ImageUpload } from '@/components/ui/image-upload';
import { alertConfirm, env } from '@/lib';
import { useSession } from 'next-auth/react';
import {
	useVendorProfileInfoQuery,
	useVendorProfileUpdateMutation,
} from './vendor-profile-api-slice';

const profileSchema = z
	.object({
		name: z.string({ error: 'Name is required' }).min(1, 'Name is required'),
		email: z.email('Invalid email address'),
		image: z.any().optional(),
		old_password: z.string().optional(),
		new_password: z.string().optional(),
		confirm_password: z.string().optional(),
	})
	.superRefine((values, ctx) => {
		const wantsPasswordChange =
			!!values.old_password ||
			!!values.new_password ||
			!!values.confirm_password;

		if (!wantsPasswordChange) return;

		if (!values.old_password) {
			ctx.addIssue({
				path: ['old_password'],
				code: z.ZodIssueCode.custom,
				message: 'Old password is required',
			});
		}

		if (!values.new_password) {
			ctx.addIssue({
				path: ['new_password'],
				code: z.ZodIssueCode.custom,
				message: 'New password is required',
			});
		} else if (values.new_password.length < 8) {
			ctx.addIssue({
				path: ['new_password'],
				code: z.ZodIssueCode.custom,
				message: 'New password must be at least 8 characters',
			});
		}

		if (!values.confirm_password) {
			ctx.addIssue({
				path: ['confirm_password'],
				code: z.ZodIssueCode.custom,
				message: 'Please confirm the new password',
			});
		} else if (values.new_password !== values.confirm_password) {
			ctx.addIssue({
				path: ['confirm_password'],
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
			});
		}
	});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function VendorProfileSettings() {
	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useVendorProfileInfoQuery(undefined);
	const [update, { isLoading }] = useVendorProfileUpdateMutation();
	const { update: updateSession, data: session } = useSession();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: data?.user?.name || '',
			email: data?.user?.email || '',
			image: null,
			old_password: '',
			new_password: '',
			confirm_password: '',
		},
	});

	useEffect(() => {
		if (data) {
			form.setValue('name', data.user.name || '');
			form.setValue('email', data.user.email || '');
		}
	}, [data]);

	async function onSubmit(values: ProfileFormValues) {
		const { confirm_password, new_password, old_password, ...rest } = values;

		const payload = { ...data?.user, ...rest };

		alertConfirm({
			onOk: async () => {
				try {
					// Assuming update accepts FormData
					const response: any = await update({
						...payload,
						old_password,
						new_password,
						confirm_password,
					}).unwrap();

					if (response.status === 200) {
						await updateSession({
							user: {
								...session?.user,
								name: response?.user?.name,
							},
						});
						toast.success(response.message || 'Profile updated successfully');
					} else {
						toast.error(response.message || 'Failed to update profile');
					}
				} catch (error: any) {
					if (error?.status === 400 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof ProfileFormValues, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Something went wrong');
					}
				}
			},

			// optional
			onCancel: () => {
				//
			},
		});
	}

	if (profileLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}
	if (isError) return <div>Error loading profile</div>;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 max-w-xl"
			>
				{/* Image Upload + Preview */}
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<ImageUpload
								label="Profile Image"
								value={field.value}
								onChange={(file) => field.onChange(file)}
								defaultImage={
									data?.user?.image ? `${env.baseAPI}/${data.user.image}` : null
								}
							/>
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Email */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input disabled type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Old Password */}
					<FormField
						control={form.control}
						name="old_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Old Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										autoComplete="current-password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* New Password */}
					<FormField
						control={form.control}
						name="new_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										autoComplete="new-password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Confirm New Password */}
					<FormField
						control={form.control}
						name="confirm_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm New Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										autoComplete="new-password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isLoading}>
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Updating...' : 'Update Profile'}
				</Button>
			</form>
		</Form>
	);
}
