'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Star, StarOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { iAdminServiceOrder } from '../../admin/service';
import { useUserServiceRatingMutation } from './api-slice';

const ratingSchema = z.object({
	rating: z
		.number()
		.min(1, 'Please select a rating')
		.max(5, 'Rating must be between 1 and 5'),
	comment: z
		.string()
		.min(1, 'Comment is required')
		.max(1000, 'Comment is too long'),
});

type RatingFormValues = z.infer<typeof ratingSchema>;

interface ServiceRatingFormProps {
	data: iAdminServiceOrder;
	vendorServiceId?: number | string;
}

export function ServiceRatingForm({
	data,
	vendorServiceId,
}: ServiceRatingFormProps) {
	const [open, setOpen] = useState(false);
	const [mutation, { isLoading }] = useUserServiceRatingMutation();

	// Try to get vendor_service_id from order data if not provided
	const getVendorServiceId = (): number | string => {
		if (vendorServiceId) return vendorServiceId;
		// Try to get from order data (may not be in type but could be in actual data)
		const orderWithVendorServiceId = data as any;
		if (orderWithVendorServiceId?.vendor_service_id) {
			return orderWithVendorServiceId.vendor_service_id;
		}
		// Fallback to servicedetails id if available
		if (data.servicedetails?.id) {
			return data.servicedetails.id;
		}
		throw new Error('Vendor service ID is required');
	};

	const form = useForm<RatingFormValues>({
		resolver: zodResolver(ratingSchema),
		defaultValues: {
			rating: 0,
			comment: '',
		},
	});

	const rating = form.watch('rating');

	const onSubmit = async (formData: RatingFormValues) => {
		try {
			const vendorServiceIdValue = getVendorServiceId();
			const res = await mutation({
				service_order_id: data.id,
				rating: formData.rating,
				comment: formData.comment,
				vendor_service_id: vendorServiceIdValue,
			}).unwrap();

			if (res.status === 200) {
				toast.success('Rating submitted successfully');
				form.reset();
				setOpen(false);
			} else {
				toast.error(res.message || 'Failed to submit rating');
			}
		} catch (error: any) {
			if (error?.status === 422 && typeof error.message === 'object') {
				Object.entries(error.message).forEach(([field, value]) => {
					form.setError(field as keyof RatingFormValues, {
						type: 'server',
						message: (value as string[])[0],
					});
				});
			} else {
				toast.error(error?.data?.message || 'Failed to submit rating');
			}
		}
	};

	return (
		<Card className="max-w-xl mx-auto">
			<CardHeader>
				<CardTitle>Rate Service</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Star Rating */}
						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rating</FormLabel>
									<FormControl>
										<div className="flex items-center gap-2">
											{[1, 2, 3, 4, 5].map((starValue) => (
												<button
													key={starValue}
													type="button"
													onClick={() => field.onChange(starValue)}
													className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded"
													aria-label={`Rate ${starValue} star${
														starValue > 1 ? 's' : ''
													}`}
												>
													{starValue <= rating ? (
														<Star
															className="h-8 w-8 fill-yellow-400 text-yellow-400 transition-colors"
															aria-hidden="true"
														/>
													) : (
														<StarOff
															className="h-8 w-8 text-gray-300 transition-colors hover:text-yellow-400"
															aria-hidden="true"
														/>
													)}
												</button>
											))}
											{rating > 0 && (
												<span className="ml-2 text-sm text-muted-foreground">
													{rating} / 5
												</span>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Comment */}
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Comment</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Share your experience with this service..."
											className="min-h-[120px]"
											rows={5}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-end gap-2">
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Submitting...' : 'Submit Rating'}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
