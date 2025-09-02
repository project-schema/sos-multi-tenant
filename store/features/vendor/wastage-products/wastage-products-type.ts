export interface iVendorWastageProducts {
	id: number;
	product_id: number;
	user_id: number;
	vendor_id: number;
	qty: number;
	note: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	user: {
		id: number;
		name: string;
		email: string;
		uniqid: string;
	};
	product: {
		id: number;
		name: string;
	};
	damage_details: {
		id: number;
		damage_id: number;
		unit_id: number;
		size_id: number;
		color_id: number;
		damage_qty: number;
		rate: string;
		sub_total: string;
		remark: string;
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
}

export type iVendorWastageProductsResponse = {
	status: 200 | 404;
	message: string;
	damages: iVendorWastageProducts[];
};

export type iVendorWastageInvoice = {
	status: 200 | 404;
	message: string;
	sales: {
		id: number;
		customer_id: number;
		vendor_id: number;
		user_id: number;
		source_id: number;
		barcode: string;
		sale_date: string;
		payment_id: number;
		paid_amount: string;
		total_price: string;
		due_amount: string;
		sale_discount: string;
		total_qty: number;
		payment_status: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		return_qty: number;
		return_amount: string;
		return_date: string;
		wastage_qty: number;
		wastage_amount: string;
		wastage_date: null;
		exchange_qty: number;
		exchange_amount: string;
		exchange_date: string;
		change_amount: string;
		sale_details: {
			id: number;
			qty: number;
			pos_sales_id: number;
			product_id: number;
			color_id: number;
			unit_id: number;
			size_id: number;
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
	};
};

export type iVendorWastageListResponse = {
	status: 200;
	return_list: {
		id: number;
		barcode: string;
		sale_date: string;
		wastage_date: string;
		wastage_qty: number;
		wastage_amount: string;
		customer_id: number;
		customer: {
			id: number;
			customer_name: string;
		};
	}[];
};
