export type iVendorCoupon = {
	id: number;
	name: string;
	type: 'flat' | 'percentage';
	amount: number;
	commission: number;
	commission_type: 'flat' | 'percentage';
	expire_date: string;
	limitation: number;
	user_id: number;
	status: 'active' | 'deactivate';
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
	couponused_count: number;
	tenant_id: string;
	couponused_sum_total_commission: number | null;
};

export type iVendorCouponResponse = {
	status: 200;
	data: 'success';
	message: iVendorCoupon[];
};

export type iVendorCouponRequest = {
	id: number;
	user_id: number;
	comments: string;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	reason: null | string;
};
