'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

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
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm, env } from '@/lib';
import { useAdminUpdateMemberMutation } from './member.api.slice';
import { iMember } from './member.type';

// --- Zod Schema ---
const schema = z.object({
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

type ZodType = z.infer<typeof schema>;

export function MemberEdit({ editData }: { editData: iMember }) {
	const [open, setOpen] = useState(false);

	const [updateProfile, { isLoading }] = useAdminUpdateMemberMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			photo: undefined,
			name: editData.name,
			designation: editData.designation,
			facebook_link: editData.facebook_link,
			instagram_link: editData.instagram_link,
			twitter_link: editData.twitter_link,
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProfile({
						...data,
						id: editData.id,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Member updated successfully');
						setOpen(false);
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit Member</DialogTitle>
					<DialogDescription>Update the information.</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Image Upload */}
						<FormField
							control={form.control}
							name="photo"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Member Image"
										value={field.value}
										onChange={field.onChange}
										defaultImage={`${env.baseAPI}/${editData.photo}`}
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

						{/* Facebook Link */}
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

						{/* Instagram Link */}
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

						{/* Twitter Link */}
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
								{isLoading ? 'Updating...' : 'Update Member'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
