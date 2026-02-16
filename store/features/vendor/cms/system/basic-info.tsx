'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ColorPicker } from '@/components/ui/color-picker';
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
import { alertConfirm, ErrorAlert, imageFormat } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSystemQuery, useUpdateSystemMutation } from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	app_name: z.string().min(1, 'App Name is required'),
	home_page_title: z.string().min(1, 'Home Page Title is required'),
	color_primary: z.string().optional(),
	logo: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
});

type ZodType = z.infer<typeof schema>;

export function BasicInfo() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			app_name: data?.data?.app_name || '',
			home_page_title: data?.data?.home_page_title || '',
			color_primary: data?.data?.color_primary || '',
			logo: undefined,
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				app_name: data?.data?.app_name || '',
				home_page_title: data?.data?.home_page_title || '',
				color_primary: data?.data?.color_primary || '',
				logo: undefined,
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
		<Card className="w-full max-w-2xl">
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* logo */}
						<FormField
							control={form.control}
							name="logo"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUpload
											label="Logo"
											value={field.value as File}
											onChange={field.onChange}
											defaultImage={imageFormat(data?.data?.logo ?? null)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* app_name */}
						<FormField
							control={form.control}
							name="app_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>App Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter app name..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* home_page_title */}
						<FormField
							control={form.control}
							name="home_page_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Home Page Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter home page title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* color_primary */}
						<FormField
							control={form.control}
							name="color_primary"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color Primary</FormLabel>
									<FormControl>
										<ColorPicker
											onChange={(e) => field.onChange(e)}
											value={field.value || '#FFF'}
											className="w-fit"
										/>
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
								{isLoading ? 'Update...' : 'Update System'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
