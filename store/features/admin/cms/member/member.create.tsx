'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './member.type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminStoreCrmMemberMutation } from './member.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	photo: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),

	name: z.string().min(1, 'Title is required'),
	designation: z.string().min(1, 'Designation is required'),
	facebook_link: z.string().min(1, 'Facebook link is required'),
	instagram_link: z.string().min(1, 'Instagram link is required'),
	twitter_link: z.string().min(1, 'Twitter link is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmMemberCreate() {
	const [store, { isLoading }] = useAdminStoreCrmMemberMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			photo: undefined,
			name: '',
			designation: '',
			facebook_link: '',
			instagram_link: '',
			twitter_link: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Profile updated successfully');
						form.reset();
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
							Object.entries(errorResponse.errors).forEach(([field, value]) => {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: (value as string[])[0],
								});
							});
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof ZodType, {
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
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Image Upload */}
				<FormField
					control={form.control}
					name="photo"
					render={({ field }) => (
						<FormItem>
							<ImageUpload
								label="Image"
								value={field.value}
								onChange={field.onChange}
								defaultImage={null}
							/>
						</FormItem>
					)}
				/>

				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize block mt-2">Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Name..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Designation */}
				<FormField
					control={form.control}
					name="designation"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize block mt-2">
								Designation
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Designation..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* facebook_link */}
				<FormField
					control={form.control}
					name="facebook_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize block mt-2">
								Facebook Link
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Facebook Link..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* instagram_link */}
				<FormField
					control={form.control}
					name="instagram_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize block mt-2">
								Instagram Link
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Instagram Link..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* twitter_link */}
				<FormField
					control={form.control}
					name="twitter_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize block mt-2">
								Twitter Link
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Twitter Link..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create Member'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
