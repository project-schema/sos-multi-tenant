import { iPagination } from '@/types';

export type iRegisterCustomer = {
	id: number;
	name: string;
	email: string;
	role_type: string;
	last_seen: null;
	created_at: string;
	updated_at: string;
};
export type iRegisterCustomerResponse = {
	success: boolean;
	message: string;
	data: iPagination<iRegisterCustomer>;
};
