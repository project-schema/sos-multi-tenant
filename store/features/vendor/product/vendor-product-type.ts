import { iPagination } from '@/types';
import { iBrand } from '../../admin/brand';
import { iCategory } from '../../admin/category';
import { iSubCategory } from '../../admin/sub-category';

export type iVendorProductCreateType = {
	status: number;
	data: {
		supplier: {
			id: number;
			supplier_name: string;
			business_name: string;
		}[];
		unit: {
			id: number;
			unit_name: string;
		}[];
		utility: {
			id: number;
			name: string;
		}[];
		variation: {
			id: number;
			name: string;
		}[];
		payment_method: {
			id: number;
			payment_method_name: string;
			acc_no: string;
		}[];
		category: {
			id: number;
			name: string;
			subcategory: {
				id: number;
				name: string;
				category_id: number;
			}[];
		}[];
		brand: {
			id: number;
			name: string;
		}[];
		warehouse: {
			id: number;
			name: string;
		}[];
		customer: {
			id: number;
			customer_name: string;
			phone: string;
			email: null;
			address: null;
		}[];
		resource: {
			id: number;
			name: string;
		}[];
	};
	barcode: string;
	settings: {
		add_product_tutorial: null;
	};
};

export type iVendorProduct = {
	id: number;
	uniqid: string;
	image: string;
	name: string;
	selling_price: string;
	qty: string;
	status: string;
	slug: string;
	created_at: string;
	discount_type: string;
	discount_rate: string;
	original_price: string;
	discount_price: string;
	is_affiliate: number;
	wc_product_id: null;
	product_type: string;
};

export type iVendorProductView = {
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
	market_place_brand_id: string;
	market_place_category_id: string;
	market_place_subcategory_id: string;
	qty: string;
	image: string;
	status: string;
	meta_title: null;
	meta_keyword: null;
	meta_description: null;
	tags: null;
	commision_type: null;
	request: null;
	user_type: null;
	discount_type: 'flat' | 'percent' | undefined;
	discount_rate: string;
	rejected_details: null;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	variants: null;
	selling_type: 'single' | 'bulk' | 'both' | undefined;
	selling_details?: {
		advance_payment: string;
		advance_payment_type: 'flat' | 'percent' | undefined;
		bulk_commission: string;
		bulk_commission_type: 'flat' | 'percent' | undefined;
		min_bulk_qty: string;
		min_bulk_price: string;
	}[];
	advance_payment: number;
	single_advance_payment_type: 'flat' | 'percent' | undefined;
	is_connect_bulk_single: string;
	specifications: {
		specification: string;
		specification_ans: string;
	}[];
	uniqid: string;
	sku: string;
	distributor_price: null;
	alert_qty: number;
	supplier_id: number;
	warehouse_id: number;
	exp_date: string;
	barcode: null;
	warranty: string;
	is_feature: number;
	is_affiliate: number;
	discount_price: string;
	vendor_id: number;
	pre_order: string;
	discount_percentage: string;
	product_type: string;
	wc_product_id: null;
	productrating_avg_rating: null;
	vendor: {
		id: number;
		name: string;
		email: string;
	};
	brand: iBrand;
	category: iCategory;
	subcategory: iSubCategory;
	product_image: {
		id: number;
		product_id: number;
		image: string;
		created_at: string;
		updated_at: string;
		deleted_at: null;
	}[];
	productrating: never[];
	supplier: {
		id: number;
		supplier_name: string;
		business_name: string;
	};
	warehouse: {
		id: number;
		name: string;
	};
	product_variant: {
		id: number;
		product_id: number;
		unit_id: number;
		size_id: number;
		color_id: number;
		qty: number;
		product: {
			id: number;
			name: string;
			sku: string;
			selling_price: string;
		};
		color: null;
		size: {
			id: number;
			name: string;
		};
		unit: {
			id: number;
			unit_name: string;
		};
	}[];
};

export type iVendorProductResponse = {
	status: number;
	product: iPagination<iVendorProduct>;
};

export type iVendorMarketPlaceUtility = {
	data: {
		brands: iBrand[];
		categories: iCategory[];
		subcategories: iSubCategory[];
	};
	message: string;
	status: number;
};
