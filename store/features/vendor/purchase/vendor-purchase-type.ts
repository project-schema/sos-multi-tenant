import { iPagination } from '@/types';

export type iVendorPurchase = {
	id: number;
	chalan_no: string;
	status: string;
	total_price: string;
	purchase_date: string;
	payment_status: string;
	due_amount: string;
	supplier_id: number;
	total_qty: number;
	return_qty: number;
	supplier: {
		id: number;
		supplier_name: string;
		business_name: string;
	};
	purchase_details: {
		id: number;
		product_purchase_id: number;
		product_id: number;
		unit_id: number;
		size_id: number;
		color_id: number;
		qty: number;
		rate: string;
		sub_total: string;
		deleted_at: string | null;
		created_at: string;
		updated_at: string;
	}[];
};

export type VendorPurchaseCreateData = {
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
		color: {
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
	};
	chalan_no: string;
};

export type iVendorPurchaseResponse = {
	status: 200;
	product_purchase: iPagination<iVendorPurchase>;
};

export type iVendorPurchasePaymentHistory = {
	id: number;
	chalan_no: string;
	product_purchase_id: number;
	supplier_id: number;
	date: string;
	payment_method_id: number;
	paid_amount: string;
	supplier: {
		id: number;
		supplier_name: string;
	};
	payment_method: {
		id: number;
		payment_method_name: string;
	};
};

export type iVendorPurchasePaymentHistoryResponse = {
	status: 200;
	payment_history: iPagination<iVendorPurchasePaymentHistory>;
};

export type iVendorPurchaseShow = {
	status: 200;
	logo: {
		id: number;
		vendor_id: number;
		user_id: number;
		shop_name: string;
		logo: string;
		phone: string;
		email: string;
		address: string;
	};
	purchase_show: {
		id: number;
		product_id: null;
		user_id: number;
		supplier_id: number;
		chalan_no: string;
		purchase_date: string;
		payment_id: number;
		paid_amount: string;
		total_price: string;
		due_amount: string;
		purchase_discount: string;
		total_qty: number;
		note: null;
		status: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		payment_status: string;
		return_qty: number;
		return_amount: string;
		return_date: null;
		vendor_id: number;
		purchase_details: {
			id: number;
			product_purchase_id: number;
			product_id: number;
			color_id: number;
			unit_id: number;
			size_id: number;
			qty: number;
			rate: string;
			sub_total: string;
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
		supplier: {
			id: number;
			supplier_name: string;
			phone: string;
			email: string;
			address: string;
		};
	};
};
