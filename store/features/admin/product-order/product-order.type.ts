import { iPagination } from '@/types';

export type iAdminProductOrder = {
	id: number;
	vendor_id: number;
	product_id: number;
	affiliator_id: number;
	name: string;
	phone: string;
	email: string;
	city: string;
	address: string;
	variants: iOrderVariant[] | null;
	status: string;
	created_at: string;
	updated_at: string;
	order_id: string;
	afi_amount: null;
	product_amount: number;
	category_id: number;
	qty: number;
	totaladvancepayment: null;
	reason: string;
	is_unlimited: null;
	delivery_id: string;
	customer_id: number;
	source_id: number;
	order_media: string;
	delivery_charge: string;
	sale_discount: string;
	paid_amount: string;
	due_amount: string;
	custom_order: number;
	delivery_area: string;
	pickup_area: string;
	shipping_date: string;
	additional_note: null;
	internal_note: null;
	last_status: string;
	courier_name: null;
	consignment_id: null;
	wc_order_no: null;
	affiliator?: {
		id: number;
		name: string;
	};
	vendor: {
		id: number;
		name: string;
	};
	product?: {
		id: number;
		name: string;
	};
	productrating: never[];
};

export type iOrderVariant = {
	id: number;
	unit: {
		id: number;
		unit_name: string;
	};
	qty: string;
	size: {
		id: number;
		name: string;
	};
	color: {
		id: number;
		name: string;
	};
	variant_id: string;
	previousQty: string;
};

// hold, pending, received, processing, ready, progress, delivered
export type iAdminOrderStatusType =
	| 'hold'
	| 'pending'
	| 'received'
	| 'processing'
	| 'ready'
	| 'progress'
	| 'delivered'
	| 'return'
	| 'cancel';

export type iAdminProductOrderResponse = {
	status: number;
	message: iPagination<iAdminProductOrder>;
};

export type iAdminProductOrderStatistics = {
	status: number;
	data: string;
	message: {
		totalorder: number;
		totalholdorder: number;
		totalpendingorder: number;
		totalreceivedorder: number;
		totalprogressorder: number;
		totaldeliveredorder: number;
		totalcancelorder: number;
	};
};
