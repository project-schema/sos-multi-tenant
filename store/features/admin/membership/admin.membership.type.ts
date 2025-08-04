export type iMembershipType = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	role_as: string;
	image: string;
	number: string;
	status: string;
	balance: number;
	last_seen: string;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	number2: null;
	uniqid: string;
	verify_code: number;
	verify_code_at: string;
	is_employee: null;
	vendor_id: null;
	vendorsubscription: {
		id: number;
		user_id: number;
		expire_date: string;
		service_qty: number;
		product_qty: number;
		affiliate_request: number;

		service_create: number;
		product_request: number;
		product_approve: number;
	};
};
