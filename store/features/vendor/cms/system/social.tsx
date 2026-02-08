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
	fb_url: z.string().min(1, 'Facebook URL is required'),
	x_url: z.string().min(1, 'X URL is required'),
	instagram_url: z.string().min(1, 'Instagram URL is required'),
	youtube_url: z.string().min(1, 'YouTube URL is required'),
	tiktok_url: z.string().min(1, 'TikTok URL is required'),
	telegram_url: z.string().min(1, 'Telegram URL is required'),
	whatsapp_url: z.string().min(1, 'WhatsApp URL is required'),
});

type ZodType = z.infer<typeof schema>;

export function Cmssocial() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			fb_url: data?.data?.fb_url || '',
			x_url: data?.data?.x_url || '',
			instagram_url: data?.data?.instagram_url || '',
			youtube_url: data?.data?.youtube_url || '',
			tiktok_url: data?.data?.tiktok_url || '',
			telegram_url: data?.data?.telegram_url || '',
			whatsapp_url: data?.data?.whatsapp_url || '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				fb_url: data?.data?.fb_url || '',
				x_url: data?.data?.x_url || '',
				instagram_url: data?.data?.instagram_url || '',
				youtube_url: data?.data?.youtube_url || '',
				tiktok_url: data?.data?.tiktok_url || '',
				telegram_url: data?.data?.telegram_url || '',
				whatsapp_url: data?.data?.whatsapp_url || '',
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
						toast.success(
							response.message || 'Social media settings updated successfully'
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
		<Card className="w-full max-w-2xl">
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* fb_url */}
						<FormField
							control={form.control}
							name="fb_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Facebook URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter Facebook URL..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* x_url */}

						<FormField
							control={form.control}
							name="x_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>X URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter X URL..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* instagram_url */}

						<FormField
							control={form.control}
							name="instagram_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Instagram URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter Instagram URL..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* youtube_url */}

						<FormField
							control={form.control}
							name="youtube_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>YouTube URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter YouTube URL..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* tiktok_url */}

						<FormField
							control={form.control}
							name="tiktok_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>TikTok URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter TikTok URL..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* telegram_url */}

						<FormField
							control={form.control}
							name="telegram_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telegram URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter Telegram URL..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* whatsapp_url */}

						<FormField
							control={form.control}
							name="whatsapp_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>WhatsApp URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter WhatsApp URL..." />
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
								{isLoading ? 'Updating...' : 'Update Social Media'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
