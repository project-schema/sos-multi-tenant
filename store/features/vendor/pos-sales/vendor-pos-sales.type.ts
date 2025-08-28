import { iPagination } from '@/types';

export type iVendorPosSalesResponse = {
	data: {
		resource: {
			id: number;
			name: string;
		}[];
		customer: {
			id: number;
			customer_name: string;
			phone: string;
			email: string;
			address: string;
		}[];
		brand: {
			id: number;
			name: string;
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
		payment_methods: {
			id: number;
			payment_method_name: string;
		}[];
	};
	status: number;
	barcode: string;
	video: string;
	products: {
		id: number;
		category_id: number;
		brand_id: number;
		image: string;
		is_feature: number;
		name: string;
		slug: string;
		sku: string;
		selling_price: string;
	}[];
};

export type iVendorPosSalesProductDetailsResponse = {
	status: number;
	product: {
		id: number;
		category_id: number;
		brand_id: number;
		name: string;
		slug: string;
		sku: string;
		discount_price: string;
		discount_percentage: string;
		selling_price: string;
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
			color: {
				id: number;
				name: string;
			};
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
};

export type iVendorPosSalesAllOrdersResponse = {
	status: number;
	product_sales: iPagination<iVendorPosSalesOrder>;
};

export type iVendorPosSalesOrder = {
	id: number;
	barcode: string;
	total_price: string;
	sale_date: string;
	payment_status: string;
	due_amount: string;
	customer_id: number;
	source_id: number;
	exchange_qty: number;
	customer: {
		id: number;
		customer_name: string;
	};
	sale_details: {
		id: number;
		pos_sales_id: number;
		product_id: number;
		unit_id: number;
		size_id: number;
		color_id: number;
		qty: number;
		rate: string;
		sub_total: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		status: string;
	}[];
	source: {
		id: number;
		name: string;
		image: null;
	};
};

export type iVendorPosSalesOrderShow = {
	status: number;
	logo: any;
	data: iVendorPosSaleShowData;
};

export type iVendorPosSaleShowData = {
	id: number;
	customer_id: number;
	vendor_id: number;
	user_id: number;
	barcode: string;
	payment_id: number;
	sale_date: string;
	source_id: number;
	paid_amount: string;
	total_price: string;
	due_amount: string;
	sale_discount: string;
	total_qty: number;
	payment_status: string;
	change_amount: string;
	sale_details: {
		id: number;
		pos_sales_id: number;
		product_id: number;
		color_id: number;
		unit_id: number;
		size_id: number;
		qty: number;
		rate: string;
		sub_total: string;
		status: string;
		product: {
			id: number;
			name: string;
		};
		color: {
			id: number;
			name: string;
		};
		size: {
			id: number;
			name: string;
		};
		unit: {
			id: number;
			unit_name: string;
		};
	}[];
	customer: {
		id: number;
		customer_name: string;
		phone: string;
		email: string;
		address: string;
	};
	user: {
		id: number;
		name: string;
	};
};

export type iVendorPosSalesAllReturnResponse = {
	status: number;
	return_list: {
		id: number;
		barcode: string;
		sale_date: string;
		return_date: string;
		return_qty: number;
		return_amount: string;
		customer_id: number;
		customer: {
			id: number;
			customer_name: string;
		};
	};
};

export type iVendorPosSalesPaymentHistoryResponse = {
	status: number;
	payment_history: iPagination<{
		id: number;
		invoice_no: string;
		pos_sales_id: number;
		customer_id: number;
		date: string;
		payment_method_id: number;
		paid_amount: string;
		customer: {
			id: number;
			customer_name: string;
		};
		payment_method: {
			id: number;
			payment_method_name: string;
		};
	}>;
};
