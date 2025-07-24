'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

import {
	useProfileDataQuery,
	useUserUpdateProfileMutation,
} from './user-profile-api-slice';
import { Loader6 } from '@/components/dashboard/loader';
import { env } from '@/lib';

const profileSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	image: z.any().optional(),
	number: z.any().optional(),
	number2: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function UserSettings() {
	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useProfileDataQuery(undefined);
	const [updateProfile, { isLoading }] = useUserUpdateProfileMutation();

	const [imageData, setImageData] = useState<{
		preview: string | null;
		file: File | null;
	}>({ preview: null, file: null });

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: data?.user?.name || '',
			image: null,
			number2: data?.user?.number2 || '',
			number: data?.user?.number || '',
		},
	});

	useEffect(() => {
		if (data) {
			form.setValue('name', data.user.name || '');
			form.setValue('number2', data.user.number2 || '');
			form.setValue('number', data.user.number || '');
		}
	}, [data]);

	async function onSubmit(values: ProfileFormValues) {
		try {
			// Assuming updateProfile accepts FormData
			const response = await updateProfile({
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
	}
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const preview = URL.createObjectURL(file);
			setImageData({ preview, file });
			form.setValue('image', file);
		}
	};

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
				{/* Image Upload + Preview */}
				<div>
					<FormLabel className="mb-3">Profile Image</FormLabel>

					<div className="flex items-center gap-4">
						<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow">
							{imageData.preview || data?.user?.image ? (
								<img
									src={
										imageData.preview || `${env.baseAPI}/${data?.user?.image}`
									}
									alt="Profile Preview"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400">
									No Image
								</div>
							)}
						</div>
						<Input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-auto"
						/>
					</div>
				</div>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input placeholder="+1 234 567 8900" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="number2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number 2</FormLabel>
							<FormControl>
								<Input placeholder="+1 234 567 8900" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isLoading}>
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Updating...' : 'Update Profile'}
				</Button>
			</form>
		</Form>
	);
}
