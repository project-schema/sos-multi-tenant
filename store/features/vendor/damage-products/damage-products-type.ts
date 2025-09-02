export interface iVendorDamageProducts {
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

export type iVendorDamageProductsResponse = {
	status: 200;
	damages: iVendorDamageProducts[];
};
