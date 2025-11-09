import { iPagination } from '@/types';
import { iBrand } from '../brand';
import { iCategory } from '../category';
import { iSubCategory } from '../sub-category';
import { iUser } from '../user/type';

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
	discount_type: 'flat' | 'percent';
	discount_rate: string;
	created_at: string;
	updated_at: string;
	deleted_at: null | string;
	product_variant: null | iVariant[];
	rejected_details: string;
	selling_type: 'single' | 'bulk' | 'both';
	selling_details: null | iSellingDetail[];
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
	tenant_id?: string;
	vendor: {
		id: number;
		name: string;
	};
};

export type iVariant = {
	id: number;
	product_id: number;
	user_id: number;
	unit_id: number;
	size_id: number;
	color_id: number;
	qty: number;
	rate: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	size: {
		id: number;
		name: string;
	};
	unit: {
		id: number;
		unit_name: string;
	};
	color: {
		id: number;
		name: string;
	};
};

export type iSellingDetail = {
	advance_payment: string;
	advance_payment_type: string;
	bulk_commission: string;
	bulk_commission_type: string;
	min_bulk_qty: string;
	min_bulk_price: string;
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

export type iWareHouse = {
	id: number;
	user_id: number;
	name: string;
	slug: string;
	description: null;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	vendor_id: number;
};
export type iSupplier = {
	id: number;
	user_id: number;
	supplier_name: string;
	supplier_slug: string;
	supplier_id: string;
	business_name: string;
	phone: string;
	email: string;
	address: string;
	description: string;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	vendor_id: number;
};

export type iSize = {
	id: number;
	name: string;
	user_id: number;
	slug: string;
	status: string;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	created_by: string;
	vendor_id: number;
};
export type iColor = {
	id: number;
	name: string;
	user_id: number;
	slug: string;
	status: string;
	code: null;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	created_by: string;
	vendor_id: number;
};

export type iMerchantProductSingleResponse = {
	status: number;
	product: iCompleteMerchantProduct;
	vendor_all_color: iSize[];
	vendor_all_size: iSize[];
	all_category_list: iCategory[];
	all_subcategory_list: iSubCategory[];
	all_brand_list: iBrand[];
	suppliers: iSupplier[];
	warehouse: iWareHouse[];
};
export type iMerchantProductMissing = {
	productrating_avg_rating: null | number;
	cat: iBrand;
	category: iCategory;
	subcategory: iSubCategory;
	brand: iBrand;
	product_image: Array<{
		id: number;
		product_id: number;
		image: string;
		created_at: string;
		updated_at: string;
		deleted_at: null | string;
	}>;
	productdetails: Array<{
		id: number;
		product_id: number;
		user_id: number;
		vendor_id: number;
		status: number;
		created_at: string;
		updated_at: string;
		reason: null | string;
		uniqid: string;
	}>;
	productrating: any[];
	vendor: iUser;
};

export type iCompleteMerchantProduct = iMerchantProduct &
	iMerchantProductMissing;
