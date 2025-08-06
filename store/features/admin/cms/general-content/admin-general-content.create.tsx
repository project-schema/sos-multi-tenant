'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, env, ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateCrmHomeContentMutation,
	useAdminViewCrmHomeContentQuery,
} from '../home-content/admin-home-content.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	logo: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Logo is required',
		})
		.optional(),
	footer_image: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Footer logo is required',
		})
		.optional(),
	google_tag: z.string().optional(),
	tag_manager: z.string().optional(),
	credit_link: z.string().min(1, 'Credit link is required'),
	credit_name: z.string().min(1, 'Credit name is required'),
	copywright_text: z.string().min(1, 'Copyright text is required'),

	footer_contact_number: z.string().min(1, 'Contact number is required'),
	footer_contact_address: z.string().min(1, 'Contact address is required'),
	footer_description: z.string().min(1, 'Description is required'),
	newsletter_description: z.string().min(1, 'Description is required'),
	newsletter_title: z.string().min(1, 'Title is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmGeneralContentCreate() {
	const [store, { isLoading }] = useAdminUpdateCrmHomeContentMutation();
	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useAdminViewCrmHomeContentQuery(undefined);
	const setting = data?.message[0];

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			logo: undefined,
			google_tag: '',
			tag_manager: '',
			credit_name: '',
			credit_link: '',
			copywright_text: '',
			footer_image: undefined,
			footer_contact_number: '',
			footer_contact_address: '',
			footer_description: '',
			newsletter_description: '',
			newsletter_title: '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.message && setting) {
			form.reset({
				...setting,
				logo: undefined,
				google_tag: setting.google_tag || '',
				tag_manager: setting.tag_manager || '',
				footer_image: undefined,
			});
		}
	}, [data, form, setting]);

	if (isError) return <ErrorAlert />;
	if (loading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store(data).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(
							response.message || 'Home content updated successfully'
						);
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
				{/* Footer Section */}
				<div>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							{/* Logo */}
							<h3 className="text-lg font-medium mb-4">Logo</h3>
							<div className="flex gap-4 flex-wrap">
								<FormField
									control={form.control}
									name="logo"
									render={({ field }) => (
										<FormItem>
											<ImageUpload
												label="Header Logo"
												value={field.value}
												onChange={field.onChange}
												defaultImage={`${env.baseAPI}/${setting?.logo}`}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="footer_image"
									render={({ field }) => (
										<FormItem>
											<ImageUpload
												label="Footer Logo"
												value={field.value}
												onChange={field.onChange}
												defaultImage={`${env.baseAPI}/${setting?.footer_image}`}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="footer_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Footer Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Enter footer description..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="copywright_text"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Copyright Text</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter copyright  text..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* Others */}
						<div>
							<h3 className="text-lg font-medium mb-4">Others</h3>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="footer_contact_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact Number</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter contact number..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="footer_contact_address"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter address..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="credit_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Credit Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter credit name..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="credit_link"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Credit Link</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter credit link..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tag Manager */}
				<div>
					<h3 className="text-lg font-medium mb-4">Tag Manager</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="tag_manager"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tag Manager</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Enter tag..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<FormField
								control={form.control}
								name="google_tag"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tag Manager Body</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Enter tag..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				<DialogFooter className="col-span-2">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Update Content'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
