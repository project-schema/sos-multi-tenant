'use client';

import { Button } from '@/components/ui/button';
import { dateFormat } from '@/lib';
import { useProductReviewsQuery } from '@/store/features/frontend/product-review';
import { Loader2, MessageSquareText } from 'lucide-react';
import { useState } from 'react';
import { ProductReviewForm } from './product-review-form';
import { StarRatingDisplay } from './product-review-stars';

export function ProductReviewsSection({
	productId,
	productSlug,
	showReviewForm = true,
}: {
	productId: number;
	productSlug: string;
	showReviewForm?: boolean;
}) {
	const [page, setPage] = useState(1);
	const perPage = 10;

	const { data, isLoading, isFetching, isError } = useProductReviewsQuery({
		slug: productSlug,
		page,
		per_page: perPage,
	});

	const reviews = data?.reviews?.data ?? [];
	const averageRating = data?.average_rating ?? 0;
	const totalReviews = data?.total_reviews ?? 0;
	const lastPage = data?.reviews?.last_page ?? 1;
	const currentPage = data?.reviews?.current_page ?? 1;

	return (
		<div className="space-y-6">
			{showReviewForm && (
				<ProductReviewForm productId={productId} productSlug={productSlug} />
			)}

			<div className="border-b border-border pb-6">
				<div className="flex flex-wrap items-center gap-4">
					<div className="text-4xl font-bold text-foreground">
						{averageRating.toFixed(1)}
					</div>
					<div>
						<StarRatingDisplay value={averageRating} size="md" />
						<p className="mt-2 text-sm text-muted-foreground">
							Based on {totalReviews} review{totalReviews === 1 ? '' : 's'}
						</p>
					</div>
				</div>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
					<Loader2 className="size-5 animate-spin" />
					Loading reviews...
				</div>
			) : isError ? (
				<div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
					Unable to load reviews right now. Please try again later.
				</div>
			) : reviews.length === 0 ? (
				<div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
					<MessageSquareText className="size-10 text-muted-foreground/50" />
					<p className="font-medium text-foreground">No reviews yet</p>
					<p className="text-sm text-muted-foreground">
						Be the first to review this product.
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{reviews.map((review) => (
						<div
							key={review.id}
							className="border-b border-border pb-6 last:border-0"
						>
							<div className="mb-2 flex flex-wrap items-start justify-between gap-3">
								<div>
									<h4 className="font-semibold text-foreground">
										{review.user?.name || 'Customer'}
									</h4>
									<p className="text-sm text-muted-foreground">
										{dateFormat(review.created_at)}
									</p>
								</div>
								<StarRatingDisplay value={review.rating} size="sm" />
							</div>
							<p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
								{review.comment}
							</p>
						</div>
					))}
				</div>
			)}

			{lastPage > 1 && (
				<div className="flex items-center justify-between gap-3 pt-2">
					<p className="text-sm text-muted-foreground">
						Page {currentPage} of {lastPage}
					</p>
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={currentPage <= 1 || isFetching}
							onClick={() => setPage((prev) => Math.max(1, prev - 1))}
						>
							Previous
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={currentPage >= lastPage || isFetching}
							onClick={() => setPage((prev) => Math.min(lastPage, prev + 1))}
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export function useProductReviewCount(productSlug: string) {
	const { data } = useProductReviewsQuery({
		slug: productSlug,
		page: 1,
		per_page: 1,
	});

	return data?.total_reviews ?? 0;
}
