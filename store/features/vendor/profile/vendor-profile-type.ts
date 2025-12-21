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
const data = {
	id: 1,
	name: 'Test',
	email: 'borax@gmail.com',
	last_seen: '2025-12-15 18:38:15',
	created_at: '2025-12-14T12:39:55.000000Z',
	updated_at: '2025-12-15T12:49:16.000000Z',
	image: '',
};

const shopData = {
	id: 'borax',
	company_name: 'borax',
	email: 'borax@gmail.com',
	owner_name: 'borax',
	phone: '',
	address: '',
	created_at: '2025-12-14T12:39:37.000000Z',
	updated_at: '2025-12-14T14:37:13.000000Z',
	data: '',
	deleted_at: '',
	type: 'merchant',
	balance: '0.00',
	tenancy_db_name: 'sosanik_tenant_borax',
	name: 'borax',
	number: 'borax@gmail.com',
	number2: '',
};

export type iVendorProfile = typeof data;
export type iVendorShopInfo = typeof shopData;
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
	usersubscription: iSubscription | null;
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

export type iSubscription = {
	id: number;
	user_id: number;
	subscription_id: number;
	expire_date: string;
	service_qty: number;
	product_qty: number;
	affiliate_request: number;
	product_request: number;
	product_approve: number;
	service_create: number;
	deleted_at: string;
	created_at: string;
	updated_at: string;
	trxid: string;
	subscription_price: number;
	chat_access: number;
	pos_sale_qty: number;
	employee_create: string;
	subscription: {
		id: number;
		card_heading: string;
	};
};

export type iEditVendor = {
	status: number;
	vendor: iUser;
};
