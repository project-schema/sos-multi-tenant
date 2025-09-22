import { iPagination } from '@/types';
export type iVendorProductOrderResponse = {
	message: iPagination<iVendorProductOrder>;
	status: number;
};
export type iVendorProductOrder = {
	id: number;
	vendor_id: number;
	product_id: number;
	affiliator_id: number;
	name: string;
	phone: string;
	email: string;
	city: string;
	address: string;
	variants: null;
	status: string;
	created_at: string;
	updated_at: string;
	order_id: string;
	afi_amount: null;
	product_amount: number;
	category_id: number;
	qty: number;
	totaladvancepayment: null;
	reason: null;
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
	additional_note: string;
	internal_note: string;
	last_status: string;
	courier_name: null;
	consignment_id: null;
	wc_order_no: null;
	affiliator: null;
	vendor: {
		id: number;
		name: string;
	};
	product: null;
	size: {
		id: number;
		name: string;
	};
	unit: {
		id: number;
		unit_name: string;
	};
};

export const statusRouteMap: Record<string, string> = {
	all: 'all-orders',
	pending: 'pending-orders',
	progress: 'progress-orders',
	processing: 'product-processing',
	ready: 'order-ready',
	received: 'received-orders',
	delivered: 'delivered-orders',
	cancelled: 'cancel-orders',
	hold: 'hold-orders',
	return: 'order-return',
	count: 'order-count',
};

export type iVendorProductOrderStatistics = {
	status: number;
	all: number;
	hold: number;
	pending: number;
	progress: number;
	received: number;
	delivered: number;
	cancel: number;
};
