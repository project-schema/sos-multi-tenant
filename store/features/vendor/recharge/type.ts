export interface iVendorRechargeHistory {
	id: number;
	user_id: number;
	trxid: string;
	amount: string;
	payment_method: string;
	transition_type: string;
	balance_type: string;
	coupon: string;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
}
