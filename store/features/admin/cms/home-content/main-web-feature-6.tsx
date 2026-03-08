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
	f_feature_image_6: z.instanceof(File).optional(),
	count_four: z.string().optional(),
	count_four_title: z.string().optional(),
	progress_value: z.string().optional(),
	progres_two_value: z.string().optional(),
	progres_three_value: z.string().optional(),
	progres_four_value: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function MainWebFeature6() {
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
			f_feature_image_6: undefined,
			count_four: setting?.count_four ?? '',
			count_four_title: setting?.count_four_title ?? '',
			progress_value: setting?.progress_value ?? '',
			progres_two_value: setting?.progres_two_value ?? '',
			progres_three_value: setting?.progres_three_value ?? '',
			progres_four_value: setting?.progres_four_value ?? '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				f_feature_image_6: undefined,
				count_four: setting?.count_four ?? '',
				count_four_title: setting?.count_four_title ?? '',
				progress_value: setting?.progress_value ?? '',
				progres_two_value: setting?.progres_two_value ?? '',
				progres_three_value: setting?.progres_three_value ?? '',
				progres_four_value: setting?.progres_four_value ?? '',
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
						<CardContent className="space-y-6">
							<FormField
								control={form.control}
								name="f_feature_image_6"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<ImageUpload
												label="Feature Image"
												value={field.value as File}
												onChange={field.onChange}
												defaultImage={imageFormat(
													setting?.f_feature_image_6 ?? null,
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
									name="count_four_title"
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
									name="count_four"
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
									name="progress_value"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Button One Text</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Button Text" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="progres_two_value"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Button One Url</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Url..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="progres_three_value"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Button Two</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Button Two Text" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="progres_four_value"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Button Two Url</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Url..." />
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
