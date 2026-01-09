'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSystemQuery, useUpdateSystemMutation } from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	seo_meta_title: z.string().min(1, 'Meta Title is required').max(70, 'Meta Title should be less than 70 characters'),
	seo_meta_description: z.string().min(1, 'Meta Description is required').max(160, 'Meta Description should be less than 160 characters'),
	seo_meta_keywords: z.string().optional(),
	seo_meta_image: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function CMSSeo() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			seo_meta_title: data?.data?.seo_meta_title || '',
			seo_meta_description: data?.data?.seo_meta_description || '',
			seo_meta_keywords: data?.data?.seo_meta_keywords || '',
			seo_meta_image: data?.data?.seo_meta_image || '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				seo_meta_title: data?.data?.seo_meta_title || '',
				seo_meta_description: data?.data?.seo_meta_description || '',
				seo_meta_keywords: data?.data?.seo_meta_keywords || '',
				seo_meta_image: data?.data?.seo_meta_image || '',
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
				<Loader5 />
			</>
		);
	}

	const onSubmit = async (formData: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({ ...formData }).unwrap();

					if (response.status) {
						refetch();
						toast.success(response.message || 'SEO settings updated successfully');
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
						{/* seo_meta_title */}
						<FormField
							control={form.control}
							name="seo_meta_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Meta Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter meta title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* seo_meta_description */}
						<FormField
							control={form.control}
							name="seo_meta_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Meta Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter meta description..."
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* seo_meta_keywords */}
						<FormField
							control={form.control}
							name="seo_meta_keywords"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Meta Keywords</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter keywords separated by commas..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* seo_meta_image */}
						<FormField
							control={form.control}
							name="seo_meta_image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Meta Image URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter meta image URL..." />
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
								{isLoading ? 'Updating...' : 'Update SEO'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
