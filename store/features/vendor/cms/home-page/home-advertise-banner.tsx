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
	two_column_banner_1: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	two_column_banner_1_url: z.string().optional(),

	two_column_banner_2: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	two_column_banner_2_url: z.string().optional(),

	three_column_banner_1: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	three_column_banner_1_url: z.string().optional(),

	three_column_banner_2: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	three_column_banner_2_url: z.string().optional(),

	three_column_banner_3: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	three_column_banner_3_url: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function HomeAdvertiseBanner() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			two_column_banner_1: undefined,
			two_column_banner_1_url: data?.data?.two_column_banner_1_url ?? '',
			two_column_banner_2: undefined,
			two_column_banner_2_url: data?.data?.two_column_banner_2_url ?? '',
			three_column_banner_1: undefined,
			three_column_banner_1_url: data?.data?.three_column_banner_1_url ?? '',
			three_column_banner_2: undefined,
			three_column_banner_2_url: data?.data?.three_column_banner_2_url ?? '',
			three_column_banner_3: undefined,
			three_column_banner_3_url: data?.data?.three_column_banner_3_url ?? '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				two_column_banner_1: undefined,
				two_column_banner_1_url: data?.data?.two_column_banner_1_url ?? '',
				two_column_banner_2: undefined,
				two_column_banner_2_url: data?.data?.two_column_banner_2_url ?? '',
				three_column_banner_1: undefined,
				three_column_banner_1_url: data?.data?.three_column_banner_1_url ?? '',
				three_column_banner_2: undefined,
				three_column_banner_2_url: data?.data?.three_column_banner_2_url ?? '',
				three_column_banner_3: undefined,
				three_column_banner_3_url: data?.data?.three_column_banner_3_url ?? '',
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
					<CardContent className="pt-6">
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Two Column Banners
							</h3>
							<p className="text-sm text-gray-600">
								Configure banners that appear in a two-column layout
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Banner 1 */}
							<div className="space-y-4">
								<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
									<h4 className="text-sm font-medium text-gray-700 mb-3">
										Banner 1
									</h4>
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="two_column_banner_1"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<ImageUpload
															label="Banner Image"
															value={field.value as File}
															onChange={field.onChange}
															defaultImage={imageFormat(
																data?.data?.two_column_banner_1 ?? null
															)}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="two_column_banner_1_url"
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

							{/* Banner 2 */}
							<div className="space-y-4">
								<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
									<h4 className="text-sm font-medium text-gray-700 mb-3">
										Banner 2
									</h4>
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="two_column_banner_2"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<ImageUpload
															label="Banner Image"
															value={field.value as File}
															onChange={field.onChange}
															defaultImage={imageFormat(
																data?.data?.two_column_banner_2 ?? null
															)}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="two_column_banner_2_url"
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
						</div>
					</CardContent>
				</Card>

				{/* Three Column Banners Section */}
				<Card>
					<CardContent className="pt-6">
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Three Column Banners
							</h3>
							<p className="text-sm text-gray-600">
								Configure banners that appear in a three-column layout
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
										name="three_column_banner_1"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ImageUpload
														label="Banner Image"
														value={field.value as File}
														onChange={field.onChange}
														defaultImage={imageFormat(
															data?.data?.three_column_banner_1 ?? null
														)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="three_column_banner_1_url"
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
										name="three_column_banner_2"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ImageUpload
														label="Banner Image"
														value={field.value as File}
														onChange={field.onChange}
														defaultImage={imageFormat(
															data?.data?.three_column_banner_2 ?? null
														)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="three_column_banner_2_url"
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
										name="three_column_banner_3"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ImageUpload
														label="Banner Image"
														value={field.value as File}
														onChange={field.onChange}
														defaultImage={imageFormat(
															data?.data?.three_column_banner_3 ?? null
														)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="three_column_banner_3_url"
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
								{isLoading ? 'Updating...' : 'Update Advertise Banners'}
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
