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
import { useSystemQuery, useUpdateSystemMutation } from '../system/api-slice';

// --- Zod Schema ---
const schema = z.object({
	banner_1: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	banner_1_url: z.string().optional(),

	banner_2: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	banner_2_url: z.string().optional(),

	banner_3: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	banner_3_url: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function HomeBanner3Image() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			banner_1: undefined,
			banner_1_url: data?.data?.banner_1_url ?? '',
			banner_2: undefined,
			banner_2_url: data?.data?.banner_2_url ?? '',
			banner_3: undefined,
			banner_3_url: data?.data?.banner_3_url ?? '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				banner_1: undefined,
				banner_1_url: data?.data?.banner_1_url ?? '',
				banner_2: undefined,
				banner_2_url: data?.data?.banner_2_url ?? '',
				banner_3: undefined,
				banner_3_url: data?.data?.banner_3_url ?? '',
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
				<Card>
					<CardContent className="pt-6">
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Home Banner Image
							</h3>
							<p className="text-sm text-gray-600">
								Configure banners that appear in a home banner image
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Banner 1 */}
							<div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
								<h4 className="text-sm font-medium text-gray-700 mb-3">
									Banner 1
								</h4>
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
															data?.data?.banner_1 ?? null
														)}
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
													<Input
														{...field}
														placeholder="https://example.com"
														type="url"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							{/* Banner 2 */}
							<div className="border border-gray-200 rounded-lg p-4 bg-green-50">
								<h4 className="text-sm font-medium text-gray-700 mb-3">
									Banner 2
								</h4>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="banner_2"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ImageUpload
														label="Banner Image"
														value={field.value as File}
														onChange={field.onChange}
														defaultImage={imageFormat(
															data?.data?.banner_2 ?? null
														)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="banner_2_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm">Banner URL</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="https://example.com"
														type="url"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							{/* Banner 3 */}
							<div className="border border-gray-200 rounded-lg p-4 bg-purple-50">
								<h4 className="text-sm font-medium text-gray-700 mb-3">
									Banner 3
								</h4>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="banner_3"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ImageUpload
														label="Banner Image"
														value={field.value as File}
														onChange={field.onChange}
														defaultImage={imageFormat(
															data?.data?.banner_3 ?? null
														)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="banner_3_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm">Banner URL</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="https://example.com"
														type="url"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Submit Button */}
				<Card>
					<CardContent className="pt-6">
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
