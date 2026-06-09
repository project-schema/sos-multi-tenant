import { iPagination } from '@/types';

export type iProductReview = {
	id: number;
	product_id: number;
	rating: number;
	comment: string;
	is_visible?: boolean;
	created_at: string;
	user?: {
		id: number;
		name: string;
	};
	product?: {
		id: number;
		name: string;
		slug: string;
	};
};

export type iProductReviewsResponse = {
	status: number;
	product_id: number;
	reviews: iPagination<iProductReview>;
	average_rating: number;
	total_reviews: number;
};

export type iEligibleReviewOrder = {
	id: number;
	order_id: string;
	product_id: number;
	status: string;
	created_at: string;
};

export type iEligibleReviewOrdersResponse = {
	status: number;
	message?: string;
	orders: iEligibleReviewOrder[];
};

export type iSubmitProductReviewRequest = {
	product_id: number;
	order_id: number;
	rating: number;
	comment: string;
};

export type iSubmitProductReviewResponse = {
	status: number;
	message: string;
};

export type iMyProductReviewsResponse = {
	status: number;
	reviews: iProductReview[];
};
