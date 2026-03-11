'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { alertConfirm, ErrorAlert, imageFormat } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from './admin-home-content.api.slice';

// --- Zod Schema ---
const schema = z.object({
	f_banner_group_title_image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),

	newsletter_title: z.string().optional(),

	home_banner_heading: z.string().optional(),

	home_banner_description: z.string().optional(),

	newsletter_description: z.string().optional(), // btn text
	subscription_heading: z.string().optional(), // btn url

	subscription_title: z.string().optional(),
	chose_description: z.string().optional(),

	f_banner_image_1: z.instanceof(File).optional(),
	f_banner_image_2: z.instanceof(File).optional(),
	f_banner_image_3: z.instanceof(File).optional(),
});

type ZodType = z.infer<typeof schema>;

export function MainWebBanner() {
	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();
	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useAdminViewHomeContentQuery();

	const setting = data?.message[0];

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			f_banner_group_title_image: undefined,
			newsletter_title: setting?.newsletter_title ?? '',
			home_banner_heading: setting?.home_banner_heading ?? '',
			home_banner_description: setting?.home_banner_description ?? '',
			newsletter_description: setting?.newsletter_description ?? '',
			subscription_title: setting?.subscription_title ?? '',
			subscription_heading: setting?.subscription_heading ?? '',
			chose_description: setting?.chose_description ?? '',
			f_banner_image_1: undefined,
			f_banner_image_2: undefined,
			f_banner_image_3: undefined,
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				newsletter_title: setting?.newsletter_title ?? '',
				home_banner_heading: setting?.home_banner_heading ?? '',
				home_banner_description: setting?.home_banner_description ?? '',
				newsletter_description: setting?.newsletter_description ?? '',
				subscription_title: setting?.subscription_title ?? '',
				subscription_heading: setting?.subscription_heading ?? '',
				chose_description: setting?.chose_description ?? '',

				f_banner_group_title_image: undefined,
				f_banner_image_1: undefined,
				f_banner_image_2: undefined,
				f_banner_image_3: undefined,
			});
		}
	}, [data, form]);

	if (isError) return <ErrorAlert />;
	if (loading) {
		return (
			<>
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
					const response = await store({ ...data }).unwrap();

					if (response.status) {
						refetch();
						toast.success(response.message || 'System Update successfully');
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
				{/* Two Column Banners Section */}

				<Card>
					<CardContent className="pt-6 space-y-6">
						<FormField
							control={form.control}
							name="f_banner_group_title_image"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUpload
											label="Group Title Image"
											value={field.value as File}
											onChange={field.onChange}
											defaultImage={imageFormat(
												setting?.f_banner_group_title_image ?? null,
											)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="newsletter_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Group Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Banner Group Title" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6 space-y-6">
						<FormField
							control={form.control}
							name="home_banner_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Banner Heading</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Banner Heading" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="home_banner_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Banner Description" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6 grid md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="newsletter_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Button 1 Text</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Button text" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="subscription_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Button 1 URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="https://example.com" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="subscription_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Button 2 Text</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Button text" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="chose_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Button 2 URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="https://example.com" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6 grid md:grid-cols-3 gap-6">
						<FormField
							control={form.control}
							name="f_banner_image_1"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUpload
											label="Banner Image 1"
											value={field.value as File}
											onChange={field.onChange}
											defaultImage={imageFormat(
												setting?.f_banner_image_1 ?? null,
											)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="f_banner_image_2"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUpload
											label="Banner Image 2"
											value={field.value as File}
											onChange={field.onChange}
											defaultImage={imageFormat(
												setting?.f_banner_image_2 ?? null,
											)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="f_banner_image_3"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUpload
											label="Banner Image 3"
											value={field.value as File}
											onChange={field.onChange}
											defaultImage={imageFormat(
												setting?.f_banner_image_3 ?? null,
											)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				{/* Submit Button */}
				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Update Advertise Banners'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
