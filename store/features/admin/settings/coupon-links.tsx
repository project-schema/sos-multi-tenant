'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
import { LoaderCircle } from 'lucide-react';

import { alertConfirm } from '@/lib';
import { toast } from 'sonner';

import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../cms/home-content/admin-home-content.api.slice';

//  Zod Schema
const couponSchema = z.object({
	coupon_title: z.string().min(1, 'Coupon title is required'),
	coupon_description: z.string().optional(),
	coupon_video_tutorial: z
		.string()
		.url('Must be a valid URL')
		.optional()
		.or(z.literal('')),
});

type CouponFormValues = z.infer<typeof couponSchema>;

export function CouponSettingsForm() {
	const {
		data,
		isLoading: loading,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();

	const form = useForm<CouponFormValues>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			coupon_title: data?.message?.[0]?.coupon_title ?? '',
			coupon_description: data?.message?.[0]?.coupon_description ?? '',
			coupon_video_tutorial: data?.message?.[0]?.coupon_video_tutorial ?? '',
		},
	});

	const onSubmit = async (formData: CouponFormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store(formData).unwrap();
					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Coupon settings updated');
					} else {
						toast.error(response.message || 'Failed to update');
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof CouponFormValues, {
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
		<Card>
			<CardHeader>
				<CardTitle className="text-lg xl:text-xl">Coupon Tutorial</CardTitle>
				<CardDescription>
					Manage the default coupon tutorial settings shown to merchants.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Coupon Title */}
						<FormField
							control={form.control}
							name="coupon_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coupon Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter coupon title"
											disabled={loading || isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Coupon Description */}
						<FormField
							control={form.control}
							name="coupon_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coupon Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter description"
											disabled={loading || isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Coupon Video Tutorial URL */}
						<FormField
							control={form.control}
							name="coupon_video_tutorial"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coupon Video Tutorial (URL)</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="https://example.com/video"
											disabled={loading || isLoading}
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
								{isLoading ? 'Saving...' : 'Save Settings'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
