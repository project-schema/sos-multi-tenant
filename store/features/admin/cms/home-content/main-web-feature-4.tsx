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
import { OrganizationCreate, OrganizationTable } from '../organization';
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from './admin-home-content.api.slice';

// --- Zod Schema ---
const schema = z.object({
	service_two_heading: z.string().optional(),
	service_two_title: z.string().optional(),
	f_feature_image_4: z.instanceof(File).optional(),
});

type ZodType = z.infer<typeof schema>;

export function MainWebFeature4() {
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
			service_two_heading: setting?.service_two_heading ?? '',
			service_two_title: setting?.service_two_title ?? '',
			f_feature_image_4: undefined,
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				service_two_heading: setting?.service_two_heading ?? '',
				service_two_title: setting?.service_two_title ?? '',
				f_feature_image_4: undefined,
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
								name="f_feature_image_4"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<ImageUpload
												label="Image"
												value={field.value as File}
												onChange={field.onChange}
												defaultImage={imageFormat(
													setting?.f_feature_image_4 ?? null,
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
									name="service_two_title"
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
									name="service_two_heading"
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

			<div className="grid lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-1">
					<CardContent>
						<OrganizationCreate />
					</CardContent>
				</Card>
				<Card className="lg:col-span-2 overflow-hidden">
					<CardContent>
						<OrganizationTable />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
