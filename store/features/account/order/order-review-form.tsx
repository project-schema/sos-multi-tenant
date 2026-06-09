'use client';

import { StarRatingInput } from '@/components/theme/common/product-review-stars';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitProductReviewMutation } from '@/store/features/frontend/product-review';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { iOrder } from './type';
import { canReviewOrder } from './type';

export function OrderReviewForm({
	order,
	onSubmitted,
}: {
	order: iOrder;
	onSubmitted?: () => void;
}) {
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [submitReview, { isLoading }] = useSubmitProductReviewMutation();

	if (!canReviewOrder(order)) {
		const alreadyReviewed =
			order.review_status === 'approved' || Boolean(order.productrating);

		const isPending = order.review_status === 'pending';

		return (
			<div className="rounded-lg border bg-muted/30 p-4 text-sm">
				<p className="font-medium text-foreground">Product review</p>
				<p className="mt-1 text-muted-foreground">
					{isPending
						? 'Your review is pending admin approval.'
						: alreadyReviewed
						? 'You have already reviewed this order.'
						: 'This order is not eligible for review yet.'}
				</p>
				{order.productrating?.comment && (
					<div>
						{order.productrating?.rating && (
							<StarRatingInput
								onChange={() => {}}
								value={order.productrating?.rating}
								disabled={true}
							/>
						)}
						<p>{order.productrating?.comment}</p>
					</div>
				)}
			</div>
		);
	}

	if (submitted) {
		return (
			<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
				<p className="font-medium">Review submitted</p>
				<p className="mt-1">
					Thank you! Your review will appear on the storefront after admin
					approval.
				</p>
			</div>
		);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!comment.trim()) {
			toast.error('Please write a comment.');
			return;
		}
		if (!order.product_id) {
			toast.error('Product not found.');
			return;
		}

		try {
			const response = await submitReview({
				product_id: order.product_id,
				order_id: order.id,
				rating,
				comment: comment.trim(),
			}).unwrap();

			toast.success(
				response.message ||
					'Review submitted successfully. It will appear after admin approval.'
			);
			setSubmitted(true);
			onSubmitted?.();
		} catch (error: unknown) {
			const message =
				(error as { data?: { message?: string } })?.data?.message ||
				'Failed to submit review.';
			toast.error(message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-lg border bg-muted/20 p-4 sm:p-5"
		>
			<div>
				<h3 className="text-base font-semibold text-foreground">
					Write a review
				</h3>
				<p className="mt-1 text-sm text-muted-foreground">
					Share your experience for order #{order.order_id}
					{order.product?.name ? ` · ${order.product.name}` : ''}.
				</p>
			</div>

			<div className="space-y-2">
				<Label>Your rating</Label>
				<StarRatingInput
					value={rating}
					onChange={setRating}
					disabled={isLoading}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor={`order-review-${order.id}`}>Your review</Label>
				<Textarea
					id={`order-review-${order.id}`}
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					placeholder="Share details about the product quality, fit, delivery, etc."
					rows={4}
					disabled={isLoading}
				/>
			</div>

			<Button type="submit" disabled={isLoading}>
				{isLoading && <Loader2 className="size-4 animate-spin" />}
				Submit Review
			</Button>
		</form>
	);
}
