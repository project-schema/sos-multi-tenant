'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { dateFormat } from '@/lib';
import {
	useEligibleReviewOrdersQuery,
	useSubmitProductReviewMutation,
} from '@/store/features/frontend/product-review';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { StarRatingInput } from './product-review-stars';

export function ProductReviewForm({
	productId,
	productSlug,
}: {
	productId: number;
	productSlug: string;
}) {
	const { data: session, status } = useSession();
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState('');
	const [orderId, setOrderId] = useState<string>('');

	const { data: eligibleData, isLoading: isEligibleLoading } =
		useEligibleReviewOrdersQuery(
			{ productId },
			{ skip: status !== 'authenticated' }
		);

	const [submitReview, { isLoading: isSubmitting }] =
		useSubmitProductReviewMutation();

	if (status === 'loading') {
		return (
			<div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
				<Loader2 className="size-4 animate-spin" />
				Loading review form...
			</div>
		);
	}

	if (!session) {
		return (
			<div className="rounded-lg border bg-muted/30 p-4 text-sm">
				<p className="font-medium text-foreground">Write a review</p>
				<p className="mt-1 text-muted-foreground">
					Sign in to share your experience with this product.
				</p>
				<Button asChild size="sm" className="mt-3">
					<Link href="/auth">Sign in</Link>
				</Button>
			</div>
		);
	}

	const eligibleOrders = eligibleData?.orders ?? [];

	if (isEligibleLoading) {
		return (
			<div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
				<Loader2 className="size-4 animate-spin" />
				Checking eligible orders...
			</div>
		);
	}

	if (eligibleOrders.length === 0) {
		return (
			<div className="rounded-lg border bg-muted/30 p-4 text-sm">
				<p className="font-medium text-foreground">Write a review</p>
				<p className="mt-1 text-muted-foreground">
					{eligibleData?.message ||
						'Purchase and receive this product to leave a review.'}
				</p>
			</div>
		);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!orderId) {
			toast.error('Please select an order.');
			return;
		}

		if (!comment.trim()) {
			toast.error('Please write a comment.');
			return;
		}

		if (!productId) {
			toast.error('Product not found.');
			return;
		}

		try {
			const response = await submitReview({
				order_id: Number(orderId),
				rating,
				comment: comment.trim(),
				product_id: productId,
			}).unwrap();

			toast.success(
				response.message ||
					'Review submitted successfully. It will appear after admin approval.'
			);
			setComment('');
			setRating(5);
			setOrderId('');
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
					Reviews are moderated before appearing on the storefront.
				</p>
			</div>

			<div className="space-y-2">
				<Label htmlFor={`review-order-${productSlug}`}>Select order</Label>
				<Select value={orderId} onValueChange={setOrderId}>
					<SelectTrigger id={`review-order-${productSlug}`} className="w-full">
						<SelectValue placeholder="Choose a delivered order" />
					</SelectTrigger>
					<SelectContent>
						{eligibleOrders.map((order) => (
							<SelectItem key={order.id} value={String(order.id)}>
								Order #{order.order_id} · {dateFormat(order.created_at)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label>Your rating</Label>
				<StarRatingInput
					value={rating}
					onChange={setRating}
					disabled={isSubmitting}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor={`review-comment-${productSlug}`}>Your review</Label>
				<Textarea
					id={`review-comment-${productSlug}`}
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					placeholder="Share details about the product quality, fit, delivery, etc."
					rows={4}
					disabled={isSubmitting}
				/>
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting && <Loader2 className="size-4 animate-spin" />}
				Submit Review
			</Button>
		</form>
	);
}
