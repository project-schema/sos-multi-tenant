import { iPagination } from '@/types';

export type iMerchantProduct = {
	id: number;
	category_id: number;
	subcategory_id: number;
	brand_id: number;
	user_id: number;
	slug: string;
	name: string;
	short_description: string;
	long_description: string;
	selling_price: string;
	original_price: string;
	qty: string;
	image: string;
	status: string;
	meta_title: string;
	meta_keyword: string[];
	meta_description: string;
	tags: null | string;
	specification: null | string;
	specification_ans: null | string;
	commision_type: null | string;
	request: null | string;
	user_type: null | string;
	discount_type: string;
	discount_rate: string;
	created_at: string;
	updated_at: string;
	deleted_at: null | string;
	variants: null | string;
	rejected_details: string;
	selling_type: 'single' | 'bulk';
	selling_details: null | string;
	advance_payment: number;
	single_advance_payment_type: string;
	is_connect_bulk_single: string;
	specifications: {
		specification: null | string;
		specification_ans: null | string;
	}[];
	uniqid: string;
	sku: string;
	distributor_price: null | string;
	alert_qty: number;
	supplier_id: number;
	warehouse_id: number;
	exp_date: null | string;
	barcode: null | string;
	warranty: null | string;
	is_feature: number;
	is_affiliate: number;
	discount_price: string;
	vendor_id: number;
	pre_order: string;
	discount_percentage: string;
	product_type: string;
	wc_product_id: null | string;
	vendor: {
		id: number;
		name: string;
	};
};
export type iMerchantProductResponse = {
	status: number;
	product: iPagination<iMerchantProduct>;
};

export type iMerchantProductStatistics = {
	status: number;
	data: string;
	message: {
		totalproduct: number;
		totalactiveproduct: number;
		totalpendingproduct: number;
		totaleditedproduct: number;
		totalrejectedproduct: number;
	};
};
