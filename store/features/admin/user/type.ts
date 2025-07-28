import { iPagination } from '@/types';

export type AdminUserStatisticType = {
	status: 200;
	data: 'success';
	message: {
		totalmember: number;
		totalvendor: number;
		totalaffiliate: number;
		totaluser: number;
	};
};

export type statusType = 'all' | 'active' | 'pending';
export type userType = 'all' | 'vendor' | 'affiliate' | 'user';

export type iUser = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	role_as: string;
	image: string;
	number: string;
	status: 'active' | 'blocked' | 'pending';
	balance: number;
	last_seen: string;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	number2: string;
	uniqid: string;
	verify_code: number;
	verify_code_at: string;
	is_employee: null;
	vendor_id: null;
};

export type iNote = {
	id: number;
	user_id: number;
	note: string;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iPaymentHistory = {
	id: number;
	user_id: number;
	trxid: string;
	amount: string;
	payment_method: string;
	transition_type: string;
	balance_type: string;
	coupon: null;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iAllUserResponse = {
	status: number;
	all: iPagination<iUser>;
};

export type iAdminUserNote = {
	status: number;
	notes: iPagination<iNote>;
};
export type iAdminPaymentHistory = {
	status: number;
	serviceOrder: iPagination<iPaymentHistory>;
};
