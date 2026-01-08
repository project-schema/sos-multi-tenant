export type iTenantCoupon = {
	id: number;
	name: string;
	code: string;
	discount_type: string;
	discount_value: string;
	min_order_amount: string;
	max_discount_amount: string;
	usage_limit: number;
	usage_limit_per_user: number;
	valid_from: string;
	valid_to: string;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iTenantCouponResponse = {
	message: string;
	success: boolean;
	data: iTenantCoupon[];
};
