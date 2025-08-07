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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm, env } from '@/lib';
import { useParams } from 'next/navigation';
import {
	useAdminUpdateUserProfileMutation,
	useAdminUserProfileByIdQuery,
} from './admin.user.api.slice';

const profileSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	image: z.any().optional(),
	number: z.string().optional(),
	balance: z.union([z.string(), z.number()]).optional(),
	password: z.string().optional(),
	status: z.enum(['active', 'pending', 'blocked']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function AdminUserSettings() {
	const params = useParams();
	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useAdminUserProfileByIdQuery({ id: params.id as string });
	const [update, { isLoading }] = useAdminUpdateUserProfileMutation();

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: data?.user?.name || '',
			email: data?.user?.email || '',
			image: null,
			number: data?.user?.number || '',
			balance: data?.user?.balance || '',
			password: '',
			status: data?.user?.status || 'active',
		},
	});

	useEffect(() => {
		if (data) {
			form.setValue('name', data.user.name || '');
			form.setValue('email', data.user.email || '');
			form.setValue('number', data.user.number || '');
			form.setValue('balance', data.user.balance || '');
			form.setValue('status', data.user.status || 'active');
		}
	}, [data]);

	async function onSubmit(values: ProfileFormValues) {
		alertConfirm({
			onOk: async () => {
				try {
					// Assuming update accepts FormData
					const response = await update({
						...data?.user,
						...values,
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message);
					} else {
						toast.error(response.message);
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
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Number */}
					<FormField
						control={form.control}
						name="number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input type="tel" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Balance */}
					<FormField
						control={form.control}
						name="balance"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Balance</FormLabel>
								<FormControl>
									<Input type="number" step="0.01" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Status */}
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="blocked">Blocked</SelectItem>
									</SelectContent>
								</Select>
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
