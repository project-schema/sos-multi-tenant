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
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from './admin-home-content.api.slice';

// --- Zod Schema ---
const schema = z.object({
	count_three_title: z.string().optional(),
	count_three: z.string().optional(),
	count_two_title: z.string().optional(),
	count_two: z.string().optional(),
	one_title: z.string().optional(),
	count_one: z.string().optional(),
	f_feature_image_5: z.instanceof(File).optional(),
});

type ZodType = z.infer<typeof schema>;

export function MainWebFeature5() {
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
			count_three_title: setting?.count_three_title ?? '',
			count_three: setting?.count_three ?? '',
			count_two_title: setting?.count_two_title ?? '',
			count_two: setting?.count_two ?? '',
			one_title: setting?.one_title ?? '',
			count_one: setting?.count_one ?? '',
			f_feature_image_5: undefined,
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				count_three_title: setting?.count_three_title ?? '',
				count_three: setting?.count_three ?? '',
				count_two_title: setting?.count_two_title ?? '',

				count_two: setting?.count_two ?? '',
				one_title: setting?.one_title ?? '',
				count_one: setting?.count_one ?? '',
				f_feature_image_5: undefined,
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
		<div className="space-y-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-4"
				>
					<Card>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="f_feature_image_5"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<ImageUpload
												label="Image"
												value={field.value as File}
												onChange={field.onChange}
												defaultImage={imageFormat(
													setting?.f_feature_image_5 ?? null,
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="one_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Title" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="count_one"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Heading</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Heading" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="count_two"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} placeholder="Description" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
								<FormField
									control={form.control}
									name="count_two_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Facebook Link</FormLabel>
											<FormControl>
												<Input {...field} placeholder="url" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="count_three"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Instagram Link</FormLabel>
											<FormControl>
												<Input {...field} placeholder="url" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="count_three_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>WhatsApp Link</FormLabel>
											<FormControl>
												<Input {...field} placeholder="url" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Submit Button */}
					<div className="flex justify-end">
						<Button type="submit" disabled={isLoading}>
							{isLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{isLoading ? 'Updating...' : 'Update'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
