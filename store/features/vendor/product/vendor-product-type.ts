import { iPagination } from '@/types';

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
	created_at: string;
	discount_type: string;
	discount_rate: string;
	original_price: string;
	discount_price: string;
	is_affiliate: number;
	wc_product_id: null;
	product_type: string;
};

export type iVendorProductResponse = {
	status: number;
	product: iPagination<iVendorProduct>;
};
