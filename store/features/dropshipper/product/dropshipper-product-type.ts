import { iPagination } from '@/types';

export type iDropShipperProduct = {
	id: number;
	uniqid: string;
	image: string;
	name: string;
	selling_price: string;
	qty: string;
	status: string;
	created_at: string;
	discount_type: string;
	discount_rate: string;
	original_price: string;
	discount_price: string;
	is_affiliate: number;
	wc_product_id: null;
	product_type: string;
};

export type iDropShipperProductResponse = {
	status: number;
	product: iPagination<iDropShipperProduct>;
};
