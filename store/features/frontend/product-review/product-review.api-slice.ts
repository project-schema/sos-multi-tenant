import { apiSlice } from '../../api/apiSlice';
import type {
	iEligibleReviewOrdersResponse,
	iMyProductReviewsResponse,
	iProductReviewsResponse,
	iSubmitProductReviewRequest,
	iSubmitProductReviewResponse,
} from './product-review.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		ProductReviews: builder.query<
			iProductReviewsResponse,
			{ slug: string; page?: number; per_page?: number }
		>({
			query: ({ slug, page = 1, per_page = 10 }) => ({
				url: `/tenant-frontend/product/${slug}/reviews?page=${page}&per_page=${per_page}`,
				method: 'GET',
			}),
			providesTags: (_result, _error, { slug }) => [
				{ type: 'ProductReview', id: slug },
			],
		}),

		EligibleReviewOrders: builder.query<
			iEligibleReviewOrdersResponse,
			{ productId: number }
		>({
			query: ({ productId }) => ({
				url: `/tenant-frontend/product/${productId}/review-eligible-orders`,
				method: 'GET',
			}),
			providesTags: (_result, _error, { productId }) => [
				{ type: 'ProductReview', id: `eligible-${productId}` },
			],
		}),

		SubmitProductReview: builder.mutation<
			iSubmitProductReviewResponse,
			iSubmitProductReviewRequest
		>({
			query: (body) => ({
				url: `/tenant-frontend/product-review`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['ProductReview', 'AccountOrders'],
		}),

		MyProductReviews: builder.query<iMyProductReviewsResponse, void>({
			query: () => ({
				url: `/tenant-frontend/my-reviews`,
				method: 'GET',
			}),
			providesTags: ['ProductReview'],
		}),
	}),
});

export const {
	useProductReviewsQuery,
	useEligibleReviewOrdersQuery,
	useSubmitProductReviewMutation,
	useMyProductReviewsQuery,
} = api;
