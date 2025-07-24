export interface iUserProfile {
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
	deleted_at: string;
	number2: string;
	uniqid: string;
	verify_code: number;
	verify_code_at: string;
	is_employee: null;
	vendor_id: null;
	usersubscription: null;
}

export interface iBank {
	id: number;
	name: string;
	number: string;
	account_holder_name: null;
	branch_name: null;
	created_at: null;
	updated_at: null;
}

export interface iBankResponse {
	status: 200;
	message: iBank[];
	settings: {
		minimum_withdraw: string;
		withdraw_charge: string;
		withdraw_charge_status: 'on';
	};
}
