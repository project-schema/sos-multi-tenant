export interface iOrderVariant {
	id: number;
	qty: string;
	size?: { id: number; name: string };
	color?: { id: number; name: string };
	unit?: { id: number; unit_name: string };
}

export interface iOrderProduct {
	id: number;
	name: string;
	slug?: string;
	image?: string;
}

export interface iOrder {
	id: number;
	order_id: string;
	product_id?: number;
	total?: number | string;
	status: string;
	payment_status?: string;
	created_at: string;
	updated_at?: string;
	due_amount: number | string;
	paid_amount?: number | string;
	product_amount?: number | string;
	delivery_charge?: number | string;
	sale_discount?: number | string;
	name?: string;
	phone?: string;
	email?: string;
	address?: string;
	city?: string;
	courier_name?: string | null;
	consignment_id?: string | null;
	delivery_area?: string;
	pickup_area?: string;
	shipping_date?: string;
	additional_note?: string | null;
	order_media?: string;
	product?: iOrderProduct;
	variants?: iOrderVariant[] | null;
	/**
	 * Laravel returns an object like:
	 * {
	 *   id, order_id, product_id, user_id, rating, comment, is_visible, created_at, ...
	 * }
	 */
	productrating?: iOrderProductRating | null;
	review_status?: 'pending' | 'approved' | null;
}

export interface iOrderProductRating {
	id: number;
	order_id: number;
	product_id: number;
	user_id: number;
	rating: number;
	comment: string;
	is_visible: boolean;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface iOrderStatistics {
	all_order: number;
	pending_order: number;
	processing_order: number;
	completed_order: number;
	cancelled_order: number;
}

export interface iOrderResponse {
	orders: iOrder[];
	all_order: number;
	pending_order: number;
	processing_order: number;
	completed_order: number;
	cancelled_order: number;
}

export const REVIEWABLE_ORDER_STATUSES = ['delivered', 'completed'] as const;

export function canReviewOrder(order: iOrder): boolean {
	const status = order.status?.toLowerCase();
	const isReviewableStatus = REVIEWABLE_ORDER_STATUSES.includes(
		status as (typeof REVIEWABLE_ORDER_STATUSES)[number],
	);

	const alreadyReviewed =
		order.review_status === 'approved' ||
		order.review_status === 'pending' ||
		Boolean(order.productrating);

	return isReviewableStatus && !alreadyReviewed;
}
