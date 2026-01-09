'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
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
	scripts_google_analytics: z.string().optional(),
	scripts_google_adsense: z.string().optional(),
	scripts_google_recaptcha: z.string().optional(),
	scripts_facebook_pixel: z.string().optional(),
	scripts_facebook_messenger: z.string().optional(),
	scripts_whatsapp_chat: z.string().optional(),
	scripts_google_tag_manager: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function CMSScripts() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			scripts_google_analytics: data?.data?.scripts_google_analytics || '',
			scripts_google_adsense: data?.data?.scripts_google_adsense || '',
			scripts_google_recaptcha: data?.data?.scripts_google_recaptcha || '',
			scripts_facebook_pixel: data?.data?.scripts_facebook_pixel || '',
			scripts_facebook_messenger: data?.data?.scripts_facebook_messenger || '',
			scripts_whatsapp_chat: data?.data?.scripts_whatsapp_chat || '',
			scripts_google_tag_manager: data?.data?.scripts_google_tag_manager || '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				scripts_google_analytics: data?.data?.scripts_google_analytics || '',
				scripts_google_adsense: data?.data?.scripts_google_adsense || '',
				scripts_google_recaptcha: data?.data?.scripts_google_recaptcha || '',
				scripts_facebook_pixel: data?.data?.scripts_facebook_pixel || '',
				scripts_facebook_messenger: data?.data?.scripts_facebook_messenger || '',
				scripts_whatsapp_chat: data?.data?.scripts_whatsapp_chat || '',
				scripts_google_tag_manager: data?.data?.scripts_google_tag_manager || '',
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
						toast.success(response.message || 'Scripts updated successfully');
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
						{/* scripts_google_analytics */}
						<FormField
							control={form.control}
							name="scripts_google_analytics"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Google Analytics</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Paste your Google Analytics script..."
											rows={3}
										/>
									</FormControl>
									<FormDescription>
										Paste your Google Analytics tracking code (e.g., GA4 measurement ID)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* scripts_google_tag_manager */}
						<FormField
							control={form.control}
							name="scripts_google_tag_manager"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Google Tag Manager</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Paste your Google Tag Manager script..."
											rows={3}
										/>
									</FormControl>
									<FormDescription>
										Paste your GTM container ID or full script
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* scripts_google_adsense */}
						<FormField
							control={form.control}
							name="scripts_google_adsense"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Google AdSense</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Paste your Google AdSense script..."
											rows={3}
										/>
									</FormControl>
									<FormDescription>
										Paste your AdSense publisher ID or ad code
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* scripts_google_recaptcha */}
						<FormField
							control={form.control}
							name="scripts_google_recaptcha"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Google reCAPTCHA</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Paste your reCAPTCHA site key..."
											rows={2}
										/>
									</FormControl>
									<FormDescription>
										Enter your reCAPTCHA site key for form protection
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* scripts_facebook_pixel */}
						<FormField
							control={form.control}
							name="scripts_facebook_pixel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Facebook Pixel</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Paste your Facebook Pixel script..."
											rows={3}
										/>
									</FormControl>
									<FormDescription>
										Paste your Facebook Pixel ID or full script
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* scripts_facebook_messenger */}
						<FormField
							control={form.control}
							name="scripts_facebook_messenger"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Facebook Messenger</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Paste your Facebook Messenger chat plugin code..."
											rows={3}
										/>
									</FormControl>
									<FormDescription>
										Paste the Messenger chat plugin code for customer support
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* scripts_whatsapp_chat */}
						<FormField
							control={form.control}
							name="scripts_whatsapp_chat"
							render={({ field }) => (
								<FormItem>
									<FormLabel>WhatsApp Chat</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter your WhatsApp number or chat widget code..."
											rows={2}
										/>
									</FormControl>
									<FormDescription>
										Enter your WhatsApp business number for chat widget
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Updating...' : 'Update Scripts'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
