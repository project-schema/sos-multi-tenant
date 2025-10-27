import { iPagination } from '@/types';
import { iUser } from '../user/type';

export type iAdminCoupon = {
	id: number;
	name: string;
	type: 'flat' | 'percentage';
	amount: number;
	commission: number;
	commission_type: 'flat' | 'percentage';
	expire_date: Date;
	limitation: number;
	user_id: number;
	status: 'active' | 'deactivate';
	deleted_at: null;
	created_at: string;
	updated_at: string;
	couponused_count: number;
	couponused_sum_total_commission: null;
	tenant_id: string;
	user: {
		id: number;
		name: string;
		email: string;
	};
};

export type iAdminCouponResponse = {
	status: 200;
	data: 'success';
	message: iPagination<iAdminCoupon>;
};

const data = {
	id: 44,
	user_id: 654,
	comments: 'I use facebook message',
	status: 'pending',
	deleted_at: null,
	created_at: '2024-11-08T17:19:56.000000Z',
	updated_at: '2024-11-08T17:19:56.000000Z',
	reason: null,
	user: {
		id: 654,
		name: 'Saurav Das',
		email: 'sopnodas727@gmail.com',
		email_verified_at: '2024-10-23T17:55:18.000000Z',
		role_as: '3',
		image: null,
		number: '01748523134',
		status: 'active',
		balance: 0,
		last_seen: '2025-01-10 19:46:02',
		created_at: '2024-10-23T17:55:18.000000Z',
		updated_at: '2025-01-10T13:46:02.000000Z',
		deleted_at: null,
		number2: null,
		uniqid: '67193886d2cc0',
		verify_code: 904863,
		verify_code_at: '2024-10-23 23:55:18',
		is_employee: null,
		vendor_id: null,
	},
};
export type iAdminReqCoupon = {
	id: number;
	user_id: number;
	comments: string;
	tenant_id: string;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	reason: null | string;
	user: iUser;
};

export type iAdminCouponUsersRes = {
	status: 200;
	data: 'success';
	message: { id: number; email: string }[];
};
