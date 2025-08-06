'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Loader6 } from '@/components/dashboard/loader';
import { alertConfirm } from '@/lib';
import { LoaderCircle } from 'lucide-react';
import {
	useProfileDataQuery,
	useUserUpdateProfileMutation,
} from './user-profile-api-slice';

// ✅ Zod schema
const passwordSchema = z
	.object({
		old_password: z.string().min(1, 'Old password is required'),
		new_password: z
			.string()
			.min(8, 'The new password must be at least 8 characters.'),
		confirm_password: z.string().min(1, 'Please confirm your new password'),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password'],
	});

export type PasswordFormValues = z.infer<typeof passwordSchema>;

export function UserPassword() {
	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useProfileDataQuery(undefined);

	const [updateProfile, { isLoading }] = useUserUpdateProfileMutation();

	const form = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			old_password: '',
			new_password: '',
			confirm_password: '',
		},
	});

	async function onSubmit(values: PasswordFormValues) {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProfile({
						...data?.user,
						...values,
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message);
						form.reset();
					} else {
						toast.error(response.message);
					}
				} catch (error: any) {
					if (error?.status === 400 && typeof error.message === 'object') {
						const messages = error.message;
						// Loop over server errors and set them in the form
						Object.entries(messages).forEach(([field, value]) => {
							form.setError(field as keyof PasswordFormValues, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Something went wrong');
					}
				}
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
				className="space-y-6 max-w-md"
			>
				<FormField
					control={form.control}
					name="old_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your old password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="new_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter a new password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm your new password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isLoading}>
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Updating...' : 'Update Password'}
				</Button>
			</form>
		</Form>
	);
}
