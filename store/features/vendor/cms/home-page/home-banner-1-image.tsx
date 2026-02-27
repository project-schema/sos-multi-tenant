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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, ErrorAlert, imageFormat } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSystemQuery, useUpdateSystemMutation } from '../system/api-slice';

// --- Zod Schema ---
const schema = z.object({
	banner_title: z.string().min(1, 'Banner Title is required'),
	banner_description: z.string().min(1, 'Banner Description is required'),
	banner_1: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	banner_1_url: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function HomeBanner1Image() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			banner_1: undefined,
			banner_1_url: data?.data?.banner_1_url ?? '',
			banner_description: data?.data?.banner_description ?? '',
			banner_title: data?.data?.banner_title ?? '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				banner_1: undefined,
				banner_1_url: data?.data?.banner_1_url ?? '',
				banner_description: data?.data?.banner_description ?? '',
				banner_title: data?.data?.banner_title ?? '',
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
				{/* Three Column Banners Section */}
				<Card className="max-w-lg">
					<CardContent className="pt-6 space-y-6">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Home Banner Image
							</h3>
							<p className="text-sm text-gray-600">
								Configure banners that appear in a home banner image
							</p>
						</div>

						{/* Banner 1 */}
						<div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="banner_1"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<ImageUpload
													label="Banner Image"
													value={field.value as File}
													onChange={field.onChange}
													defaultImage={imageFormat(
														data?.data?.banner_1 ?? null,
													)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="banner_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm">Banner Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter Title..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="banner_description"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm">
												Banner Description
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													placeholder="Enter Description..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="banner_1_url"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm">Banner URL</FormLabel>
											<FormControl>
												<Input {...field} placeholder="https://example.com" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="flex justify-end">
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Updating...' : 'Update Home Banner Image'}
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
