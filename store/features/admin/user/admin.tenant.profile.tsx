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

import { ImageUpload } from '@/components/ui/image-upload';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, env } from '@/lib';
import { useAdminUpdateUserProfileMutation } from './admin.user.api.slice';
import { iUser } from './type';

const profileSchema = z.object({
	company_name: z.string().min(1, 'Name is required'),
	email: z.email('Invalid email address'),
	image: z.any().optional(),
	number: z.string().optional(),
	balance: z.union([z.string(), z.number()]).optional(),
	password: z.string().optional(),
	status: z.enum(['active', 'pending', 'blocked']),
	owner_name: z.string().min(1, 'Owner name is required'),
	address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function AdminTenantProfile({ data }: { data: { user: iUser } }) {
	const [update, { isLoading }] = useAdminUpdateUserProfileMutation();

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			company_name: data?.user?.company_name || '',
			email: data?.user?.email || '',
			image: null,
			number: data?.user?.number || '',
			balance: data?.user?.balance || '',
			password: '',
			status: data?.user?.status || 'active',
			owner_name: data?.user?.owner_name || '',
			address: data?.user?.address || '',
		},
	});

	useEffect(() => {
		if (data) {
			form.setValue('company_name', data?.user?.company_name || '');
			form.setValue('email', data?.user?.email || '');
			form.setValue('number', data?.user?.number || '');
			form.setValue('balance', data?.user?.balance || '');
			form.setValue('status', data?.user?.status || 'active');
			form.setValue('owner_name', data?.user?.owner_name || '');
			form.setValue('address', data?.user?.address || '');
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
						type: data?.user.is_tenant ? 'tenant' : 'user',
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
						name="company_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter company name..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Owner Name */}
					<FormField
						control={form.control}
						name="owner_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Owner Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter owner name..." />
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
									<Input
										type="tel"
										{...field}
										placeholder="Enter phone number..."
									/>
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
									<Input
										type="number"
										step="0.01"
										{...field}
										placeholder="Enter balance..."
									/>
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
									<Input
										type="password"
										{...field}
										placeholder="Enter new password..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Address */}
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Textarea {...field} placeholder="Enter address..." />
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
